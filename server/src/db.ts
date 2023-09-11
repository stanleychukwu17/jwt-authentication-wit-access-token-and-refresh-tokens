import {MongoClient} from 'mongodb'

// define the type of callback function
type callbackFn = (info?:any) => void

// declaration of variables to be used/updated
let dbConnection: any
let dbUrl:string = 'mongodb://0.0.0.0:27017/jwtAuthentication'

module.exports = {
    connectToDb : (cb: callbackFn) => {
        MongoClient.connect(dbUrl)
        .then(client => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            return cb(err)
        })
    },

    getDb : () => dbConnection
}