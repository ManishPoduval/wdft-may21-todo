const mongoose = require('mongoose')

// Schema is the format our DB elements will have
let TodoSchema = new mongoose.Schema({
   title: String, 
   description: String
})

// this will create the model we use for accesing the ToDo collection
// automatically the collection is going to be model name, all lowercase and plural => "todos"
let TodoModel = mongoose.model('todo', TodoSchema )


module.exports = TodoModel