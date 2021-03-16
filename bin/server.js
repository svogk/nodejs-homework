const app = require("../app");
const db = require("../model/db");
const path = require("path");
const createFolderIsExist = require("../helpers/create-dir");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const PUBLIC_DIR = process.env.PUBLIC_DIR;
    const IMG_DIR = path.join(process.cwd(), "public", "images");

    await createFolderIsExist(UPLOAD_DIR);
    await createFolderIsExist(PUBLIC_DIR);
    await createFolderIsExist(IMG_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`Server not running. Error message: ${error.message}`);
  process.exit(1);
});
