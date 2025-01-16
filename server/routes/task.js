const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const  { getDB }  = require("../db/conn");
// get all tasks : GET - METHOD
router.get("/",async (req, res)=>{
    try{
        const db = getDB();
        const tasks = await db.collection("tasks").find({}).toArray();
        res.json(tasks);
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
    try{
        const db = getDB();
        await db.collection("tasks").insertOne({
            userId: req.body.userId,
            title: req.body.title,
            completed:req.body.completed,
            CreatedAt:new Date(),
            UpdatedAt:new Date()
        });
    }catch(error){
        console.log(error)
    }
});

// delete task : DELETE - METHOD
router.delete("/:id", async (req, res)=>{
    try{
        const db = getDB();
        await db.collection("tasks").deleteOne({_id :req.body.Id});
    }catch(error){
        console.log(error)
    }
    console.log(`deleted task ${req.params.id}`);
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
        res.send("updated sccessfully")
    }
    console.log(req.body);
    
    console.log(`update task id : ${req.body.id}`);
});
module.exports = router;