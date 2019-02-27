const express = require('express');
const router = express.Router();
const folderPath = "./files";
const Folder = require('../models/Directory.js');
const File = require('../models/File.js');
const path = require('path');
const fs =  require('fs');


mainFolder = new Folder(folderPath);
router.get('/', (req, res, next) => {
    res.status(200).json({
        fileList: mainFolder.fileList
    })
});
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Post request'
    })
});
router.put('/:fileId',(req, res, next) =>{
   const id = req.params.fileId;
   let file = appRoot +  '/files/' + id;
    var data = [];
    req.on('data', function(chunk) {
        console.log(data);
        data.push(chunk);
    });
    req.on('end', function() {
        let binary = Buffer.concat(data);
        fs.writeFileSync(file,binary)
    });



   res.status(200).json({
       message: "Hell yeah"
    })
});
router.get('/:fileId', (req, res, next) => {
    const id = req.params.fileId;
    let file = appRoot +  '/files/' + id;
        res.download(file);
});
router.delete('/:fileID', (req, res, next)=>{
    res.status(200).json({
        message: 'File deleted'
    })

});
module.exports = router;