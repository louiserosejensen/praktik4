const db = require('../config/mysql')();
const fs = require('fs');

module.exports = (app) => {

    app.get('/annonce', (req, res, next) => {
        const sql = 
        `
        SELECT annonce.id, annonce.navn, annonce.adresse, annonce.pladser, annonce.pris, annonce.billede
        FROM annonce
        `; 
        db.query(sql, (err, results) => {
            res.render('annonce', { 'title': 'annonce', 'annonce': results});
        });
    });
};