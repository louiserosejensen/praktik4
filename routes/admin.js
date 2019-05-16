const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {

    const protectedroutes = ['/admin'];

    app.use(protectedroutes, function (req, res, next) {
        if (!req.session.role >49){
            res.redirect('/home'); 
            return;
        }
        next();
    })
    
    app.get('/admin', (req, res, next) => {
        const sql = ``;
        db.query(sql, (err, results) => {
            res.render('admin', { 'title': 'Admin'});
        });
    });     

    app.post('/admin', (req, res, next) => {
        console.log(req.fields);
        // res.send();
        db.query(`INSERT INTO annonce (lokale, adresse, pladser, pris, billede) VALUES (?, ?, ?, ?, ?);`, 
        [req.fields.lokale, req.fields.adresse, req.fields.pladser, req.fields.pris, req.fields.billede], (err, results) => {
                if (err) { res.send(err); return; }
                res.redirect('/admin');
            });
    });
};