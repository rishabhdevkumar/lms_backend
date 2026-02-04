const express = require("express");
const router = express.Router();
const mdw = require("../service/mdw.service.js");
const jwt = require("jsonwebtoken");
const db = require("../service/db.service.js");

// ---------------- quick add student endpoint -----------------
router.post('/quick_add',
    async(req, res) =>{
        let c = req.body;
        if(!c.name || !c.email || !c.password){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_quick_student_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[
            c.roll_no,
            c.name,
            c.email,
            c.password,
            c.phone,
            c.dob,
            c.gender,
            c.blood_group,
            c.session_id,
            c.course_id,
            c.semester_id,
            c.father_name,
            c.father_mob_no,
            c.mother_name,
            c.other_mob_no,
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding state:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the state" });
    }
}
)

// ---------------- add student endpoint -----------------
router.post('/add', async (req, res) => {
  let u = req.body;

  // 🧩 Basic required field validation
  if (!u.roll_no || !u.name || !u.email || !u.password) {
    return res.json({ ok: false, msg: "All required fields must be filled" });
  }

  try {
    const con = await db();

    // ✅ Replace undefined with null to avoid SQL errors
    Object.keys(u).forEach(key => {
      if (u[key] === undefined) u[key] = null;
    });

    // ✅ Call stored procedure with all parameters (36 total)
    const [result] = await con.execute(
      `CALL sp_student_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
         ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        u.roll_no,
        u.name,
        u.email,
        u.password,
        u.phone,
        u.dob,
        u.gender,
        u.category,
        u.nationality,
        u.blood_group,
        u.session_id,
        u.course_id,
        u.semester_id,
        u.aadhar_no,
        u.father_name,
        u.father_mob_no,
        u.father_occupation,
        u.mother_name,
        u.mother_occupation,
        u.other_mob_no,
        u.temp_house_no,
        u.temp_pincode,
        u.temp_locality,
        u.temp_area,
        u.temp_city_id,
        u.temp_destrict_id,
        u.temp_state_id,
        u.temp_country_id,
        u.perm_house_no,
        u.perm_pincode,
        u.perm_locality,
        u.perm_area,
        u.perm_city_id,
        u.perm_destrict_id,
        u.perm_state_id,
        u.perm_country_id,
        u.qualification,
        u.board_10th,
        u.passing_year_10th,
        u.total_marks_10th,
        u.division_10th,
        u.percentage_10th,
        u.board_12th,
        u.passing_year_12th,
        u.total_marks_12th,
        u.division_12th,
        u.percentage_12th,
        u.pre_registration_no,
        u.pre_subject
      ]
    );

    return res.json(result[0][0]);

  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error adding student",
      error: error.message
    });
  }
});


// ---------------- student authenticate endpoint -------------------

router.post("/authenticate", async (req, res) => {
  try {
    const { roll_no, password } = req.body;

    if (!roll_no || !password) {
      return res.json({ ok: false, msg: "Fields are mandatory" });
    }

    const con = await db();
    const [rows] = await con.execute("CALL sp_student_authenticate(?,?)", [roll_no, password]);

    // rows[0][0] contains the actual result from your procedure
    const authResult = rows[0][0];

    if (authResult && authResult.ok) {
      // Create JWT token
      const token = jwt.sign({ id: authResult.data.id, roll_no: authResult.data.roll_no }, process.env.TOKEN_SECRET, { expiresIn: '24h' });

      // Attach token to response
      authResult.data.token = token;

      res.json(authResult);
    } else {
      res.json(authResult || { ok: false, msg: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error in /authenticate:", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});


// ---------------- student getall endpoint -----------------

router.post("/getall", async (req, res) => {
  let con = await db();
  let data = await con.execute("CALL sp_student_getall()", []);
  let students = data[0][0];

  students = students.map((student) => {
    if (student.dob) {
      const date = new Date(student.dob);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      student.dob = `${yyyy}-${mm}-${dd}`;
    }
    return student;
  });

  res.json(students);
});

// ---------------- student details endpoint -----------------
router.post("/details/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const con = await db();
    const [rows] = await con.execute("CALL sp_student_get_by_id(?)", [studentId]);

    if (rows[0].length > 0) {
      res.json({ ok: true, data: rows[0][0] });
    } else {
      res.json({ ok: false, msg: "Student not found" });
    }
  } catch (err) {
    console.error("Error in /student/details/:id", err);
    res.status(500).json({ ok: false, msg: "Server error" });
  }
});


// --------------------- student update endpoint ---------------
router.post("/update", async (req, res) => {
  let s = req.body;
  // Ensure all required fields are present, default to null if undefined
  const params = [
    s.id || null,
    s.roll_no || null,
    s.name || null,
    s.email || null,
    s.phone || null,
    s.dob || null,
    s.gender || null,
    s.catagory || null,
    s.nationality || null,
    s.blood_group || null,
    s.addhar_no || null,
    s.father_name || null,
    s.father_mob_no || null,
    s.mother_name || null,
    s.other_mob_no || null,
    s.house_no || null,
    s.locality || null,
    s.area || null,
    s.city_id || null,
    s.destrict_id || null,
    s.state_id || null,
    s.pincode || null,
    s.country_id || null,
    s.session_id || null,
    s.course_id || null,
    s.semester_id || null,
    s.KU_reg_no || null,
    s.ku_roll_no || null
  ];

  if (!s.id || !s.name || !s.email || !s.registration_no || !s.ku_roll_no) {
    res.json({
      ok: false,
      msg: "All data (id, name, email, registration number, and KU roll number) are mandatory",
    });
  } else {
    let con = await db();
    try {
      let data = await con.execute(
        "CALL sp_student_update(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        params
      );
      res.json(data[0][0]);
    } catch (error) {
      console.error("Update error:", error);
      res.json({ ok: false, msg: "Failed to update student due to an error" });
    }
  }
});

// --------------------- student update endpoint ---------------

router.post("/search", async (req, res) => {
  let s = req.body;
  let con = await db();
  try {
    let data = await con.execute("CALL sp_student_search(?,?,?,?,?)", [
      s.roll_no || "",
      s.email || "",
      s.phone || "",
      s.rc || 10,
      s.page || 1,
    ]);
    res.json(data[0][0]);
  } catch (error) {
    res.json({
      ok: false,
      msg: "Database error: " + error.message
    });
  }
});
// --------------------- student update  language endpoint ---------------

router.post("/update_language",
  async (req, res) => {
    try {
      let student_id = req.body.student_id;
      let language = req.body.language || "en";
      if (!student_id || language) {
        res.json({ ok: false, msg: "Incomplete data" })
        return;
      }
      let data = await con.execute("sp_student_update_language", [student_id, language]);
      res.json({
        ok: true,
        student: data[0][0]
      });
    } catch (error) {
      res.json({
        ok: false,
        msg: "Database error: " + error.message,
        user: {}
      });
    }
  });
// --------------------- student update email endpoint ---------------

router.post("/update_email", async (req, res) => {
  try {
    let s = req.body;

    if (!s.student_id || !s.email) {
      return res.json({
        ok: false,
        msg: "incomplete detail"
      });
    }

    let data = await con.execute("CALL sp_student_update_email(?, ?)", [
      s.student_id,
      s.email
    ]);

    res.json({
      ok: true,
      status: data[0][0]
    });

  } catch (error) {
    res.json({
      ok: false,
      msg: "Database error: " + error.message,
      user: {}
    });
  }
});
// --------------------- student update personal password endpoint ---------------

router.post("/update_password",
  // [mdw.is_logged_in, mdw.authMiddleware],
  async (req, res) => {
    try {
      let s = req.body;
      if (!s.student_id || !s.password) {
        res.json({
          ok: false,
          msg: "incomplete detail"
        });
        return;
      }
      let data = await con.execute("sp_student_update_password", [s.student_id, s.password]);
      res.json({
        ok: true,
        status: data[0][0]
      });
    } catch (error) {
      res.json({
        ok: false,
        msg: "Database error: " + error.message,
        user: {}
      });
    }
  });

// --------------------- student count endpoint ---------------
router.post("/count", async (req, res) => {
  try {
    const con = await db();
    const [rows] = await con.execute("CALL sp_student_count()");
    const total = rows[0]?.[0]?.total_students ?? 0;
    res.json({
      ok: true,
      total_students: total
    });
  } catch (error) {
    console.error("Error fetching student count:", error);
    res.status(500).json({
      ok: false,
      msg: "Database error: " + error.message
    });
  }
});

router.post("/getnextid",
  async (req, res) => {
    try {
      let con = await db(); // Assumes `db()` returns a promise for a DB connection
      let data = await con.execute("CALL sp_student_next_id()", []);
      res.json(data[0][0][0]); // Return the first row of the first result set
    } catch (err) {
      console.error("Error executing stored procedure:", err);
      res.status(500).json({ error: "Failed to fetch next student ID" });
    }
  }
);

router.post("/getnextrollno", async (req, res) => {
  try {
    const con = await db();
    const [rows] = await con.execute("CALL sp_student_next_roll_no()");

    // SAFELY extract next_roll_no even if it's 0
    if (rows[0] && rows[0][0] && typeof rows[0][0].next_roll_no === "number") {
      res.json({ next_roll_no: rows[0][0].next_roll_no }); // respond with proper format
    } else {
      console.error("DB response missing next_roll_no:", rows);
      res.status(500).json({ error: "Invalid DB response" });
    }
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    res.status(500).json({ error: "Failed to fetch next roll number" });
  }
});


router.post("/get_self", [mdw.is_logged_in], async (req, res) => {
	let sid = req.student.id;
	try {
		let data = await con.execute("CALL sp_student_get_self", [sid]);
		res.json({
			ok: true,
			student: data[0][0]
		});
	} catch (error) {
		res.json({
			ok: false,
			msg: "Database error: " + error.message,
			user : {}
		});
	}
});




module.exports = router;