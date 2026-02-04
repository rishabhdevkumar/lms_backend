const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- city add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let c = req.body;
        if(!c.country_id || !c.state_id || !c.name ){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_city_add(?, ?, ?)",[
            c.country_id,
            c.state_id,
            c.name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding city:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the city" });
    }
});

// ----------------- city getall  endpoint ---------------
router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_city_getall()", []);
      res.json(data[0][0])
    }
  )

// ------------- city update endpoint -------------  
    router.post("/update", async (req, res) => {
        let s = req.body;
        if (!s.id || !s.country_id || !s.state_id || !s.name) {
          res.json({
            ok: false,
            msg: "All data is mandatory",
          });
        } else {
          let con = await db();
          let data = await con.execute("CALL sp_city_update(?, ?, ?, ?)", [
            s.id,
            s.country_id,
            s.state_id,
            s.name,
          ]);
          res.json(data[0]);
        }
      });

module.exports = router;