const express = require('express');
const router = express.Router();

function loginRedirect(req, res, next){
    if (req.session.name){
        res.redirect("/account/dashboard")
    } else{
        next();
    }
}
// router.get("/", (req, res) =>{
//     console.log(req.session.email);
//     if (req.session && req.session.username){
//         res.redirect("/account/dashboard");
//     } else{
//         res.redirect("/account/login");
//     }
// });
router.get("/logout", (req, res) =>{
    res.session.destroy(() =>{
        console.log(req.session.destroy())
        res.redirect("/");
    });
    
});


module.exports = router;