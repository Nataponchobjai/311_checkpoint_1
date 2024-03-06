let express = require("express");
let router = express.Router()
let controller = require("../controllers/recipeControllers")


//Return all recipes
router.get("/recipes", controller.listRecipes)
//Return just the recipe that matches the path param (id)
router.get("/recipes/:id", controller.showRecipe)
//Create a new recipe (sampleUser).
router.post("/recipes", controller.createRecipe)
//Update one recipe matching the path param (id). 
router.put("/recipes/:id", controller.updateRecipe)
//Delete one recipe by its id
router.delete("/recipes/:id", controller.deleteRecipe)


module.exports = router;