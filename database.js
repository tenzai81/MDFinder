const pgp = require('pg-promise')();
const db = pgp("postgres://localhost:5432/doctors");

function getPhysicians(){
    return db.any("SELECT * FROM physicians;");
}

module.exports = {
    getPhysicians: getPhysicians,

};