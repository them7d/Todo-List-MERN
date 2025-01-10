const express = require("express");
const router = express.Router();

// get all tasks : GET - METHOD
router.get("/",(req, res)=>{
    res.send("list of tasks");
});
// create task : POST - METHOD
router.post("/", (req,res)=>{
    console.log(req.body.taskTitle);
});

// delete task : DELETE - METHOD
router.delete("/:id",(req, res)=>{
    console.log(`delete task ${req.params.id}`);
});

// update task : PUT - METHOD
router.put("/:id",(req, res)=>{
    console.log(`update task id : ${req.params.id}`);
});
module.exports = router;