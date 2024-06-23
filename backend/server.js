const express = require("express");
const cors = require("cors");

const app = express();
const bp = require('body-parser');

const sf = require('./data.json')
const users = require('./user.json')
const foodRouter = require('./routes/food.router')
const userRouter = require('./routes/user.router')

var corsOptions = {
  credentials:true,
  origin:["http://localhost:4200"]
};

// const tutorialRouter = require("./routes/tutorial.route");
// app.use("/api/foods", bp.json(),tutorialRouter);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json())

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }))

app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)


// simple route

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



const connectDB = require('./config/db.config');
connectDB();