const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const student_page =  require("./page/student")
app.use("/student", student_page);

const admin_page = require("./page/admin")
app.use("/admin", admin_page)

const faculty_page = require("./page/faculty")
app.use("/faculty", faculty_page)

const language_page = require("./page/language")
app.use("/language", language_page)

const university_page = require("./page/university")
app.use("/university", university_page)

const country_page = require("./page/country")
app.use("/country", country_page)

const state_page = require("./page/state")
app.use("/state", state_page)

const city_page = require("./page/city")
app.use("/city", city_page)

const destrict_page = require("./page/destrict")
app.use("/destrict", destrict_page)

const course_page = require("./page/course")
app.use("/course", course_page)  

const session_page = require("./page/session")
app.use("/session", session_page)

const semester_page = require("./page/semester")
app.use("/semester", semester_page)

const subject_page = require("./page/subject")
app.use("/subject", subject_page)

const timetable_page = require("./page/timetable")
app.use("/timetable", timetable_page)

const agen_page = require("./page/agent")
app.use("/agent", agen_page)

const sub_agen_page = require("./page/sub_agent")
app.use("/sub_agent", sub_agen_page)

const faculty_dep_page = require("./page/faculty_dep")
app.use("/faculty_dep", faculty_dep_page)

const room_page = require("./page/room")
app.use("/room", room_page)

const block_page = require("./page/block")
app.use("/block", block_page)

const module_page = require("./page/module")
app.use("/module", module_page)

const module_tables_page = require("./page/module_tables")
app.use("/module_tables", module_tables_page)

const category_page = require("./page/category")
app.use("/category", category_page)

const subcategory_page = require("./page/sub_category")
app.use("/sub_category", sub_agen_page)

const chapter_page = require("./page/chapter")
app.use("/chapter", chapter_page)

const syllabus_page = require("./page/syllabus")
app.use("/syllabus", syllabus_page)


app.listen(process.env.APP_PORT);
