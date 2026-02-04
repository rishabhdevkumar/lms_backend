const express = require("express")
const router = express.Router();

const db = require("../service/db.service")
const jwt = require("jsonwebtoken")
const mdw = require("../service/mdw.service")

// ----------------- state add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let s = req.body;
        if(!s.country_id || !s.state_name || !s.short_name ){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_state_add(?, ?, ?)",[
            s.country_id,
            s.state_name,
            s.short_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding state:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the state" });
    }
}
)
// ---------------- state getall endpoint -----------------

router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_state_getall()", []);
      res.json(data[0][0])
    }
  )

// ------------------- state search endpoint --------------
router.post("/search",
    async (req, res) => {
      let s = req.body;
      let con = await db();
      let data = await con.execute(" CALL sp_state_search(?,?,?,?,?)", [
        s.country_id,
        s.state_name || "",
        s.short_name || "",
        s.rc || 15,
        s.page || 1,
      ]);
      res.json(data[0][0]);
    });

// ------------- state update endpoint -------------  
    router.post("/update", async (req, res) => {
        let s = req.body;
        if (!s.id || !s.country_id || !s.state_name || !s.short_name) {
          res.json({
            ok: false,
            msg: "All data is mandatory",
          });
        } else {
          let con = await db();
          let data = await con.execute("CALL sp_state_update(?,?,?,?)", [
            s.id,
            s.country_id,
            s.state_name,
            s.short_name,
          ]);
          res.json(data[0]);
        }
      });
// --------------- state delete endpoint -----------------
router.post("/delete",
  async(req,res)=>{
    let s = req.body;
    if(!s.state_id){
      res.json({
        ok: false,
        msg: "state id  is mandotory"
      });
    }else{
      let con = await db();
      let data = await con.execute("CALL sp_state_delete(?)" ,[
        s.state_id
      ]);
      res.json(data[0][0])
    }
  }
)


module.exports = router;