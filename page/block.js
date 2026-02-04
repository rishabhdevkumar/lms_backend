const express = require("express");
const router = express.Router();
const db = require("../service/db.service");

router.post("/add",
async(req,res)=>{
let b = req.body;
if(!b.block_no || !b.block_name){
    res.json({ok: false, msg: "All fields are required"});
}else{
    const con = await db();
    const data = await con.execute("CALL sp_block_add(?, ?)",[
        b.block_no,
        b.block_name
    ])
    return res.json(data[0][0]);
}
}
)

router.post("/getall",
    async(req,res)=>{
        const con = await db();
        let data = await con.execute("CALL sp_block_getall()",[]);
        return res.json(data[0][0]);
    }
)


  

module.exports = router;