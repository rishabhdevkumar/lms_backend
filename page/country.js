const express = require("express")
const router = express.Router();

const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- country add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let c = req.body;
        if(!c.country_code ||!c.country_name || !c.short_name ){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_country_add(?, ?, ?)",[
            c.country_code,
            c.country_name,
            c.short_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding country:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the country" });
    }
}
)

// ---------------- country getall endpoint -----------------

router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_country_getall()", []);
      res.json(data[0][0])
    }
  )

// ------------- country update endpoint -------------  

router.post("/update", async (req, res) => {
    let u = req.body;
    if (!u.id || !u.country_code || !u.country_name || !u.short_name) {
      res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    } else {
      let con = await db();
      let data = await con.execute("CALL sp_country_update(?,?,?,?)", [
        u.id,
        u.country_code,
        u.country_name,
        u.short_name,
      ]);
      res.json(data[0]);
    }
  });

// ------------------- country search endpoint --------------
router.post("/search",
  async (req, res) => {
    let c = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_country_search(?,?,?,?,?)", [
      c.country_code || "",
      c.country_name || "",
      c.short_name || "",
      c.rc || 5,
      c.page || 1,
    ]);
    res.json(data[0][0]);
  });
// --------------- country delete endpoint -----------------
router.post("/delete/:id", 
  [mdw.is_logged_in], async (req, res) => {
  try {
    const cid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_country_delete(?)", [cid]);
    res.json({ ok: true, msg: "Country deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});



module.exports = router;