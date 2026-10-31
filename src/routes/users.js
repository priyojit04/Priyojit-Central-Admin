const router=require('express').Router();const db=require('../db');const auth=require('../middleware/auth');
router.get('/',auth(),async(req,res)=>{const [rows]=await db.query('SELECT u.id,u.external_user_id,u.name,u.email,u.status,u.last_seen_at,u.created_at,p.name project FROM app_users u JOIN projects p ON p.id=u.project_id ORDER BY u.id DESC LIMIT 200');res.json(rows);});
module.exports=router;
