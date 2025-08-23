const multer = require('multer');
const path = require('path');





// Configure storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname,"..","public","uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const pathExt = path.extname(file.originalname)
        cb(null,file.fieldname +  uniqueSuffix + pathExt);
    }
});

const upload = multer({storage });

module.exports = upload;
