const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

// const fileFilter = (req, file, cb) => {
  
//     if(file.mimetype === "image/png" || 
//     file.mimetype === "image/jpg"|| 
//     file.mimetype === "image/jpeg"){
//         cb(null, true);
//     }
//     else{
//         cb(null, false);
//     }
//  }

var upload = multer({
    storage: storage,
    // fileFilter: fileFilter
});

module.exports = upload;
