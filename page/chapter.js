const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- chapter add  endpoint ---------------
router.post('/add',
  async (req, res) => {
    let c = req.body;
    if (!c.course_id || !c.semester_id || !c.subject_id || !c.chapter_name || !c.short_name) {
      return res.json({ ok: false, msg: "All fields are required" });
    }
    try {
      const con = await db();
      const [result] = await con.execute("CALL sp_chapter_add(?, ?, ?, ?, ?)", [
        c.course_id,
        c.semester_id,
        c.subject_id,
        c.chapter_name,
        c.short_name,
      ]);
      return res.json(result[0][0])
    } catch (error) {
      console.error("Error adding state:", error);
      return res.status(500).json({ ok: false, msg: "An error occurred while adding the state" });
    }
  }
)
// ---------------- chapter getall endpoint -----------------
router.post("/getall",
  async (req, res) => {
    let con = await db();
    let data = await con.execute("CALL sp_chapter_getall()", []);
    res.json(data[0][0])
  }
)
// ---------------- chapter update endpoint -----------------
router.post("/update", async (req, res) => {
  try {
    const ch = req.body;
    if (!ch.id || !ch.course_id || !ch.chapter_name || !ch.short_name) {
      return res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    }
    const con = await db();
    const data = await con.execute("CALL sp_chapter_update(?, ?, ?, ?, ?, ?)", [
      ch.id,
      ch.course_id,
      ch.semester_id,
      ch.subject_id,
      ch.chapter_name,
      ch.short_name
    ]);
    res.json({ ok: true, result: data[0][0] });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});

// ------------------- chapter search endpoint --------------
router.post("/search", async (req, res) => {
  let c = req.body;
  let con = await db();

  // Convert empty or undefined values to null for integer fields
  const courseId = c.course_id && c.course_id !== "" ? parseInt(c.course_id) : null;
  const semesterId = c.semester_id && c.semester_id !== "" ? parseInt(c.semester_id) : null;
  const subjectId = c.subject_id && c.subject_id !== "" ? parseInt(c.subject_id) : null;
  const chapterName = c.chapter_name && c.chapter_name !== "" ? c.chapter_name : null;
  const shortName = c.short_name && c.short_name !== "" ? c.short_name : null;
  const rc = c.rc ? parseInt(c.rc) : 5;
  const page = c.page ? parseInt(c.page) : 1;

  try {
    let data = await con.execute("CALL sp_chapter_search(?, ?, ?, ?, ?, ?, ?)", [
      courseId,
      semesterId,
      subjectId,
      chapterName,
      shortName,
      rc,
      page,
    ]);
    res.json(data[0][0]);
  } catch (err) {
    console.error('Search chapters error:', err);
    res.status(500).json({ error: 'Failed to search chapters', details: err.message });
  }
});
// --------------- chapter delete endpoint -----------------
router.post("/delete/:id",
  [mdw.is_logged_in], async (req, res) => {
    try {
      const cid = req.params.id;
      const con = await db();
      await con.execute("CALL sp_chapter_delete(?)", [cid]);
      res.json({ ok: true, msg: "Chapter deleted successfully" });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ ok: false, msg: "Server error" });
    }
  });

module.exports = router;