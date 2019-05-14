const db = require('../config/mysql')();
const fs = require('fs');

    app.get('/profile', (req, res, next) => {
        const sql = ``;
        db.query(sql, (err, results) => {
            res.render('profile', { 'title': 'Profile'});
        });
    });  