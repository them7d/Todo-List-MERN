const { MongoClient } = require("mongodb");
// const { mongoClient } = mongodb;
const { todo }= require("../schemas")
require("dotenv").config();

// get user and password from .env
const user = process.env.USER;
const pass = process.env.PASS;

// create url, client, database variables
uri = `mongodb+srv://${user}:${pass}@todo-list.kvyoo.mongodb.net/?retryWrites=true&w=majority&appName=todo-list`;
let client = null;
let db = null;

// Connection funtion to export it later
const connectToDatabase = async (database)=>{
    if(client === null){
        try{
            client = new MongoClient(uri);
            await client.connect();
            db = client.db(database);
            const collectionName = "tasks";
            const collections = await db.listCollections({ name: collectionName }).toArray();
            collections.length === 0 && db.createCollection(collectionName);
            // await db.command({
            //     collMod: collectionName,
            //     validator: {
            //       $jsonSchema: todo.$jsonSchema
            //     },
            //     validationLevel: 'strict',
            //     validationAction: 'error'
            //   });
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
const getDB = () => client && client.db("todo");
// exports variables
// @param connectToDatabase function
// @param closeConnection function
// @param db object
module.exports = {connectToDatabase, closeConnection, getDB};