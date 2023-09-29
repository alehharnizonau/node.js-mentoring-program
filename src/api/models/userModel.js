const usersData = require('../data/users');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require("../utils/writeDataToFile");

const findAll = () => new Promise((resolve, _reject) => {
    const users = usersData.map(({ id, name, email }) => ({ id, name, email }));
    resolve(users);
});

const findById = (userId) => new Promise((resolve, reject) => {
    const user = usersData.find((user) => user.id === userId);
    if (user) {
        const { id, name, email } = user;
        resolve({ id, name, email });
    } else {
        reject(`User with id:${userId} not found `);
    }
});

const create = (user) => new Promise((resolve, _reject) => {
    const newUser = { ...user, id: uuidv4() };
    usersData.push(newUser);
    writeDataToFile('src/api/data/users.json', usersData);
    resolve(newUser);
});

const update = (id, user) => new Promise((resolve, _reject) => {
    const index = usersData.findIndex((user) => user.id === id);
    usersData[index] = { id, ...user };
    writeDataToFile('src/api/data/users.json', usersData);
    resolve(usersData[index]);
});

const remove = (id) => new Promise((resolve, _reject) => {
    const users = usersData.filter((user) => user.id !== id);
    writeDataToFile('src/api/data/users.json', users);
    resolve();
});

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}