const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- subject add  endpoint ---------------
router.post('/add',
    async(req, res) =>{
        let sub = req.body;
        if(!sub.course_id || !sub.semester_id || !sub.subject_name || !sub.short_name ){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_subject_add(?, ?, ?, ?)",[
            sub.course_id,
            sub.semester_id,
            sub.subject_name,
            sub.short_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding session:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the session" });
    }
}
)
// ---------------- subject getall endpoint -----------------
router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_subject_getall()", []);
      res.json(data[0][0])
    }
  )
// ------------- subject update endpoint -------------  
  router.post("/update", async (req, res) => {
  try {
    const sub = req.body;
    if (!sub.id || !sub.course_id || !sub.semester_id || !sub.subject_name || !sub.short_name) {
      return res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    }
    const con = await db();
    const data = await con.execute("CALL sp_subject_update(?, ?, ?, ?, ?)", [
      sub.id,
      sub.course_id,
      sub.semester_id,
      sub.subject_name,
      sub.short_name
    ]);
    res.json({ ok: true, result: data[0][0] });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});

// ------------------- subject search endpoint --------------
router.post("/search", async (req, res) => {
  let c = req.body;
  let con = await db();

  let data = await con.execute(
    "CALL sp_subject_search(?,?,?,?,?,?)",
    [
      c.course_id ? parseInt(c.course_id) : null,   
      c.semester_id ? parseInt(c.semester_id) : null, 
      c.subject_name || null,
      c.short_name || null,
      c.rc || 5,
      c.page || 1,
    ]
  );

  res.json(data[0][0]);
});
// --------------- subject delete endpoint -----------------
router.post("/delete/:id", 
  [mdw.is_logged_in], async (req, res) => {
  try {
    const cid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_subject_delete(?)", [cid]);
    res.json({ ok: true, msg: "Subject deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});


module.exports = router;