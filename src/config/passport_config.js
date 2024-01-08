import passport  from 'passport'
import local  from 'passport-local'
import createHash from '../utils.js'
import isValidPassword from '../utils.js'
import userService from '../models/User.js'
import GitHubStrategy from 'passport-github2'

const  localStrategy =local.Strategy

const initializePassport = () => {
    /*
    passport.use('register', new localStrategy(
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
*/
 passport.serializeUser((user, done)=>{
    done(null, user.id)
 })
 passport.deserializeUser(async(id, done)=>{
    let user = await userService.findByid(id)
    done(null,user)
 })
/*
passport.use('login', new localStrategy({usernameField:"email"}, async(username, password, done)=>{
    try {
        const user = await  userService.findOne({email:username})
        if(!user){
            console.log("user dont exist")
            return done(nill, false)
    }
    if(!isValidPassword(user, password)) return done( null, false)
    return done( null, user)
    } catch (e) {
        return done(e)
    }
}))
*/

passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.0eb72f4d05f0f861',
    clientSecret: '6e856786aa6760bfaae9e7f38cf446d9af0132e8',
    callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
}, async (accessToken, refreshToken, profile, done)=>{
try{
console.log(profile)
let user = await userService.findOne({email:profile._json.email})
if(!user){
    let newUser={
        first_name: profile._json.name,
        last_name: "",
        age: 20,
        email: profile._json.email,
        password:""
    }

    let result = await userService.create(newUser)
    done(null, result)
}
else{
    done(null, user)
}
} catch(e) {
return done(e)
}
}
))

}

export default initializePassport