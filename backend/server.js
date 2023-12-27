const express = require("express");
const mysql = require('mysql');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password : 'iwbFR$$0102',
    database : 'netflixgpt'
});

app.post("/signup", (req, res) => {
    const sql = "INSERT INTO netflixgpt.signup (name, email, password) VALUES (?, ?, ?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) {
            console.error("Error while hashing password:", err);
            return res.status(500).json({ Error: "Error while hashing password" });
        }

        const values = [
            req.body.name,
            req.body.email,
            hash
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error while inserting data:", err);
                return res.status(500).json({ Error: "Error while inserting data", Details: err });
            }

            // Get the inserted ID from the result object
            const insertedId = result.insertId;

            // Construct a query to fetch the inserted data
            const selectQuery = "SELECT id, name, email FROM netflixgpt.signup WHERE id = ?";
            db.query(selectQuery, [insertedId], (err, rows) => {
                if (err) {
                    console.error("Error while fetching inserted data:", err);
                    return res.status(500).json({ Error: "Error while fetching inserted data", Details: err });
                }

                // Return the fetched data back to the frontend
                const insertedData = rows[0]; // Assuming only one row is fetched
                return res.status(200).json({ Status: "success", Data: insertedData });
            });
        });
    });
});


app.post("/signin", (req, res) => {
    const sql = "SELECT id, name, email, password FROM netflixgpt.signup WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error in server" });

        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });

                if (response) {
                    const { id, name, email } = data[0]; // Extract id, name, and email from fetched data
                    return res.json({ Status: "success", Data: { id, name, email } });
                } else {
                    return res.json({ Error: "Password does not match" });
                }
            });
        } else {
            return res.json({ Error: "No email exists" });
        }
    });
});

app.listen(3000,()=>{
    console.log("server running");
})