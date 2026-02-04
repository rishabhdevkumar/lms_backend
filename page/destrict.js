const express = require("express")
const router = express.Router();
const db = require("../service/db.service")
const jwt = require("jsonwebtoken")


// ----------------- destrict add  endpoint ---------------

router.post('/add',
    async(req, res) =>{
        let d = req.body;
        if(!d.country_id || !d.state_id || !d.city_id || !d.destrict_name){
            return res.json({ok: false, msg: "All fields are required"});
        }
        try{
        const con = await db();
        const[result] = await con.execute("CALL sp_destrict_add(?, ?, ?, ?)",[
            d.country_id,
            d.state_id,
            d.city_id,
            d.destrict_name
        ]);
        return res.json(result[0][0])
    } catch(error){
        console .error ("Error adding state:", error);
        return res.status(500).json({ ok: false, msg: "An error occurred while adding the state" });
    }
}
)
// ---------------- destrict getall endpoint -----------------

router.post("/getall",
    async (req, res) => {
      let con = await db();
      let data = await con.execute("CALL sp_destrict_getall()", []);
      res.json(data[0][0])
    }
  )

// ------------------- destrict search endpoint --------------
router.post("/search",
    async (req, res) => {
      let s = req.body;
      let con = await db();
      let data = await con.execute(" CALL sp_destrict_search(?,?,?,?)", [
        s.country_id,
        s.destrict_name || "",
        s.rc || 15,
        s.page || 1,
      ]);
      res.json(data[0][0]);
    });

// ------------- destrict update endpoint -------------  
    router.post("/update", async (req, res) => {
        let s = req.body;
        if (!s.id || !s.country_id || !s.state_id || !s.city_id || !s.destrict_name) {
          res.json({
            ok: false,
            msg: "All data is mandatory",
          });
        } else {
          let con = await db();
          let data = await con.execute("CALL sp_destrict_update(?, ?, ?, ?, ?)", [
            s.id,
            s.country_id,
            s.state_id,
            s.city_id,
            s.destrict_name
          ]);
          res.json(data[0]);
        }
      });
// --------------- destrict delete endpoint -----------------
router.post("/delete",
  async(req,res)=>{
    let s = req.body;
    if(!s.state_id){
      res.json({
        ok: false,
        msg: "state id  is mandotory"
      });
    }else{
      let con = await db();
      let data = await con.execute("CALL sp_destrict_delete(?)" ,[
        s.state_id
      ]);
      res.json(data[0][0])
    }
  }
)

// // Get district by pincode
// router.get('/pincode/:code', async (req, res) => {
//   try {
//     const pincode = req.params.code;
//     const apiKey = process.env.LOCATION_API_KEY;

//     const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${pincode}&format=json`;

//     const response = await axios.get(url);

//     if (response.data && response.data.length > 0) {
//       const place = response.data[0];
//       res.json({
//         district: place.address.county || "",   // district
//         state: place.address.state || "",
//         country: place.address.country || ""
//       });
//     } else {
//       res.status(404).json({ msg: "No data found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });


module.exports = router;