

const mysql = require("mysql2/promise")
async function get_connection(){
    const con = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        
        
        // host:"127.0.0.1",
        // user:"root",
        // password:"@1234#1234",
        // database:"Management_project"
    })
    return con;
}

module.exports = get_connection;




