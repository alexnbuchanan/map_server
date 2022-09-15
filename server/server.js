const express = require("express");
const cors = require("cors"); // to avoid CORS error: npm install cors
const app = express();
const { cloudinary } = require("./utils/cloudinary");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "map_pics",
    });
    console.log(uploadedResponse);
    res.json({ url: uploadedResponse.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Something went wrong" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
