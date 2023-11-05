const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const app = express();
const PORT = 8080;


mongoose.connect("mongodb+srv://mconsuelobeckett:BtMrTH620ttG7XsN@cluster1.kji7jjj.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("connected to the DB")
})
.catch(e => {
    console.error("Fail to connect to the BD", e)
}) 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});