// mockData.js
let users = [
  {
    userId: 1,
    name: "Pelopidas Tsiountsiouras",
    email: "pelopidas@example.com",
    age: 22,
    gender: "Male",
    weight: 69.5,
    height: 183.0,
    activityLevel: "Active"
  }
];

let goals = [
  {
    goalId: 1,
    goalType: "Maintenance",
    targetWeight: 69.5,
    targetCalories: 2000,
    targetProtein: 150.0,
    targetCarbs: 200.0,
    targetFat: 65.0,
    timePeriodWeeks: 12
  }
];

let foods = [
  {
    foodId: 1,
    name: "Oats",
    caloriesPer100g: 389.0,
    proteinPer100g: 16.9,
    carbsPer100g: 66.3,
    fatPer100g: 6.9
  },
  {
    foodId: 2,
    name: "Chicken Breast",
    caloriesPer100g: 165.0,
    proteinPer100g: 31.0,
    carbsPer100g: 0.0,
    fatPer100g: 3.6
  }
];

let meals = [
  {
    mealId: 1,
    mealType: "Breakfast",
    timestamp: "2026-11-16T08:30:00Z",
    totalCalories: 350.0,
    foods: [foods[0]]
  }
];

let exercises = [
  {
    exerciseId: 1,
    type: "Running",
    durationMinutes: 30,
    caloriesBurned: 300.0,
    timestamp: "2026-11-16T18:00:00Z"
  }
];

module.exports = { users, goals, foods, meals, exercises };