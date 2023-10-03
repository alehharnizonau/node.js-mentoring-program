const fs = require('fs');

const writeDataToFile = (fileName, content) => {
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf8');
}

module.exports = {
    writeDataToFile
}