const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- semester add  endpoint ---------------
router.post('/add',
    async(req, res) =>{
        let c = req.body;
        if(!c.course_id || !c.semester_name || !c.short_name){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_semester_add(?, ?, ?)",[
            c.course_id,
            c.semester_name,
            c.short_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding semester:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the semester" });
    }
}
)
// ---------------- semester getall endpoint -----------------
router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_semester_getall()", []);
      res.json(data[0][0])
    }
  )
// ------------- semester update endpoint -------------  
    router.post("/update", async (req, res) => {
  try {
    const sem = req.body;
    if (!sem.id || !sem.course_id ||  !sem.semester_name || !sem.short_name) {
      return res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    }
    const con = await db();
    const data = await con.execute("CALL sp_semester_update(?, ?, ?, ?)", [
      sem.id,
      sem.course_id,
      sem.semester_name,
      sem.short_name
    ]);
    res.json({ ok: true, result: data[0][0] });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});
// ------------------- semester search endpoint --------------
router.post("/search",
  async (req, res) => {
    let sem = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_semester_search(?,?,?,?)", [
      sem.semester_name || "",
      sem.short_name || "",
      sem.rc || 5,
      sem.page || 1,
    ]);
    res.json(data[0][0]);
  });
// --------------- semester delete endpoint -----------------
router.post("/delete/:id", 
  [mdw.is_logged_in], async (req, res) => {
  try {
    const cid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_semester_delete(?)", [cid]);
    res.json({ ok: true, msg: "Semester deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});



module.exports = router;