const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const csvFilePath = path.join(__dirname, "csvDirectory", "csvFile.csv");
const txtFilePath = path.join(__dirname, "txtFile.txt");

const csvToJson = async () => {
    try {
        const writableStream = fs.createWriteStream(txtFilePath);

        await csv({
            delimiter: 'auto'
        }).fromFile(csvFilePath)
          .subscribe(async (json) => {
              const { Book, Author, Price } = json;
              const jsonData = {
                  book: Book,
                  author: Author,
                  price: Price,
              };

              await new Promise((resolve, reject) => {
                  writableStream.write(`${JSON.stringify(jsonData)}\n`, (error) => {
                      if (error) {
                          return reject(error);
                      }

                      resolve();
                  });
              })
          })

        writableStream.on("error", (error) => {
            console.error(`Error writing to ${txtFilePath} file:`, error.message);
        });
    } catch (error) {
        console.error("Converting error:", error.message);
    }
};

csvToJson();