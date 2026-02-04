const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const jwt = require("jsonwebtoken")
const mdw = require("../service/mdw.service")

// ----------------- state add  endpoint ---------------

router.post('/add',
  async (req, res) => {
    let f = req.body;
    if (!f.first_name || !f.last_name || !f.email || !f.password || !f.phone) {
      return res.json({ ok: false, msg: "All fields are required" });
    }
    try {
      const con = await db();
      const [result] = await con.execute("CALL sp_faculty_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        f.faculty_code,
        f.department_id,
        f.first_name,
        f.last_name,
        f.email,
        f.password,
        f.dob,
        f.phone,
        f.whatsapp_no,
        f.address,
        f.aadhar_no
      ]);
      return res.json(result[0][0])
    } catch (error) {
      console.error("Error adding state:", error);
      return res.status(500).json({ ok: false, msg: "An error occurred while adding the state" });
    }
  }
)

// ---------------- state getall endpoint -----------------

router.post("/getall", async (req, res) => {
  let con = await db();
  let data = await con.execute("CALL sp_faculty_getall()", []);
  let faculties = data[0][0];

  faculties = faculties.map((faculty) => {
    if (faculty.dob) {
      const date = new Date(faculty.dob);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0'); 
      const dd = String(date.getDate()).padStart(2, '0');
      faculty.dob = `${yyyy}-${mm}-${dd}`;
    }
    return faculty;
  });

  res.json(faculties);
});

// ------------------- state search endpoint --------------
router.post("/search",
  async (req, res) => {
    let s = req.body;
    let con = await db();
    let data = await con.execute(" CALL sp_faculty_search(?,?,?,?)", [
      s.department_id || "",
      s.faculty_code || "",
      s.rc || 5,
      s.page || 1,
    ]);
    res.json(data[0][0]);
  });

// ------------- state update endpoint -------------  
  router.post("/update", async (req, res) => {
    let s = req.body;
    if (!s.id || !s.first_name || !s.last_name || !s.email) {
      res.json({
        ok: false,
        msg: "All data is mandatory",
      });
    } else {
      let con = await db();
      let data = await con.execute("CALL sp_faculty_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        s.id,
        s.faculty_code,
        s.department_id,
        s.first_name,
        s.last_name,
        s.email,
        s.dob,
        s.phone,
        s.whatsapp_no,
        s.address,
        s.aadhar_no
      ]);
      res.json(data[0]);
    }
  });

// ---------------- student authenticate endpoint -------------------

router.post('/authenticate', async (req, res) => {
  try {
    let f = req.body;

    if (!f.faculty_code || !f.password) {
      return res.status(400).json({ error: "Faculty Code and Password are mandatory" });
    }
    let con = await db();
    let [rows] = await con.execute("CALL sp_faculty_authenticate(?, ?)", [f.faculty_code, f.password]);
    if (!rows || !rows[0] || !rows[0][0]) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    let data = rows[0][0];
    if (data.ok) {
      let token = jwt.sign(data.data, process.env.TOKEN_SECRET, { expiresIn: '24h' });
      data.token = token;
    }

    res.json(data);
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --------------------- faculty count endpoint ---------------
router.post("/count", async (req, res) => {
  try {
    const con = await db();
    const [rows] = await con.execute("CALL sp_faculty_count()");
    const total = rows[0]?.[0]?.total_faculty ?? 0;  
    res.json({
      ok: true,
      total_faculty: total
    });
  } catch (error) {
    console.error("Error fetching student count:", error);
    res.status(500).json({
      ok: false,
      msg: "Database error: " + error.message
    });
  }
});
// --------------------- faculty get self endpoint ---------------
router.post("/get_self", [mdw.is_logged_in], 
  async (req, res) => {
	let fid = req.faculty.id;
	try {
		let data = await con.execute("CALL sp_faculty_get_self", [fid]);
		res.json({
			ok: true,
			user: data[0][0]
		});
	} catch (error) {
		res.json({
			ok: false,
			msg: "Database error: " + error.message,
			user : {}
		});
	}
});

// --------------- faculty delete endpoint -----------------
router.post("/delete/:id", 
  [mdw.is_logged_in], async (req, res) => {
  try {
    const cid = req.params.id;
    const con = await db();
    await con.execute("CALL sp_faculty_delete(?)", [cid]);
    res.json({ ok: true, msg: "Faculty deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});

module.exports = router;