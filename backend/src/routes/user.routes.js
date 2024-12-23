const express = require('express');
const { createUser, getUsers, getOneUser, updateUser, deleteUser, loginUser, logoutUser } = require('../controllers/users.controller');
const { isAdmin, verifyToken } = require('../middleware/auth.middleware');


const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/users', verifyToken, isAdmin, getUsers)
// router.get('/users', getUsers)
router.get('/user/:id', verifyToken, getOneUser)
router.patch('/user/:id/update', verifyToken, isAdmin, updateUser)
// router.patch('/user/:id/update', updateUser)
router.delete('/user/:id/delete',verifyToken, isAdmin, deleteUser)
// router.delete('/user/:id/delete', deleteUser)

module.exports = {
    router
}

