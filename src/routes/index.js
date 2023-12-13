const { Router } = require("express");

const usersRouter = require("./user.routes")
const dishesRouter = require("./dishes.routes")
const sessionsRouter = require("./sessions.routes")
const ingredientsRouter = require("./ingredients.routes")
const routes = Router()


routes.use("/users", usersRouter)
routes.use("/dishes", dishesRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/ingredients", ingredientsRouter)
module.exports = routes