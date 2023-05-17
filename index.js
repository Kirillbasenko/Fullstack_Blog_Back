import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import multer from "multer"
import router from "./routes/index.js"

const PORT = process.env.PORT || 5000

mongoose
   .connect("mongodb+srv://kirill:elizaveta@node-blog.3w2atvr.mongodb.net/blog?retryWrites=true&w=majority")
   .then(() =>  console.log("DB ok"))
   .catch((e) => console.log(e))

const app = express()

const storage = multer.diskStorage({
   destination: "upload/",
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
})

const upload = multer({storage})

app.use("/upload", express.static("upload"))

app.post("/upload", upload.single("image"), (req, res) => {
   const imageUrl = `https://zebra-gabardine.cyclic.app/upload/${req.file.originalname}`;
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.json({ url: imageUrl });
})

app.use(cors())
app.use(express.json())
app.use("/api", router)


app.get("/", (req, res) => {
   res.status(200).json({message: "Working"})
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
