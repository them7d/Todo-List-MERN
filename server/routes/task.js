const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const  { getDB }  = require("../db/conn");

// get all tasks : GET - METHOD
router.get("/",async (req, res)=>{
    try{
        const db = getDB();
        const tasks = await db.collection("tasks").find({}).toArray();
        res.status(200).json(tasks);
        return;
    }catch(error){
        console.log(error);
        res.status(500).send("error internal server");
        return;
    }
    res.send("no task found");
});

// create task : POST - METHOD
router.post("/", async (req,res)=>{
    let task = {
        _id: new ObjectId(),
        title: String(req.body.title),
        completed:req.body.completed,
        userId:"1",
        CreatedAt:new Date(),
        UpdatedAt:new Date()
    };
    try{
        const db = getDB();
        let response = await db.collection("tasks").insertOne(task);
    }catch(error){
        console.log(error)
    }finally{
        console.log();
        res.status(200).send(task);
    }
});

// delete task : DELETE - METHOD
router.delete("/", async (req, res)=>{
    console.log(req.body);
    try{
        const db = getDB();
        const response = await db.collection("tasks").deleteOne({_id : new ObjectId(String(req.body.id))});
        res.status(200).send();
    }catch(error){
        console.log(error)
    }
    console.log(`deleted task ${req.body.id}`);
});

// update task : PUT - METHOD
router.put("/", async (req, res)=>{
    try{
        const db = getDB();
        let response = await db.collection("tasks").updateOne({_id: new ObjectId(String(req.body.id))},{$set:{ title: req.body.title, completed: req.body.completed }});
        console.log(response);
        
    }catch(error){
        console.log(error)
    }finally{
        res.status(200).send("updated sccessfully")
    }
    
    console.log(`update task id : ${req.body.id}`);
});

module.exports = router;