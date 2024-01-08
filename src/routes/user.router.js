import express from 'express'
import passport from 'passport'

const router = express.Router()

router.post('/register', passport.authenticate('register', {failureRedirect:'/failregister'}), async(req, res) => {
    res.send({status:'success', message:"user registered"})
})

router.get('failregister', async(req, res)=>{
    console.log("registed failed")
    res.send({e: "fail"})
})

router.post('/login', passport.authenticate('login', {failureRedirect:"/faillogin"}), async(req, res)=>{
    if(!req.user) return res.status(400).send({status:"error", error:"credential failed"})
    req.session.user={
 first_name: req.user.first_name,
 last_name: req.user.last_name,
 age: req.user.age,
 email: req.user.email
}

res.send({status:"success", payload: req.user})
})

router.get("/failedlogin", (req, res)=>{
    res.send({e: "login faliled"})
})



export default router 