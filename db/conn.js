const mongodb = require("mongodb");
const {mongoClient} = mongodb;
require("dotenv").config();

// get user and password from .env
const user = process.env.USER;
const pass = process.env.PASS;

// create url, client, database variables
uri = `mongodb+srv://${user}:${pass}@todo-list.kvyoo.mongodb.net/?retryWrites=true&w=majority&appName=todo-list`;
let client = null;
let db = null;

// Connection funtion to export it later
const connectToDatabase = async ()=>{
    if(client === null){
        try{
            client = mongoClient(uri);
            await client.connect();
            db = client.db();
            db && console.log("connected to database");
        }catch(error){
            console.log(error);
            process.exit(1);
        }
    }
    return db
};

// close connection function
const closeConnection = async()=>{
    if(client){
        await client.close();
        client = null;
        db = null;
        console.log("connection to database closed");
    }
};
// export 
module.exports = {connectToDatabase, closeConnection, db};