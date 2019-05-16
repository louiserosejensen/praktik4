const db = require("./mysql")();

module.exports = function(app) {
    db.query(
        `SELECT * FROM menu `, (err, results) => {
            app.locals.menu = results; 
        }
    )
}