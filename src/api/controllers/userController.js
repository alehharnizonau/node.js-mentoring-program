const User = require('../models/userModel');
const { response } = require("../utils/response");
const { getPostData } = require("../utils/getPostData");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        response(res, { data: users });
    } catch (err) {
        response(res, { data: { message: err }, status: 404 });
    }
}

const getUser = async (req, res, id) => {
    try {
        const user = await User.findById(id);

        response(res, { data: user });
    } catch (err) {
        response(res, { data: { message: err }, status: 404 });
    }
}

const createUser = async (req, res) => {
    try {
        const body = await getPostData(req);
        const { name, email, hobbies } = JSON.parse(body);
        const newUser = await User.create({ name, email, hobbies });

        response(res, { data: newUser, status: 201 });
    } catch (err) {
        response(res, { data: { message: err }, status: 404 });
    }
}

const updateUser = async (req, res, id) => {
    try {
        const user = await User.findById(id);
        const body = await getPostData(req);
        const { name, email, hobbies } = JSON.parse(body);
        const newUser = {
            name: name || user.name,
            email: email || user.email,
            hobbies: hobbies || user.hobbies
        }
        const updatedUser = await User.update(id, newUser);

        response(res, { data: updatedUser, status: 201 });
    } catch (err) {
        response(res, { data: { message: err }, status: 404 });
    }
};

const deleteUser = async (res, id) => {
    try {
        await User.findById(id);
        await User.remove(id);

        response(res, { data: { message: `User with id: ${id} removed.` }, status: 202 });
    } catch (err) {
        response(res, { data: { message: err }, status: 404 });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}