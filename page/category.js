const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- category add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let c = req.body;
        if(!c.module_id ||!c.category_name || !c.short_name ){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_category_add(?, ?, ?)",[
            c.module_id,
            c.category_name,
            c.short_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding category:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the category" });
    }
}
)
// ---------------- coategory getall endpoint -----------------

router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_category_getall()", []);
      res.json(data[0][0])
    }
  )
// ------------- category update endpoint -------------  

router.post("/update", 
    async (req, res) => {
    let c = req.body;
    if (!c.id || !c.category_name || !c.short_name) {
      res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    } else {
      let con = await db();
      let data = await con.execute("CALL sp_category_update(?,?,?)", [
        c.id,
        c.category_name,
        c.short_name,
      ]);
      res.json(data[0]);
    }
  });

// ------------------- categoory search endpoint --------------
router.post("/search",
  async (req, res) => {
    let c = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_category_search(?,?,?,?)", [
      c.category_name || "",
      c.short_name || "",
      c.rc || 5,
      c.page || 1,
    ]);
    res.json(data[0][0]);
  });
// --------------- category delete endpoint -----------------
router.post("/delete/:id", 
  [mdw.is_logged_in], async (req, res) => {
  try {
    const cid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_category_delete(?)", [cid]);
    res.json({ ok: true, msg: "Category deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});


module.exports = router;