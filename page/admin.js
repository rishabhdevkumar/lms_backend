const express = require("express")
const router = express.Router();

const db = require("../service/db.service")
const jwt = require("jsonwebtoken")
const mdw = require("../service/mdw.service")

// ----------------- admin add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let a = req.body;
        if(!a.f_name || !a.l_name || !a.email || !a.password || !a.dob || !a.phone){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_admin_add(?, ?, ?, ?, ?, ?)",[
            a.f_name,
            a.l_name,
            a.email,
            a.password,
            a.dob,
            a.phone
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding user:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the user" });
    }
}
)

// ---------------- admin authenticate endpoint -------------------

router.post(
    '/authenticate',
    async(req,res)=>{
        let u = req.body;
        if(!u.email || !u.password){
            res.send("Email and Password are mandatory")
        }else{
            let con = await db();
            let data = await con.execute("CALL sp_admin_authenticate(?,?)",
                [u.email, u.password]);
            data = data[0][0][0];
            if(data.ok){
                let token = jwt.sign(data.data, process.env.TOKEN_SECRET, { expiresIn: '24h' })
                data.token=token
            }
            res.json(data);
        }
}
);

// ---------------- admin getall endpoint -----------------

router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_admin_getall()", []);
      res.json(data[0][0])
    }
  )


module.exports = router;