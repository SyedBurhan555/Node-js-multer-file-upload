const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image Upload");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
