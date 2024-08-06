// Dependencies
const express = require('express');
const user =  express.Router();

// Queries
const {
    getAllUsers,
    updatePassword,
    deleteUser
} = require('../queries/usersQueries');

// users should not be able to view all users only for dev use
// user.get('/', async (req, res) => {
//     const usersList = await getAllUsers();

//     if(usersList[0]) {
//         res.status(200).json(usersList)
//     } else {
//         res.status(500).json({error: "Server error"})
//     }
// });


user.put('/', async (req, res) => {
    const { password } = req.body.password;
    const { id } = req.session.user.id;
    const updatedUser = await updatePassword(password, id);

    if(updatedUser.id) {
        res.status(200).json(updatedUser)
    } else {
        res.status(404).json({error: "User not found"})
    }
});

user.delete('/', async (req, res) => {
    const { id } = req.session.user.id;
    const deletedUser = await deleteUser(id);

    if(deletedUser.id) {
        res.status(200).json({message: "User Deleted"})
    } else {
        res.status(404).json({error: "Unable to delete user not found"})
    }
});

module.exports = user;