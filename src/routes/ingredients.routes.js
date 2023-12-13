const { Router } = require("express")
const IngredientsControllers = require("../controllers/IngredientsControllers")




const ingredientsRouter = Router()

const ingredientsController = new IngredientsControllers()
ingredientsRouter.get("/:id", ingredientsController.index)
ingredientsRouter.delete("/:id", ingredientsController.delete)
module.exports = ingredientsRouter