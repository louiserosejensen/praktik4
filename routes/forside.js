const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {

    app.get('/forside', (req, res, next) => {
        const sql = ``;
        db.query(sql, (err, results) => {
            res.render('forside', { '': 'forside'});
        });
    });     
};