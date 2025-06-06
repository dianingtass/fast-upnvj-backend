const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'fasilitas_foto/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
