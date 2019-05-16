const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {


    app.get('/profile', (req, res, next) => {
        const sql = ``;
        db.query(sql, (err, results) => {
            if (err) console.log (err)
            res.render('profile', { 'title': 'Profile'});
        });
    });  
};
