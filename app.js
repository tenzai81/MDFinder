const express = require('express');
const bodyParser = require("body-parser");
const PORT = 3000
const app = express();
const session = require('express-session');
const accountRouter = require('./routes/account');
const db = require('./database')

app.set("view engine", "pug")

app.use(session({
    secret: 'whatever we want',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/account', accountRouter);

app.get('/', (req, res) =>{
    res.render("index", { name: "Hey", message: "Welcome"});
});

app.get("/doctors", async function (req, res)  {
    let data = {};
    data.doctors =  await db.getPhysicians().catch(error => {
        console.log(error)
    });
    console.log(data.doctors)
    res.render('doctors', data);
});


app.get("/doctors/:id", async (req, res) =>{
    let data = {};
    data.
    res.render("doctor", );
});
app.get("/about/us", (req, res) =>{
    res.render("about", { title: "Hey", message: "Hello"});
})
app.get("/dashboard", (req, res) =>{
    res.render("dashboard");
});

app.listen(PORT, () => console.log(`Port ${PORT} is running`))