const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  limits: {
    fileSize: 1000000
  },
  filename: function (req, file, cb) {
    let ext = file.mimetype.split('/');
    let postfix = ext[ext.length - 1];
    cb(null, file.originalname);
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  }
});

const upload = multer({ storage: storage });


module.exports = {
  upload
}