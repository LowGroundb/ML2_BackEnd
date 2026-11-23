const express = require("express");
const router = express.Router();

const { users, goals } = require("../mockData.js");

// Display user's details
router.get('/user/:userId', (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const user = users.find(u => u.userId === id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    console.log(`Retrieved user with ID: ${id}`);
    res.json(user);
});

// Create new user
router.post('/user', (req, res) => {
    const nextUserId =
        req.body.userId ??
        (users.length > 0 ? Math.max(...users.map(u => u.userId)) + 1 : 1);

    const newUser = {
        userId: nextUserId,
        ...req.body
    };

    console.log(`Creating new user with ID: ${newUser.userId}`);
    users.push(newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });
});

// Update user details
router.put('/user/:userId', (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const user = users.find(u => u.userId === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.age = req.body.age ?? user.age;
    user.gender = req.body.gender ?? user.gender;
    user.weight = req.body.weight ?? user.weight;
    user.height = req.body.height ?? user.height;
    user.activityLevel = req.body.activityLevel ?? user.activityLevel;

    console.log(`Updated user with ID: ${id}`);
    res.json({ message: "User updated successfully", user });
});

// Delete user
router.delete('/user/:userId', (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const index = users.findIndex(u => u.userId === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    console.log(`Deleted user with ID: ${id}`);
    res.json({ message: "User deleted successfully" });
});

// Get goals for a user
router.get('/user/:userId/goals', (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const userGoals = goals.filter(g => g.userId === id);

    if (userGoals.length === 0) {
        return res.status(404).json({ error: "No goals found for this user" });
    }

    res.json(userGoals);
});

// Create a goal for a user
router.post('/user/:userId/goals', (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const nextGoalId =
        goals.length > 0 ? Math.max(...goals.map(g => g.goalId)) + 1 : 1;

    const newGoal = {
        goalId: nextGoalId,
        userId: id,
        ...req.body
    };

    goals.push(newGoal);

    console.log(`Created new goal for user ID: ${id}`);
    res.status(201).json({ message: "Goal created successfully", goal: newGoal });
});

// Update a specific goal for a user
router.put('/user/:userId/goals/:goalId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const goalId = parseInt(req.params.goalId, 10);

    const goal = goals.find(g => g.userId === userId && g.goalId === goalId);

    if (!goal) {
        return res.status(404).json({ error: "Goal not found for this user" });
    }

    const { goalId: _, userId: __, ...updates } = req.body;
    Object.assign(goal, updates);

    console.log(`Updated goal ${goalId} for user ID: ${userId}`);
    res.json({ message: "Goal updated successfully", goal });
});

// Update a user's active/first goal without needing goalId
router.put('/user/:userId/goals', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const goal = goals.find(g => g.userId === userId);

    if (!goal) {
        return res.status(404).json({ error: "No goals found for this user" });
    }

    const { goalId: _, userId: __, ...updates } = req.body;
    Object.assign(goal, updates);

    console.log(`Updated goal for user ID: ${userId}`);
    res.json({ message: "Goal updated successfully", goal });
});

module.exports = router;