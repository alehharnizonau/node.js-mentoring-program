const User = require('../models/userModel');
const { response } = require("../utils/response");

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

module.exports = {
    getUsers,
    getUser
}