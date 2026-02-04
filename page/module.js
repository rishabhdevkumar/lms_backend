const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- add module endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let mo = req.body;
        if(!mo.module_name){
            return res.json({ok: false, msg: "This field are Mandatory"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_module_add(?)",[
            mo.module_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding module:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the module" });
    }
}
)
// ---------------- module getall endpoint -----------------
router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_module_getall()", []);
      res.json(data[0][0])
    }
  )
// ------------- module update endpoint -------------  
router.post("/update",
    async (req, res) => {
    let mo = req.body;
    if (!mo.id || !mo.module_name) {
      res.json({
        ok: false,
        msg: "This fields is Mandatory",
      });
    } else {
      let con = await db();
      let data = await con.execute("CALL sp_module_update(?,?)", [
        mo.id,
        mo.module_name
      ]);
      res.json(data[0]);
    }
  });
// ------------------- search module endpoint --------------
router.post("/search",
  async (req, res) => {
    let mo = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_module_search(?,?,?)", [
      mo.module_name || "",
      mo.rc || 3,
      mo.page || 1,
    ]);
    res.json(data[0][0]);
  });
// --------------- module delete endpoint -----------------
router.post("/delete/:id",
  [mdw.is_logged_in], async (req, res) => {
  try {
    const mid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_module_delete(?)", [mid]);
    res.json({ ok: true, msg: "Module deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});


module.exports = router;