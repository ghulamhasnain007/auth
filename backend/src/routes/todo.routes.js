const express = require('express')
const {createTodo, getTodoByUser, updateTodo, deleteTodo} = require('../controllers/todo.controller.js');
const { verifyToken } = require('../middleware/auth.middleware.js');




const router = express.Router();

router.post('/create-todo', verifyToken, createTodo)
router.get('/:user', getTodoByUser)
// router.get('/:user', verifyToken, getTodoByUser)
router.patch('/:todo_id/update', verifyToken, updateTodo)
router.delete('/:todo_id/delete', verifyToken, deleteTodo)


module.exports ={
   router
}