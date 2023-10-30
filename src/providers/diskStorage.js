const path = require("path");
const uploadsConfig = require("../configs/uploads");
const fs = require("fs");

class DiskStorage {
  async save(filename, destination) {
    await fs.promises.rename(
      path.resolve(uploadsConfig.TMP_FOLDER, filename),
      path.resolve(destination, filename)
    );
  }

  async delete(filename, destination) {
    const filePath = path.resolve(destination, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
