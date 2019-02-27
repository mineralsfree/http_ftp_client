const File = require("./File");
const fs = require('fs')
module.exports = class Folder{
    listAllItems(path) {
        let fileNamesArray = [];
        fs.readdirSync(path).forEach(filename => {
            let file = new File(path, filename);
            fileNamesArray.push(file)
        });
        return fileNamesArray;
    };
    constructor(path){
        this.path  = path;
        this.fileList = this.listAllItems(path)
    }
}