const usersData = require('../data/users');

const findAll = () => new Promise((resolve, _reject) => {
    const users = usersData.map(({ id, name, email }) => ({ id, name, email }));
    resolve(users);
})

const findById = (userId) => new Promise((resolve, reject) => {
    const user = usersData.find((user) => user.id === userId);
    if (user) {
        const { id, name, email } = user;
        resolve({ id, name, email });
    } else {
        reject(`User with id:${userId} not found `);
    }
})

module.exports = {
    findAll,
    findById
}