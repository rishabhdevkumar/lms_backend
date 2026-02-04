const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- module table add  endpoint ---------------
router.post('/add',
    async(req, res) =>{
        let t = req.body;
        if(!t.module_id ||!t.table_name){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_module_tables_add(?, ?)",[
            t.module_id,
            t.table_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding module tables:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the module table" });
    }
}
)
// ----------------module tables getall endpoint -----------------
router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_module_tables_getall()", []);
      res.json(data[0][0])
    }
  )
// ------------- module tables update endpoint -------------  
router.post("/update", 
    async (req, res) => {
    let m = req.body;
    if (!m.id || !m.table_name) {
      res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    } else {
      let con = await db();
      let data = await con.execute("CALL sp_module_tables_update(?,?)", [
        m.id,
        m.table_name,
      ]);
      res.json(data[0]);
    }
  });
// ------------------- table search endpoint --------------
router.post("/search",
  async (req, res) => {
    let m = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_module_tables_search(?,?,?)", [
      m.table_name || "",
      m.rc || 5,
      m.page || 1,
    ]);
    res.json(data[0][0]);
  });
// ---------------module table delete endpoint -----------------
router.post("/delete/:id",
  [mdw.is_logged_in], async (req, res) => {
  try {
    const mid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_module_tables_delete(?)", [mid]);
    res.json({ ok: true, msg: "Table deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});


module.exports = router;