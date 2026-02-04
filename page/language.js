const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const mdw = require("../service/mdw.service")


// ---------------- language getall endpoint -----------------

router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_language_getall()", []);
      res.json(data[0][0])
    }
  )

router.post("/get_active", async (req, res) => {
    try {
        let data = await db.executeProcedure("sp_language_get_active", []);
        res.json({
            ok: true,
            languages: data[0]
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Database error: " + error.message
        });
    }
});


module.exports = router;