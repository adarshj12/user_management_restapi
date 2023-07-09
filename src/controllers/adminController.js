const pool = require("../../config/db");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const login=async(req,res)=>{
    try {
        const { username, password } = req.body;
        if ((username !== ADMIN_USERNAME) || (password !== ADMIN_PASSWORD)) return res.status(400).json({ message: `invalid credentials` });
        const token = jwt.sign({ name: "admin", admin: true }, process.env.JWT_SECRET, { expiresIn: "10h" });
        res.status(202).json({ message: 'login successful', token })
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getUsers = async (req, res) => {
    try {
        pool.query('SELECT * FROM users').then(respo => {
            res.status(200).json(respo.rows)
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const blockUser = async (req, res) => {
    try {
        pool.query('UPDATE users SET isBlocked = NOT isBlocked WHERE id = $1 RETURNING *', [req.query.id])
        .then(respo=>{
            if (respo.rowCount === 0) return res.status(400).json({ message: "user not found" });
            res.status(200).json({message:'user updated'});
        })
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

const deleteUser=async(req,res)=>{
    try {
        pool.query('DELETE FROM users WHERE id = $1',[req.query.id]).then(respo => {
            if(respo.rowCount===0) return res.status(400).json({ message: "user not found" });
            res.status(200).json({message:'user deleted'});
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {
    login,
    getUsers,
    blockUser,
    deleteUser,
}