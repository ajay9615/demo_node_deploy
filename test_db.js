const mysql = require('mysql2');

const con = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "demo_node_deploy",
    port: process.env.DB_PORT || 3306,
});

con.getConnection((err, connection) => {
    if (err) {
        console.log("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Database connected successfully");
        connection.release();
    }
});

module.exports = con;
