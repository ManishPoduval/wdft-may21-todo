
// Making our DB connection
require('../db')

//Get our TodoModel
const TodoModel = require('../models/Todo.model')
const mongoose = require('mongoose')

TodoModel.insertMany([
  {title: 'Teach Mongoose', description: 'Blah blah blah'},
  {title: 'Kahoot', description: 'Win the kahoot again!'}
])
  .then(() => {
      console.log('Todo added')
      mongoose.connection.close()
  })  
  .catch(() => {
      console.log('Seeding failed')
      mongoose.connection.close()
  })  