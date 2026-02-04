const express = require("express")
const router = express.Router();

const db = require("../service/db.service")
const jwt = require("jsonwebtoken")
const mdw = require("../service/mdw.service")

// ----------------- admin add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let u = req.body;
        if(!u.name || !u.short_name ){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_university_add(?, ?)",[
            u.name,
            u.short_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding user:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the user" });
    }
}
)

// ---------------- admin getall endpoint -----------------

router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_university_getall()", []);
      res.json(data[0][0])
    }
  )


module.exports = router;