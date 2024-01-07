const express = require('express');
const { findSourceMap } = require('module');
const { default: mongoose } = require('mongoose');
const path = require('path');
const { createHash } = require('../src/utils.js')
const passport = require('passport')
const initializePassport = require('./config/passport_config.js')
const MongoStore = require ('connect-mongo')
const session = require('express-session')

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

/*
mongoose.connect("mongodb+srv://mconsuelobeckett:BtMrTH620ttG7XsN@cluster1.kji7jjj.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("connected to the DB")
})
.catch(e => {
    console.error("Fail to connect to the BD", e)
}) 
*/

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
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
