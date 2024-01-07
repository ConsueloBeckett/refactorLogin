const passport = require ('passport')
const local = require ('passport-local')
const { createHash, isValidPassword } = require('../utils.js')
const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use('/register', new localStrategy(
        { passReqToCallBack: true, usernameField:"email" }, async (req, username, password, done)=>{
            const {first_name, last_name, email, age} = req.body

            try {
                let user = await userService.findOne({ email: username})
                if (user){
                    console.log("user allready exist")
                    return done(null, false)
                }
                 const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                 }
                 let result = await userService.create(newUser)
                 return done(null, result)
            } catch(e){
                return done("error to obtain the user" + e)
            }

        }

    ))

}
