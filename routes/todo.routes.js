const router = require("express").Router();
const TodoModel = require('../models/Todo.model')



/* GET home page */
router.get("/todos", (req, res, next) => {
    // 1. we need to get the ToDo elements from the DB using the .find() method. If we don't pass an argument it will fetch all elements

    TodoModel.find()
      .then((todos) => {
          // 2. renders a the todos-list.hbs view with all ToDos
          res.render('todos/todo-list.hbs', {todos}) // ----> render() accepts a path to your views file
      })
      .catch(() => {
            next('Todo fetch failed')
      })

});

// Handling GET requests to /todos/create
router.get('/todos/create', (req, res, next) => {
    // 1. render the form where users will be able to create new elements
    res.render('todos/create-form.hbs') // on renders, NEVER start with a "/"
})

// Handling POST requests to /todos/create
router.post('/todos/create', (req, res, next) => {
    // 1. receive information from form via req.body 
    const {title, description} = req.body 

    // 2. use that information gathered to create a new element in our DB using the mongoose .create() method, passing the obj to create with the attributes

    TodoModel.create({title, description})
        .then(() => {
            // 3. send the user to the list of ToDos after the new ToDo is created by using redirect
            res.redirect('/todos') // on redirect, ALWAYS start with a "/"
        })
        .catch(() => {
            next('Create failed')
        })

})

// Handling GET requests to /todo/SOME_DYNAMIC_ID
router.get('/todo/:id', (req, res, next) => {
  // 1. the id of the ToDo we need to display, through the dynamic params
    let dynamicTodoId = req.params.id

    //grab the specific todo with that id from the DB
    // then show it in the todo-detail page

  // 2. look in the DB for that specific ToDo using the .findById() method and passing the id
    TodoModel.findById(dynamicTodoId)
      .then((todo) => {
          // 3. render a detailed view to the user with the ToDo details
          res.render('todos/todo-detail.hbs', {todo})
      })
      .catch(() => {
        next('Finding specific todo failed')
      })

})


// --------------------------------------------------------
//            DELETE ROUTE
// --------------------------------------------------------

// Handling POST requests to /todo/SOME_DYNAMIC_ID/delete
router.post('/todo/:id/delete', (req, res, next) => {
  // 1. catch the id of the ToDo we need to delete, through the dynamic params
    let dynamicTodoId = req.params.id

  // 2. use the ,findByIdAndDelete() to delete the element from the DB
    TodoModel.findByIdAndDelete(dynamicTodoId)
      .then(() => {
          // 3. after the delete is done correctly, we can redirect the user to the list of ToDos
          res.redirect('/todos') // START with a / because we are redirecting the user to a url
      })
      .catch(() => {
          next('Deleting specific todo failed')
      })

})

// --------------------------------------------------------
//            EDIT ROUTES
// --------------------------------------------------------

// Handling GET requests to /todo/SOME_DYNAMIC_ID/edit
router.get('/todo/:id/edit', (req, res, next) => {
  let dynamicTodoId = req.params.id

  // 2. look in the DB for that specific ToDo using the .findById() method and passing the id
  // We need current information of the ToDo in order to preview it to the user in the edit-form.
  TodoModel.findById(dynamicTodoId)
    .then((todo) => {
        // 3. render the edit-form to the user, with the current ToDo information as values of the form. See edit-form.hbs
        res.render('todos/edit-form.hbs', {todo})
    })
    .catch(() => {
        next('Cannot find todo details')
    })
})

// Handling POST requests to /todo/SOME_DYNAMIC_ID/edit
router.post('/todo/:id/edit', (req, res, next) => {
  // 1. catch the id of the ToDo we need to edit, through the dynamic params
  let dynamicTodoId = req.params.id

  // 2. get body with elements to be edited
  const {title, description} = req.body

  // 3. use the .findByIdAndUpdate() method to edit the ToDo element with the new values. All update methods need at least two arguments
  // --- 1st argument: The id or query of the element that will be updated
  // --- 2nd argument: The properties/attributes of the element that will be updated.
  // --- 3rd argument(optional): List of options, (eg, new: true)
  TodoModel.findByIdAndUpdate(dynamicTodoId, {title, description})
    .then(() => {
        res.redirect('/todos')
    })
    .catch(() => {
        next('Edit failed')
    })
})

module.exports = router;
