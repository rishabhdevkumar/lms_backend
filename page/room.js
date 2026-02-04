const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../service/db.service");

router.post("/add",
async(req,res)=>{
let r = req.body;
if(!r.block_id || !r.room_no){
    res.json({ok: false, msg: "All fields are required"});
}else{
    const con = await db();
    const data = await con.execute("CALL sp_room_add(?, ?)",[
        r.block_id,
        r.room_no
    ])
    return res.json(data[0][0]);
}
}
)

router.post("/getall",
    async(req,res)=>{
        const con = await db();
        let data = await con.execute("CALL sp_room_getall()",[]);
        return res.json(data[0][0]);
    }
)


  

module.exports = router;