// Dependencies
const { db } = require('../db/dbconfig');

const getAllUsers = async () => {
    try {
        const usersList = await db.any('SELECT * FROM users');
        return usersList;
    } catch (error) {
        return error;
    }
};

const loginUser = async (login) => {
    try {
        const loginFound = await db.one("SELECT * FROM users WHERE username = $1 AND password = $2", 
            [
                login.username,
                login.password
            ]
        );
        return loginFound;      
    } catch (error) {
        return error;
    }
};

const createUser = async (user) => {
    try {
        const createdUser = await db.one('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [
                user.username,
                user.password,
                user.email
            ]
        );
        return createdUser;
    } catch (error) {
        return error;
    }
};

const updatePassword = async (password, id) => {
    try {
        const updatedUser = await db.one('UPDATE users set password=$1 WHERE id=$2 RETURNING *', 
            [
                password,
                id
            ]);
        return updatedUser;
    } catch (error) {
        return error;
    }
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one('DELETE FROM users WHERE id=$1 RETURNING *', id);
        return deletedUser;
    } catch (error) {
        return error;
    }
};

module.exports = { getAllUsers, loginUser, createUser, updatePassword, deleteUser }