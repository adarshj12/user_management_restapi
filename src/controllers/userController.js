const pool = require("../../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { emailvalidate, passwordValidate } = require("../utils/validation");

const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if(!emailvalidate(email)) return res.status(400).json({ message: 'invalid email format' });
        if(!passwordValidate(password)) return res.status(400).json({ message: 'password should contain atleast 1 uppercase , 1 lowercase , 1 special character ,1 number and minimum 8 characters' });
        pool.query('SELECT * FROM users WHERE email = $1', [email]).then(respo => {
            if (respo.rowCount > 0) {
                return res.status(400).json({ message: 'User already registered' });
            } else {
                const salt = bcrypt.genSaltSync(10);
                password = bcrypt.hashSync(password, salt);
                pool.query('INSERT INTO users (name, email,password) VALUES ($1, $2, $3)', [name, email, password]).then(() => {
                    return res.status(201).json({ message: 'User registered' });
                });
            }
        });
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        pool.query('SELECT * FROM users WHERE email = $1', [email]).then(async (respo) => {
            if (respo.rowCount === 0) return res.status(400).json({ message: "user not registered" });
            const isMatch = await bcrypt.compare(password, respo.rows[0].password);
            if (!isMatch) return res.status(400).json({ message: 'invalid credentials' });
            if (respo.rows[0].isblocked) return res.status(400).json({ message: 'you are blocked' });
            const token = jwt.sign({ id: respo.rows[0].id, name: respo.rows[0].name, user: true }, process.env.JWT_SECRET, { expiresIn: "10h" });
            res.status(200).json({ message: 'login successful', token });
        })
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

const userDetails = async (req, res) => {
    try {
        pool.query('SELECT * FROM users WHERE id = $1', [req.query.id]).then(respo => {
            if (respo.rowCount === 0) return res.status(400).json({ message: "user not found" });
            const { password, ...user } = respo.rows[0];
            res.status(200).json(user);
        })
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

const updateUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name,email,password,req.query.id])
        .then(respo=>{
            if (respo.rowCount === 0) return res.status(400).json({ message: "user not found" });
            res.status(200).json({message:'user updated'});
        })
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

module.exports = {
    register,
    login,
    userDetails,
    updateUser
}