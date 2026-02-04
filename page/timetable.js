const express = require("express")
const router = express.Router();

const db = require("../service/db.service")
const jwt = require("jsonwebtoken")
const mdw = require("../service/mdw.service")

// ----------------- timetable add endpoint ---------------

router.post('/add', async (req, res) => {
    let a = req.body;

    if (
        !a.session_id || !a.course_id || !a.semester_id || !a.subject_id ||
        !a.faculty_id || !a.day || !a.start_time || !a.end_time || !a.block_id || !a.room_id 
    ) {
        return res.json({ ok: false, msg: "All fields are required" });
    }

    try {
        const con = await db();
        const [result] = await con.execute(
            "CALL sp_add_timetable(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                a.session_id,
                a.course_id,
                a.semester_id,
                a.subject_id,
                a.faculty_id,
                a.day,
                // a.date,
                a.start_time,
                a.end_time,
                a.block_id,
                a.room_id
                // a.meeting_id,
                // a.meeting_password,
                // a.event_name,
                // a.holiday
            ]
        );
        return res.json(result[0][0]);
    } catch (error) {
        console.error("Error adding record:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the record" });
    }
});


router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_timetable_getall()", []);
      res.json(data[0][0])
    }
  )


module.exports = router;