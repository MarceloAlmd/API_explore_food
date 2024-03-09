const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const DISHES = path.resolve(TMP_FOLDER, "dishes");
const INGREDIENTS = path.resolve(TMP_FOLDER, "ingredients");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  DISHES,
  INGREDIENTS,
  MULTER,
};
