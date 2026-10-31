require('dotenv').config();
const express=require('express');const helmet=require('helmet');const rateLimit=require('express-rate-limit');const path=require('path');
const app=express();app.use(helmet({contentSecurityPolicy:false}));app.use(express.json({limit:'1mb'}));app.use('/api/auth/login',rateLimit({windowMs:15*60*1000,max:10}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api/auth',require('./src/routes/auth'));app.use('/api/projects',require('./src/routes/projects'));app.use('/api/overview',require('./src/routes/overview'));app.use('/api/users',require('./src/routes/users'));
app.get('/health',(req,res)=>res.json({ok:true,service:'Priyojit Central Admin'}));
const port=process.env.PORT||5001;app.listen(port,()=>console.log(`Central Admin running at http://localhost:${port}`));
