let db = require("../data/recipes");

// List all the recipes 
let listRecipes = function(req, res) {
  let sql = "SELECT id, name, ingredients, allergens, amounts, dietary FROM recipes";
  db.query(sql, function(error, results) {
    if (error) {
      console.error("Failed to get entries:", error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
};

// Get a specific recipe by its id 
let showRecipe = function(req, res) {
  let RecipeID = req.params.id;
  let sql = "SELECT * FROM recipes WHERE id = ?";
  let params = [RecipeID];

  db.query(sql, params, function(error, results) {
    if (error) {
      console.error("Could not fetch entry", error);
      res.sendStatus(500);
    } else if (results.length == 0) {
      res.status(404).send("Recipe not found");
    } else if (results.length > 1) {
      console.error("Fetched more than 1 result for id", RecipeID);
      res.sendStatus(500);
    } else {
      res.json(results[0]);
    }
  });
};

// Add a recipe
let createRecipe = function(req, res) {
  let { name, ingredients, amounts, allergens, dietary } = req.body;

  let sql = 'INSERT INTO recipes (name, ingredients, amounts, allergens, dietary) VALUES (?, ?, ?, ?, ?)';
  let params = [name, JSON.stringify(ingredients), JSON.stringify(amounts), JSON.stringify(allergens), JSON.stringify(dietary)];

  db.query(sql, params, function(error, results) {
    if (error) {
      console.error("Couldn't add entry to the database", error);
      res.sendStatus(500);
    } else {
      res.status(201).send(`Recipe added with ID: ${results.insertId}`);
    }
  });
};

// Update a recipe by id 
let updateRecipe = function(req, res) {
  let id = req.params.id;
  let { name, ingredients, amounts, allergens, dietary } = req.body;

  let sql = "UPDATE recipes SET name = ?, ingredients = ?, amounts = ?, allergens = ?, dietary = ? WHERE id = ?";
  let params = [name, JSON.stringify(ingredients), JSON.stringify(amounts), JSON.stringify(allergens), JSON.stringify(dietary), id];

  db.query(sql, params, function(error, result) {
    if (error) {
      console.error("Couldn't update recipe", error);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

// Delete a recipe by id 
let deleteRecipe = function(req, res) {
  let id = req.params.id;
  let sql = "DELETE FROM recipes WHERE id = ?";
  let params = [id];

  db.query(sql, params, function(error, result) {
    if (error) {
      console.error("Could not delete entry", error);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};

module.exports = {
  listRecipes,
  showRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
