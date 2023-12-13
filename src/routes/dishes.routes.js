const { Router, request } = require("express")
const DishesControllers = require("../controllers/DishesControllers")
const multer = require("multer")
const uploadConfig = require("../configs/upload")
const PictureControllers = require('../controllers/PictureControllers')

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesControllers = new DishesControllers()
const pictureControllers = new PictureControllers()

dishesRoutes.post("/", dishesControllers.create)
dishesRoutes.get("/", dishesControllers.index)
dishesRoutes.get("/:id", dishesControllers.show)
dishesRoutes.delete("/:id", dishesControllers.delete)
dishesRoutes.put("/:id", dishesControllers.update)
dishesRoutes.patch("/:id", upload.single("avatar"), //(request, response) => {
  //console.log(request.file.filename)
  //response.json()}
  pictureControllers.update
  )
module.exports = dishesRoutes