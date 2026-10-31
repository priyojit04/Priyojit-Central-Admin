require('dotenv').config();
const bcrypt=require('bcryptjs');
const mysql=require('mysql2/promise');
(async()=>{
 const db=await mysql.createConnection({host:process.env.DB_HOST,port:+(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME});
 const email=process.env.ADMIN_EMAIL||'admin@example.com';
 const [rows]=await db.execute('SELECT id FROM admins WHERE email=?',[email]);
 if(!rows.length){
  const hash=await bcrypt.hash(process.env.ADMIN_PASSWORD||'ChangeThisPassword123!',12);
  await db.execute('INSERT INTO admins(name,email,password_hash,role) VALUES(?,?,?,?)',[process.env.ADMIN_NAME||'Owner',email,hash,'owner']);
 }
 const projects=[
 ['Doctor Appointment Booking System','doctor-appointment','Healthcare','Patients, doctors and appointment management','http://localhost:5000',null,'development'],
 ['IPL Central Intelligence','ipl-central-intelligence','Sports','Teams, players and match intelligence',null,null,'planned'],
 ['Personal Finance Tracker','personal-finance-tracker','Finance','Income, expenses and reports',null,null,'planned'],
 ['AI Fake News Detection','fake-news-detection','AI','News credibility analysis',null,null,'planned'],
 ['AI Scam & Phishing Detection','scam-phishing-detection','AI','Digital scam and phishing analysis',null,null,'planned'],
 ['E-Commerce Website','e-commerce','Commerce','Products, orders and customers',null,null,'planned'],
 ['Smart Home Management','smart-home','IoT','Devices and home activity',null,null,'planned'],
 ['PriMi AI Assistant','primi-ai','AI','Personal AI assistant',null,null,'planned']
 ];
 for(const p of projects) await db.execute('INSERT IGNORE INTO projects(name,slug,category,description,frontend_url,api_base_url,status) VALUES(?,?,?,?,?,?,?)',p);
 console.log('Admin account and starter project registry are ready.');
 console.log('Admin email:',email);
 await db.end();
})().catch(e=>{console.error(e.message);process.exit(1)});
