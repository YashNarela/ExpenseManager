const multer = require("multer");

const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB limit
  fileFilter: fileFilter,
});

module.exports = upload;
