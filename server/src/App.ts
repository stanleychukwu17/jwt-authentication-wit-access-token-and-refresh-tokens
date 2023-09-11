import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const port = process.env.PORT || 4000

//* creates an express app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// app.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:3000",
//     })
// );
require('dotenv').config()

//* import {connectToDb, getDb} from './db'
const {ObjectId} = require('mongodb');
const {connectToDb, getDb} = require('./db')

//* opens connection to the mongodb database before listening for request
let db: any
connectToDb((err: any) => {
    if (!err) {
        // now we can start listening for events
        app.listen(port, () => {
            console.log(`now listening to request from port ${port}`)
        })

        // updates our database variable
        db = getDb()
    } else {
        console.log(`we have an error, error: ${err}`)
    }
})