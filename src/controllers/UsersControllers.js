const { hash } = require("bcryptjs")
const { compare } = require("bcryptjs");

const AppError = require("../utils/appError")

const sqliteConnection = require('../database/sqlite')


class UsersControllers {
  async create (request,response){
    const { name, email, password } = request.body
    console.log("oii")


    

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
    }


    const hashPassword = await hash(password, 8)



    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashPassword]
    )


    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id




    
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!user) {
     throw new AppError("Usuário não encontrado")
    }
    
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      
     throw new AppError("Este e-mail já está em uso.")
    }

    user.name = name
    user.email= email

    if(password && !old_password) {
     throw new AppError("Você informar a senha antiga para definir a nova senha")
    }
    
    if(password && old_password) {
 
     const checkOldPassword = await compare(old_password, user.password)
     //console.log("user.password")
     if(!checkOldPassword) {
      
       throw new AppError("A senha antiga não confere.")
     }

     user.password = await hash(password, 8)
     
    }
    
    await database.run(`
     UPDATE users SET
     name = ?,
     email = ?,
     password = ?,
     updated_at = ?
     WHERE id = ?`, 
     [user.name, user.email, user.password, new Date(), user_id]
   )

   return response.json()
 }

}

module.exports = UsersControllers