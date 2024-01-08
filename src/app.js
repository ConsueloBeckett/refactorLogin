import express from 'express'
import  handlebars from 'express-handlebars'
import  { findSourceMap } from 'module'
import   mongoose  from 'mongoose'
import  path from 'path'
import  viewsRouter from './routes/views.router.js'
import   userRouter from './routes/user.router.js'
import  sessionsRouter from './routes/sessions.router.js'
import  __dirname from '../src/utils.js'
import   createHash  from '../src/utils.js'
import  passport from 'passport'
import  initializePassport from './config/passport_config.js'
import  MongoStore from 'connect-mongo'
import  session from 'express-session'

const app = express();  
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    store:MongoStore.create({
        mongoUrl: "mongodb+srv://mconsuelobeckett:BtMrTH620ttG7XsN@cluster1.kji7jjj.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology:true},
        ttl: 600
    }),
    secret: "ConsueloKey",
    resave: false,
    saveUninitialized: false
}))
/*app.use(session({ 
    secret: "ConsueloKey", 
    resave: true,
    saveUninitialized: true
}))
*/

//const connection = mongoose.connect("mongodb+srv://mconsuelobeckett:BtMrTH620ttG7XsN@cluster1.kji7jjj.mongodb.net/?retryWrites=true&w=majority")


initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())
 


app.use('/api/sessions', sessionsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine' , 'handlebars')


/*
mongoose.connect("mongodb+srv://mconsuelobeckett:BtMrTH620ttG7XsN@cluster1.kji7jjj.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("connected to the DB")
})
.catch(e => {
    console.error("Fail to connect to the BD", e)
}) 
*/

/*
app.post('/register', async (req, res) => {
const {first_name, last_name, email, age, password } = req.body
if (!first_name || !last_name || !email || !age ) return res.status(400).send({
    status: 202, error: 'faltan datos'})
let user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    }
})
*/
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
