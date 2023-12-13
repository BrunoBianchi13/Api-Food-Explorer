const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");



class PictureControllers{

  async update(request, response){
    const dishes_id = request.params.id;
    
    const dishesFileName = request.file.filename;
    console.log(dishes_id)
    
    const diskStorage = new DiskStorage()

    console.log("oi")
    const dishes = await knex("dishes").where({ id: dishes_id}).first()
    console.log(dishes)
    if (!dishes) {
      throw new json("Somente usuarios autenticados podem mudar o avatar")
    }

    if (dishes.picture) {
      
      await diskStorage.deleteFile(dishes.picture)
    }

    const fileName = await diskStorage.safeFile(dishesFileName)
    dishes.picture = fileName

    await knex("dishes").update(dishes).where({ id: dishes_id })
    console.log(dishes)
    return response.json({dishes})
  }

}

module.exports = PictureControllers