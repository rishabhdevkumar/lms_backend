const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../service/db.service");

router.post("/add",
async(req,res)=>{
let ag = req.body;
if(!ag.agent_name || !ag.email || !ag.password){
    res.json({ok: false, msg: "All fields are required"});
}else{
    const con = await db();
    const data = await con.execute("CALL sp_agent_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[
        ag.country_id ,
        ag.state_id,
        ag.agent_name,
        ag.email,
        ag.password,
        ag.dob,
        ag.phone,
        ag.whatsapp_no,
        ag.organisation,
        ag.aadhar_number,
        ag.pan_number,
        ag.bank_name,
        ag.account_no,
        ag.account_name,
        ag.ifsc_code
    ])
    return res.json(data[0][0]);
}
}
)

router.post("/getall",
async(req,res)=>{
    const con = await db();
    const data = await con.execute("CALL sp_agent_getall()", [])
    let agents = data[0][0];

agents = agents.map((agent) => {
if (agent.dob) {
const date = new Date(agent.dob);
const yyyy = date.getFullYear();
const mm = String(date.getMonth() + 1).padStart(2, '0'); 
const dd = String(date.getDate()).padStart(2, '0');
agent.dob = `${yyyy}-${mm}-${dd}`;
}
return agent;
});

res.json(agents);
});
  

module.exports = router;