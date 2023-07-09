const {Router}= require('express');
const router=Router();
const { register, login, userDetails, updateUser } = require('../controllers/userController');
const { verifyUser } = require('../middlewares/verifyToken');

router.post('/register',register);

router.post('/login',login);

router.get('/user',verifyUser,userDetails);

router.put('/user',verifyUser,updateUser);

module.exports=router;