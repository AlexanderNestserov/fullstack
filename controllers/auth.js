const User = require('../models/User');
const db = require('../config/db-config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        console.log("Please, Enter your email and password")
        return res.json({status: "error", error: "Please, Enter your email and password"});
    } else {
        db.query('SELECT email FROM users WHERE email = ?', [email], async (Err, result) => {
            if (Err) throw Err;
            if (!result[0] || !await bcrypt.compare(password, result[0].password)) {
                console.log("Incorrect Email or Password")
                return res.json({status: "error", error: "Incorrect Email or Password. Try to register."})
            } else {
                const id = result.insertId;
                const token = jwt.sign({email, id}, '', {expiresIn: 60 * 60});
                return res.json({token, status: "success", success: "User login successfully"})
            }
        })
    }
}

module.exports.register = async (req, res) => {
    const {email, password: Npassword} = req.body;
    if (!email || !Npassword) {
        console.log("Please, Enter your email and password")
        return res.json({status: "error", error: "Please, Enter your email and password"});
    } else {
        db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) {
                console.log("Email has already been registered")
                return res.json({status: "error", error: "Email has already been registered"})
            } else {
                const password = bcrypt.hash(Npassword, 8);
                db.query('INSERT INTO users SET ?', {email, password}, (error, results) => {
                    if (error) throw error;
                    console.log("User has been registered")
                    const id = results.insertId;
                    return res.json({id, email, password, status: "success", success: "User has been registered"})
                })
            }
        })
    }
}
