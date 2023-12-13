require("dotenv/config")
require("express-async-errors")


const migrationRun = require("./database/sqlite/migrations")

const cors = require("cors")
const express = require("express")


const routes = require("./routes")
const AppError = require("./utils/AppError")

const { UPLOADS_FOLDER } = require('./configs/upload'); 

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(UPLOADS_FOLDER)); 
app.use(routes)

migrationRun()

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status:"error",
      message: error.message
    })
  }


  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = process.env.SERVER_PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
