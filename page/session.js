const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- session add  endpoint ---------------
router.post('/add',
    async(req, res) =>{
        let c = req.body;
        if(!c.session_name || !c.short_name ){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_session_add(?, ?)",[
            c.session_name,
            c.short_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding session:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the session" });
    }
}
)
// ---------------- session getall endpoint -----------------
router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_session_getall()", []);
      res.json(data[0][0])
    }
  )
// ------------- session update endpoint -------------  
  router.post("/update", async (req, res) => {
  try {
    const se = req.body;
    if (!se.id || !se.session_name || !se.short_name) {
      return res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    }
    const con = await db();
    const data = await con.execute("CALL sp_session_update(?, ?, ?)", [
      se.id,
      se.session_name,
      se.short_name
    ]);
    res.json({ ok: true, result: data[0][0] });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});
// ------------------- session search endpoint --------------
router.post("/search",
  async (req, res) => {
    let s = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_session_search(?,?,?,?)", [
      s.session_name || "",
      s.short_name || "",
      s.rc || 5,
      s.page || 1,
    ]);
    res.json(data[0][0]);
  });
// --------------- session delete endpoint -----------------
router.post("/delete/:id", 
  [mdw.is_logged_in], async (req, res) => {
  try {
    const cid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_session_delete(?)", [cid]);
    res.json({ ok: true, msg: "Session deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});


module.exports = router;