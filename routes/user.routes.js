const express = require("express");
const router = express.Router();

const { users, goals } = require("../mockData.js");


router.get('/user/:userId', (req, res) => {
    const id = parseInt(req.params.userId); // Grab the ID from the URL
    const user = users.find(u => u.userId === id); // Search the array

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
});

router.post('/user', (req, res) => {
    const newUser = req.body;

    users.push(newUser); // Add it to mock array in memory

    res.status(201).json({ message: "User created successfully", user: newUser });
});

router.put('/user/:userId', (req, res) => {
  const id = parseInt(req.params.userId);
  const user = users.find(u => u.userId === id);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  // Update the user's properties with whatever the frontend sent
  user.weight = req.body.weight || user.weight;
  user.height = req.body.height || user.height;
  
  res.json({ message: "User updated successfully", user });
});

router.delete('/user/:userId', (req, res) => {
  const id = parseInt(req.params.userId);
  const index = users.findIndex(u => u.userId === id);
  
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  
  // Remove 1 item from the array at that index position
  users.splice(index, 1);
  
  res.json({ message: "User deleted successfully" });
});

router.get('/user/:userId/goals', (req, res) => {
    const id = parseInt(req.params.userId);
    const userGoals = goals.filter(g => g.userId === id);

    if (userGoals.length === 0) {
        return res.status(404).json({ error: "No goals found for this user" });
    }

    res.json(userGoals);
});

router.post('/user/:userId/goals', (req, res) => {
    const id = parseInt(req.params.userId);
    const newGoal = { goalId: goals.length + 1, userId: id, ...req.body };

    goals.push(newGoal);

    res.status(201).json({ message: "Goal created successfully", goal: newGoal });
});

module.exports = router;