import express from 'express'
import mongoose from "mongoose";
import multer  from "multer"
import {registerValidation} from "./validations/auth.js"
import checkAuth from "./utils/checkAuth.js";
import {login, meInfo, register} from './controllers/UserController.js'
import dotenv from 'dotenv';
dotenv.config()
import {
    createPost,
    getAll,
    getOne,
    deletePost,
    updatePost,
    getLastTags,
    addComment
} from './controllers/PostController.js'
import {loginValidation} from "./validations/login.js";
import {postValidation} from "./validations/post.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from 'cors'

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://lghosta:${process.env.DB_PASS}@cluster0.w3qzuwk.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>console.log("DB OK"))
    .catch((err) => console.log(err))

const app = express();
const port = 9999

const storage = multer.diskStorage({
    destination : (_, __, cb) => {
        cb(null, "uploads")
    },
    filename : (_, filename, cb) => {
        cb(null, filename.originalname)
    }
});

const upload = multer({storage})

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post("/upload",  upload.single("image"), (req, res) => {
    res.json({
        url : `uploads/${req.file.originalname}`
    })
})
app.post("/upload/avatars",  upload.single("avatarUrl"), (req, res) => {
    res.json({
        url : `uploads/${req.file.originalname}`
    })
})
// reg & log
app.post("/auth/register",  registerValidation, handleValidationErrors, register)
app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.get("/me", checkAuth, meInfo)
// posts
app.get("/posts",  getAll )
app.get("/posts/:id", getOne)
app.post('/posts',checkAuth, postValidation, createPost)
app.delete("/posts/:id", checkAuth,  deletePost )
app.patch("/posts/:id",checkAuth, updatePost )
//tags
app.get('/tags', getLastTags)
//comments
app.post('/posts/addComment/:id/', checkAuth, addComment)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

