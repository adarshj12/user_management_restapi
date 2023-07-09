const {Router}= require('express');
const router=Router();
const { getUsers, login, deleteUser, blockUser } = require('../controllers/adminController');
const { verifyAdmin } = require('../middlewares/verifyToken');

router.post('/login',login);

router.get('/users',verifyAdmin,getUsers);

router.delete('/user',verifyAdmin,deleteUser);

router.get('/block',verifyAdmin,blockUser);

module.exports=router;