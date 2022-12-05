import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

//web-push

import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import notificationRoutes from './routes/notifications.js'

import { register } from './controllers/auth.js' 
import { createPost } from './controllers/posts.js'

import { verifyToken } from './middleware/auth.js'

import User from './models/User.js'
import Post from './models/Post.js'
import {users, posts} from './data/index.js'

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url); //grab the file url
const __dirname = path.dirname(__filename)
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));//set the directory of where we store files

// FILE STORAGE
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/assets');
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname);
    }
});


const upload = multer({ storage });

//routes with files
app.post('/api/auth/register', upload.single('picture'), register)
app.post('/api/create', verifyToken, upload.single('picture'), createPost)


app.use('/api/auth', authRoutes)

// user route
app.use('/api/users', userRoutes)

//post Route
app.use('/api/posts', postRoutes)


app.use('/api/notifications', notificationRoutes)

// Comment
// app.use('/api/comment', commentRoutes)




//MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on: ${PORT}`))

    // Add data once
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => {
    console.log(`${error} did not connect`)
})