# McFitness Backend

This is the backend service for **McFitness**, a fitness and nutrition tracking application developed as the 1st Deliverable for the "Software Engineering 2" course at AUTH. Built with **Node.js** and **Express**, it provides a robust REST API backed by an in-memory mock data structure.

## Features

* **Entity Management:** Manages 5 core domain entities (Users, Goals, Foods, Meals, and Exercises).

* **RESTful API:** Implements 11 fully functional endpoints supporting `GET`, `POST`, `PUT`, and `DELETE` requests.

* **Swagger Documentation:** Compliant with the project's OpenAPI/Swagger specification (located in the `/docs` folder).

* **CORS Enabled:** Fully configured to communicate seamlessly with the React frontend application.

## Project Structure

```
ML2_BackEnd/
├── server.js            # Main application entry point & server setup
├── mockData.js          # Centralized in-memory mock data for all entities
├── docs/
|   └── swagger.json     # OpenAPI/Swagger specification for the API
├── routes/
│   ├── user.routes.js   # User & Goal endpoints (CRUD + Goals)
│   └── fitness.routes.js# Food search, Meal logging, & Exercise logging endpoints
├── package.json         # Project metadata and dependencies
└── package-lock.json    # Locked dependency versions

```

## Prerequisites

Make sure you have the following installed on your machine:

* **Node.js** (v18 or higher recommended)

* **npm** (Node Package Manager)

## Getting Started & Installation

Follow these steps to set up and run the backend locally after cloning the repository:

1. **Clone the Repository:**

   ```
   git clone <repository-url>
   cd ML2_BackEnd
   
   ```

2. **Install Dependencies:**
   Install Express and CORS using npm:

   ```
   npm install
   
   ```

3. **Run the Server:**
   Start the development server:

   ```
   npm start
   
   ```

   *Alternatively, you can run:*

   ```
   node server.js
   
   ```

4. **Confirmation:**
   You should see the following message in your terminal:

   ```
   Server is running on port 8080
   
   ```

## API Endpoints Overview

The server runs on `http://localhost:8080/api` and exposes the following routes:

### User & Goal Routes (`user.routes.js`)

* `GET /api/users/:userId` - Retrieve user profile by ID

* `POST /api/users` - Create a new user account

* `PUT /api/user/:userId` - Update user profile details (e.g., weight, height)

* `DELETE /api/user/:userId` - Delete a user account

* `GET /api/users/:userId/goals` - Retrieve goals for a specific user

* `POST /api/users/:userId/goals` - Create/calculate goals for a user

### Fitness & Nutrition Routes (`fitness.routes.js`)

* `GET /api/foods` - Get the full list of available foods

* `GET /api/foods/search?query=...` - Search food items by query string

* `GET /api/users/:userId/meals` - Retrieve logged meals for a user

* `POST /api/users/:userId/meal` - Log a new meal

* `POST /api/users/:userId/exercises` - Log a new exercise/activity