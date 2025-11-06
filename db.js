const mysql = require('mysql2');
require('dotenv').config();

const isProduction = process.env.RAILWAY_ENVIRONMENT_NAME !== undefined;

const dbConfig = isProduction
    ? {
        host: process.env.DB_HOST || "mysql.railway.internal",
        user: process.env.DB_USERNAME || process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DATABASE || process.env.DB_NAME || "railway",
        port: process.env.DB_PORT || 3306,
    }
    : {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DATABASE || "demo_node_deploy",
        port: process.env.DB_PORT || 3306,
    };

const db = mysql.createPool(dbConfig);

db.getConnection((error, connection) => {
    if (error) {
        console.error("Database not connected:", error.message);
    } else {
        console.log("Database connected successfully");
        console.log("Environment:", isProduction ? "Railway" : "Local (XAMPP)");
        connection.release();
    }
});

module.exports = db;
