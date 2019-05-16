const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {
    
    app.get('/annonceedit', (req, res, next) => {
        const sql = 
        `
        SELECT annonce.id, annonce.lokale, annonce.adresse, annonce.pladser, annonce.billede, annonce.pris
        FROM annonce
        `; 
        db.query(sql, (err, annonce) => {
                console.log(app.locals.menu)
                res.render('annonceedit', {annonce});
        });
    }); 

    app.get('/annonceedit/edit/:id', (req, res, next) => {
        const sql = 
        `
        SELECT annonce.id, annonce.lokale, annonce.adresse, annonce.pladser, annonce.billede, annonce.pris
        FROM annonce
        WHERE annonce.id = ?;
        `;

        db.query(sql, [req.params.id], (err, annonce) => {
                res.render('annonceedit', {'annonceedit': annonce[0]});
        });
    });
    
    app.post('/annonce/annonceedit/:id', (req, res, next) => {
            db.query(`UPDATE annonce
            SET annonce.lokale = ?, annonce.adresse = ?, annonce.pladser = ?, annonce.billede = ?, annonce.pris =? 
            WHERE annonce.id = ?;`, [req.fields.lokale, req.fields.adresse, req.fields.pladser, req.fields.pris, req.fields.billede, req.params.id], (err, results) => {
                if (err) res.send(err);
                res.redirect('/annonce');
            });
    });
};