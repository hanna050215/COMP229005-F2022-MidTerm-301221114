/**
todo.js
Hanna Yeom
301221114
To-do web app
**/
var express = require('express');
var router = express.Router();

let todoController = require('../controllers/todo');

// Helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
    // ADD YOUR CODE HERE 
}

router.get('/add', requireAuth);
router.get('/edit/:id', requireAuth);
router.get('/delete/:id', requireAuth);

/* GET list of items */
router.get('/list', todoController.todoList);

// Route for Details
router.get('/details/:id', todoController.details); 

// Routers for edit
router.get('/edit/:id', todoController.displayEditPage, (req, res, next)=>{
        let id = req.params.id;

    todoController.findById(id, (err, todoEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        } else{
            res.render("/todo/details", {
                title: "Edit To-Do",
                todo: todoEdit,
            });
        }
    });
});

router.post('/edit/:id', todoController.processEditPage, (req, res, next) =>{
    let id = req.params.id;

    let editList = todoController({
        _id : id,
        Task : req.body.Task,
        Description : req.body.Description,
    });

    todoController.update({_id : id}, editList, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else{
            res.redirect("/todo/list");
        }
    });
}); 

// Delete
router.get('/delete/:id', todoController.performDelete, (req, res) =>{
    let id =req.params.id;

    console.log(id + ' is deleted.')
    todoController = todoController.filter((value)=> value != id)
    res.redirect('/todo/list')
});

/* GET Route for displaying the Add page - CREATE Operation */
 router.get('/add', todoController.displayAddPage, (req, res)=> {
    res.render("/todo/add",{
    title: "Add a new To-Do"
   });
});

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', todoController.processAddPage, (req, res) => {
       let id = req.params.id;

    let newTodo = todoController({
        _id : id,
        Task : req.body.Task,
        Description : req.body.Description,
    });

    todoController.create(newTodo, (err, Todo)=>{
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/todo/list");
        }
    })
});


module.exports = router;