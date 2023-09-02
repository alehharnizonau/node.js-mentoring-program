function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

getRandomNumber();

module.exports = {
    getRandomNumber,
};