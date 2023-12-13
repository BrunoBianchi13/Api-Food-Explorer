const knex = require("../database/knex");
const AppError = require("../utils/appError")

const sqliteConnection = require('../database/sqlite')

class IngredientsControllers {
  

 async index(request, response) {


  const { id } = request.params
  console.log(id)

  const dishe = await knex.select('title')
  .from("ingredients")
  .where("dishes_id", id)
  

  

  console.log(dishe)
  return response.json(dishe);
  
}

async delete(request, response) {
console.log("oi")
  const { id } = request.params;

 const ingred = await knex("ingredients").where('dishes_id', id);

 await ingred.map(ing => {
    knex("ingredients").where('dishes_id', id).delete}
  ) 
  

 return response.status(201).json()
  
}


}

module.exports = IngredientsControllers