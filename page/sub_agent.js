const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../service/db.service");

router.post("/add",
async(req,res)=>{
let sub = req.body;
if(!sub.name || !sub.email || !sub.password){
    res.json({ok: false, msg: "All fields are required"});
}else{
    const con = await db();
    const data = await con.execute("CALL sp_sub_agent_add(?, ?, ?, ?, ?, ?, ?, ?)",[
        sub.agent_id,
        sub.name,
        sub.email,
        sub.password,
        sub.dob,
        sub.phone,
        sub.whatsapp_number,
        sub.organisation
    ])
    return res.json(data[0][0]);
}
}
)

router.post("/getall",
async(req,res)=>{
    const con = await db();
    const data = await con.execute("CALL sp_sub_agent_getall()", [])
    let sub_agents = data[0][0];

sub_agents = sub_agents.map((sub_agent) => {
if (sub_agent.dob) {
const date = new Date(sub_agent.dob);
const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, '0'); 
const dd = String(date.getDate()).padStart(2, '0');
sub_agent.dob = `${yyyy}-${mm}-${dd}`;
}
return sub_agent;
});

res.json(sub_agents);
});
  

module.exports = router;