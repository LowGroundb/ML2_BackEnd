const express = require("express");
const router = express.Router();

const { foods, meals, exercises } = require("../mockData.js");

// Get all foods
router.get('/foods', (req, res) => {

    console.log("Retrieved all foods");

    res.json(foods);
});

// Search foods by query parameter (matches Swagger 'query' parameter)
router.get('/foods/search', (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }
    const filteredFoods = foods.filter(food => food.name.toLowerCase().includes(query.toLowerCase()));

    console.log(`Searched foods with query: ${query}`);

    res.json(filteredFoods);
});

// Get user's meals (or all meals if no user filter yet)
router.get('/users/:userId/meals', (req, res) => {

    console.log(`Retrieved meals for user ID: ${req.params.userId}`);

    res.json(meals);
});

// Log a new meal for a specific user (matches Swagger path)
router.post('/users/:userId/meal', (req, res) => {
    const userId = parseInt(req.params.userId);
    const newMeal = { mealId: meals.length + 1, userId, ...req.body };
    meals.push(newMeal);

    console.log(`Logged new meal for user ID: ${userId}`);

    res.status(201).json({ message: "Meal logged successfully", meal: newMeal });
});

// Log a new exercise for a specific user (matches Swagger path)
router.post('/users/:userId/exercises', (req, res) => {
    const userId = parseInt(req.params.userId);
    const newExercise = { exerciseId: exercises.length + 1, userId, ...req.body };
    exercises.push(newExercise);

    console.log(`Logged new exercise for user ID: ${userId}`);
    
    res.status(201).json({ message: "Exercise logged successfully", exercise: newExercise });
});

module.exports = router;