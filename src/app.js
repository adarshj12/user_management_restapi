const express = require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT;
const adminRoute=require('./routes/admin');
const userRoute=require('./routes/user');


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//routes
app.use('/',userRoute);
app.use('/admin',adminRoute);


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})