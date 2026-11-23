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

// Get user's meals
router.get('/users/:userId/meals', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const userMeals = meals.filter(m => m.userId === userId);

    console.log(`Retrieved meals for user ID: ${userId}`);
    res.json(userMeals);
});

// Log a new meal for a specific user (matches Swagger path)
router.post('/users/:userId/meal', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const nextMealId =
        meals.length > 0 ? Math.max(...meals.map(m => m.mealId)) + 1 : 1;

    const newMeal = { mealId: nextMealId, userId, ...req.body };
    meals.push(newMeal);

    console.log(`Logged new meal for user ID: ${userId}`);
    res.status(201).json({ message: "Meal logged successfully", meal: newMeal });
});

// Helper to update a meal
const handleUpdateMeal = (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const mealId = parseInt(req.params.mealId, 10);

    const meal = meals.find(m => m.mealId === mealId && (!m.userId || m.userId === userId));
    if (!meal) {
        return res.status(404).json({ error: "Meal not found for this user" });
    }

    const { mealId: _, userId: __, ...updates } = req.body;
    Object.assign(meal, updates);

    console.log(`Updated meal ${mealId} for user ID: ${userId}`);
    res.json({ message: "Meal updated successfully", meal });
};

// Helper to delete a meal
const handleDeleteMeal = (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const mealId = parseInt(req.params.mealId, 10);

    const index = meals.findIndex(m => m.mealId === mealId && (!m.userId || m.userId === userId));
    if (index === -1) {
        return res.status(404).json({ error: "Meal not found for this user" });
    }

    meals.splice(index, 1);

    console.log(`Deleted meal ${mealId} for user ID: ${userId}`);
    res.json({ message: "Meal deleted successfully" });
};

router.put('/users/:userId/meal/:mealId', handleUpdateMeal);
router.put('/users/:userId/meals/:mealId', handleUpdateMeal);
router.delete('/users/:userId/meal/:mealId', handleDeleteMeal);
router.delete('/users/:userId/meals/:mealId', handleDeleteMeal);

// Get user's exercises
router.get('/users/:userId/exercises', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const userExercises = exercises.filter(e => e.userId === userId);

    console.log(`Retrieved exercises for user ID: ${userId}`);
    res.json(userExercises);
});

// Log a new exercise for a specific user (matches Swagger path)
router.post('/users/:userId/exercises', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const nextExerciseId =
        exercises.length > 0 ? Math.max(...exercises.map(e => e.exerciseId)) + 1 : 1;

    const newExercise = { exerciseId: nextExerciseId, userId, ...req.body };
    exercises.push(newExercise);

    console.log(`Logged new exercise for user ID: ${userId}`);
    res.status(201).json({ message: "Exercise logged successfully", exercise: newExercise });
});

// Update an exercise for a specific user
router.put('/users/:userId/exercises/:exerciseId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const exerciseId = parseInt(req.params.exerciseId, 10);

    const exercise = exercises.find(
        e => e.exerciseId === exerciseId && (!e.userId || e.userId === userId)
    );
    if (!exercise) {
        return res.status(404).json({ error: "Exercise not found for this user" });
    }

    const { exerciseId: _, userId: __, ...updates } = req.body;
    Object.assign(exercise, updates);

    console.log(`Updated exercise ${exerciseId} for user ID: ${userId}`);
    res.json({ message: "Exercise updated successfully", exercise });
});

// Delete an exercise for a specific user
router.delete('/users/:userId/exercises/:exerciseId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const exerciseId = parseInt(req.params.exerciseId, 10);

    const index = exercises.findIndex(
        e => e.exerciseId === exerciseId && (!e.userId || e.userId === userId)
    );
    if (index === -1) {
        return res.status(404).json({ error: "Exercise not found for this user" });
    }

    exercises.splice(index, 1);

    console.log(`Deleted exercise ${exerciseId} for user ID: ${userId}`);
    res.json({ message: "Exercise deleted successfully" });
});

module.exports = router;