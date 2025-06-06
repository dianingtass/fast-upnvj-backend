const multer = require('multer');
const path = require('path');
const fs = require('fs');

const folder = 'uploads/disposisi';
if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed'), false);
};

const upload = multer({ storage, fileFilter });
module.exports = upload;