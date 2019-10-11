const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000
const session = require('express-session');
const accountRouter = require('./routes/account');


app.set("view engine", "pug")

app.use(session({
    secret: 'whatever we want',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/', (req, res) =>{
    res.render("index", { name: "Hey", message: "Welcome"});
});
// doctors list
const doctors = [
        { name: "Beo Yotch", slug: "yotch", specialty: "Family Medicine", language: "Urdu", gender: "Male", age: 45},
        { name: "Dee Compose", slug: "compose",specialty: "Pediatric Medicine", language: ["English", "Korean"], gender: "Female" ,age: 30},
        { name: "Emma Goner", slug: "goner",specialty: "Geriatric Medicine", language: "Korean", gender: "Female",age: 50},
        { name: "Deez Nuts", slug: "nuts",specialty: "Urology", language: "Vietnamese", gender: "Female", age: 41},
        { name: "Barry M Deep", slug: "deep",specialty: "Cardiology",language: "Chinese", gender: "Male", age: 34},
        { name: "Justin Pieces", slug: "pieces",specialty: "Orthaepedic Surgery",language: "French", gender: "Female",age: 39},
        { name: "Diane Rott", slug: "rott",specialty: "Infectious Disease", language:"Sign Language", gender: "Female",age: 66},
        { name: "Ugg Lee", slug: "ugg",specialty: "ENT", language:"Sign Language", gender: "Female",age: 66},
    ];

app.get("/doctors",(req, res) =>{
    res.render("doctors", {doctors: doctors});
});

app.use('/account', accountRouter);

app.get("/doctors/:doctor", (req, res) =>{
    let filteredDoctors = doctors.filter(doctor =>{
        return doctor.slug === req.params.doctor;
    });
    console.log(filteredDoctors);
    if(filteredDoctors.length <1){
        res.send("This name is not in our database.");
    }
    res.render("doctor", { doctor: filteredDoctors[0] });
});
app.get("/about/us", (req, res) =>{
    res.render("about", { title: "Hey", message: "Hello"});
})
app.get("/dashboard", (req, res) =>{
    res.render("dashboard");
});

app.get("/login",(req, res) =>{
    res.render("login");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    res.redirect("/dashboard");
  });

app.get("/account", (req, res)=>{
    res.render("account")
})
app.get("/logout", (req, res) =>{
    res.redirect("login")
})

app.listen(PORT, () => console.log(`Port ${PORT} is running`))