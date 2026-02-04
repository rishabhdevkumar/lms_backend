const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../service/db.service");

router.post("/add",
async(req,res)=>{
let dep = req.body;
if(!dep.dep_name || !dep.dep_short_name){
    res.json({ok: false, msg: "All fields are required"});
}else{
    const con = await db();
    const data = await con.execute("CALL sp_faculty_dep_add(?, ?)",[
        dep.dep_name,
        dep.dep_short_name
    ])
    return res.json(data[0][0]);
}
}
)

router.post("/getall",
async(req,res)=>{
    const con = await db();
    let data = await con.execute("CALL sp_faculty_dep_getall()",[]);
    res.json(data[0][0]);
}
)


  

module.exports = router;