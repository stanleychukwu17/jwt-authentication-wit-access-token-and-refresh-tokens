import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from './routes'
import deserializeUser from "./middleware/deserializeUser";

const port = process.env.PORT || 4000
require('dotenv').config()

//* creates an express app
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// app.use(
//     cors({ credentials: true, origin: "http://localhost:3000",})
// );
app.use(deserializeUser);



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

        routes(app);
    } else {
        console.log(`we have an error, error: ${err}`)
    }
})