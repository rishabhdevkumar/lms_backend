const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- course add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let c = req.body;
        if(!c.session_id || !c.course_name || !c.short_name){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_course_add(?, ?, ?)",[
            c.session_id,
            c.course_name,
            c.short_name,
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding state:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the state" });
    }
}
)
// ---------------- course getall endpoint -----------------
router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_course_getall()", []);
      res.json(data[0][0])
    }
  )
// ---------------- course update endpoint -----------------
 router.post("/update", async (req, res) => {
  try {
    const course = req.body;
    if (!course.id || !course.session_id || !course.course_name || !course.short_name) {
      return res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    }
    const con = await db();
    const data = await con.execute("CALL sp_course_update(?, ?, ?, ?)", [
      course.id,
      course.session_id,
      course.course_name,
      course.short_name
    ]);
    res.json({ ok: true, result: data[0][0] });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});

// ------------------- course search endpoint --------------
router.post("/search",
  async (req, res) => {
    let c = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_course_search(?,?,?,?)", [
      c.course_name || "",
      c.short_name || "",
      c.rc || 5,
      c.page || 1,
    ]);
    res.json(data[0][0]);
  });
// --------------- course delete endpoint -----------------
router.post("/delete/:id", 
  [mdw.is_logged_in], async (req, res) => {
  try {
    const cid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_course_delete(?)", [cid]);
    res.json({ ok: true, msg: "Course deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});

module.exports = router;