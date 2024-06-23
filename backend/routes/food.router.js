const express = require("express");
const router = express.Router();
const sf = require('../data.json')
const FoodModel = require('../models/food.model')

router.get("/seed", async (req, res) => {
    try {
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount> 0){
          res.send("Seed is already done!");
          return;
        }
    
        await FoodModel.create(sf);
        res.send("Seed Is Done!");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
   

router.get("/", async (req, res) => {
    try {
        const foods = await FoodModel.find();
        res.send(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/search/:searchTerm", async (req, res) => {
    try {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({ name: { $regex: searchRegex } })
        res.send(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get("/:foodId", async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
})

module.exports = router;
