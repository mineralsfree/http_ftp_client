const fs = require('fs')
module.exports = class File{
    constructor(path, filename){
        let file = this;
        let filepath = path + '/' + filename;
        fs.stat(filepath, function(err, rawStats){
            file["name"] = filename;
            file["size"]= rawStats["size"];
            file["type"] = (rawStats.isFile()) ? "file" : "dir";
            file["created"] = rawStats["ctime"];
            file["modified"] =rawStats["mtime"];
            file["accessed"] = rawStats["atime"]
        });

    }
};
