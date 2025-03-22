import multer, { FileFilterCallback } from "multer";
import path from "path";

export const diskStorage = multer.diskStorage({
  // konfigurasi folder penyimpanan file
  destination: function (req, file, cb) {
    const path = `./uploads/${file.fieldname}`;
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

export const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  cb(null, allowedMimeTypes.includes(file.mimetype)); // Accept the file
};
