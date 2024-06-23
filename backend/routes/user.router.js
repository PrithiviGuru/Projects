const express = require("express");
const router = express.Router();
const users = require('../user.json');
const jwt = require("jsonwebtoken");
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
router.get("/seed", async (req, res) => {
    try {
        const userssCount = await userModel.countDocuments();
        if (userssCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await userModel.create(users);
        res.send("Seed Is Done!");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
   
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
      
         if(user && (await bcrypt.compare(password,user.password))) {
          res.send(generateTokenResponse(user));
         }
         else{
           res.status(400).send("Username or password is invalid!");
         }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.post('/register',
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            res.status(400)
                .send('User is already exist, please login!');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        const dbUser = await userModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
)

// const generateTokenResponse = (user) => {
//     const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin },
//         'gureofhw', { expiresIn: "30d" })
//     user.token = token;
//     return user;
// }
const generateTokenResponse = (user) => {
    const token = jwt.sign({
        id: user.id, email:user.email, isAdmin: user.isAdmin
      },'gureofhw',{
        expiresIn:"30d"
      });
    
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
}
module.exports = router;