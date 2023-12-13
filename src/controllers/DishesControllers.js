const knex = require("../database/knex");
const AppError = require("../utils/AppError")

const sqliteConnection = require('../database/sqlite')

class DishesControllers {
  async create (request,response){
    const { title, description, category, picture, price,tags } = request.body


    

    const a = await knex("dishes").insert({
      title, description, category, picture, price
    });
    

    var dishes = (a[0]);
    var dishes_id = dishes.toString();
    
    const Itags = tags.map(title => {
      return {
        title,dishes_id
      }
    }) 
 
    
    await knex("ingredients").insert(Itags)
    
    return response.json(dishes_id)
  }


  async update(request, response) {
    const { title, description, category, tags, price } = request.body
    const { id } = request.params


    

    const database = await sqliteConnection()
    const dishes = await database.get("SELECT * FROM dishes WHERE id = (?)", [id])

    if(!dishes) {
     throw new AppError("Usuário não encontrado")
    }
   
  
    dishes.title = title
    dishes.description= description
    dishes.category = category
    dishes.price= price
  
    
   

    const up = await database.run(`
     UPDATE dishes SET
     title = ?,
     description = ?,
     category = ?,
     price = ?
     WHERE id = ?`, 
     [dishes.title, dishes.description, dishes.category, dishes.price, id]
   )


    
    
    await knex("ingredients").where('dishes_id', id).delete()
    

    

    var dishes_id = id

    const Itags = tags.map(a => {

      var title = a.title
      return {
        title,dishes_id
      }
    }) 
  
    
    await knex("ingredients").insert(Itags)
    
 
   return response.json(dishes)
 }

 async index(request, response) {

  const { title, category } = request.query;
 


  const dishe = await knex.select()
  .from("dishes")
  .where("category", category)
  .whereLike("title", `%${title}%`)
  
  return response.json(dishe);
  
}
async show(request, response) {
  
  const  { id }  = request.params
  const dishes = await knex.select()
  .from("dishes")
  .where('id', id).groupBy("dishes.id")
  
  /*
  dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.description",
          "dishes.category",
          "dishes.picture",
          "dishes.price"
        ])
        .where("dishes.id", id)
        .innerJoin("dishes", "dishes.id", "ingredients.dishes_id")
        .groupBy("dishes.id")

        const ingred = await knex("ingredients").where('dishes_id', id);

        
        const dishesWithIngredients = dishes.map(ds => {
          
          const igdts = ingred.filter(i => i.dishes_id == id);
          
          return {
            ...ds,
            ingredients: igdts
          }
        });

        
*/


  return response.json(dishes);
  
}


async delete(request, response) {

  const { id } = request.params;

try {
  await knex("dishes").where({id}).delete()
} catch (error) {
  console.log(error)
}


 const ingred = await knex("ingredients").where('dishes_id', id);

 await ingred.map(ing => {
    knex("ingredients").where('dishes_id', id).delete}
  ) 
  

 return response.status(201).json()
  
}



}

module.exports = DishesControllers
