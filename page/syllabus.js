const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")

// ----------------- syllabus add  endpoint ---------------

router.post('/add',
    async (req, res) => {
        let c = req.body;
        if (!c.course_id || !c.semester_id || !c.syllabus_name || !c.syllabus) {
            return res.json({ ok: false, msg: "All fields are required" });
        }
        try {
            const con = await db();
            const [result] = await con.execute("CALL sp_syllabus_add(?, ?, ?, ?)", [
                c.course_id,
                c.semester_id,
                c.syllabus_name,
                c.syllabus,
            ]);
            return res.json(result[0][0])
        } catch (error) {
            console.error("Error adding syllabus:", error);
            return res.status(500).json({ ok: false, msg: "An error occurred while adding the syllabus" });
        }
    }
)
// ---------------- syllabus getall endpoint -----------------
router.post("/getall",
    async (req, res) => {
        let con = await db();
        let data = await con.execute("CALL sp_syllabus_getall()", []);
        res.json(data[0][0])
    }
)
// ---------------- syllabus update endpoint -----------------
router.post("/update", async (req, res) => {
    try {
        const sy = req.body;
        if (!sy.id || !sy.course_id || !sy.semester_id || !sy.syllabus_name || !sy.syllabus) {
            return res.json({
                ok: false,
                msg: "All data is mandatory",
            });
        }
        const con = await db();
        const data = await con.execute("CALL sp_syllabus_update(?, ?, ?, ?, ?)", [
            sy.id,
            sy.course_id,
            sy.semester_id,
            sy.syllabus_name,
            sy.syllabus
        ]);
        res.json({ ok: true, result: data[0][0] });

    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ ok: false, msg: "Server error" });
    }
});

// --------------- syllabus delete endpoint -----------------
router.post("/delete/:id",
    [mdw.is_logged_in], async (req, res) => {
        try {
            const cid = req.params.id;
            const con = await db();
            await con.execute("CALL sp_syllabus_delete(?)", [cid]);
            res.json({ ok: true, msg: "Syllabus deleted successfully" });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ ok: false, msg: "Server error" });
        }
    });

module.exports = router;