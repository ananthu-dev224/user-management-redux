const multer = require('multer')
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');


// const storage = multer.diskStorage({
//     destination: function (req,file,cb) {
//         cb(null,'uploads')
//     },
//     filename: function (req,file,cb) {
//         const uniqueFilename = uuidv4() + path.extname(file.originalname);
//         cb(null, uniqueFilename);
//     }
// })

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }); //storing temporary in memory


module.exports = upload;