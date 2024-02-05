const fs = require('fs');

class FileHandler {
    constructor(filePath) {
        this.filePath = filePath;
    }

    writeToFile(data, callback) {
        fs.writeFile(this.filePath, data, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    appendToFile(data, callback) {
        fs.appendFile(this.filePath, data, (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    readFile(callback) {
        fs.readFile(this.filePath, 'utf8', (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}

module.exports = FileHandler;
