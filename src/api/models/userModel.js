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

const getHobbies = (userId) => new Promise((resolve, _reject) => {
    const index = usersData.findIndex((user) => user.id === userId);
    resolve(usersData[index].hobbies);
});

const updateHobby = (userId, hobby, hobbies, method) => new Promise((resolve, reject) => {
    const index = usersData.findIndex((user) => user.id === userId);
    const isHobbyExist = hobbies.includes(hobby);
    if (isHobbyExist && method === 'PUT') {
        reject(`User already has such hobby: ${hobby}. Please, add another one.`)
    } else if (!isHobbyExist && method === 'DELETE') {
        reject(`User doesn't have such hobby: ${hobby}`);
    } else {
        usersData[index].hobbies = method === 'PUT'
          ? [...hobbies, hobby]
          : hobbies.filter((userHobby) => userHobby !== hobby);
        writeDataToFile('src/api/data/users.json', usersData);
        resolve(usersData[index].hobbies);
    }
});

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    getHobbies,
    updateHobby
}