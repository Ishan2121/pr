import express from 'express'
import {connectToMongo} from './config/db.js'
import cors from 'cors'
import AuthRoute from './routes/AuthRoutes.js'
import FileRoute from './routes/FileRoutes.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from './config/cloudinary.js'

const app = express() // server created
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'uploads/'
}))
connectToMongo() // database connected
cloudinaryConnect()
const port = process.env.PORT || 5000 // port specified

// middlewares ;-
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// routes;-
app.get('/', (req, res) => {
    res.json('hello world')
})
app.use('/auth', AuthRoute)
app.use('/file', FileRoute)

app.listen(port,() => {
    console.log(`app listening on port ${port}`)
})