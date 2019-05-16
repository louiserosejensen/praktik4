const db = require('../config/mysql')();
const fs = require('fs');
const bcrypt = require('bcrypt');

module.exports = (app) => {

    app.get('/', (req, res, next) => {
        res.render('opretbruger');
    });
    
    app.post('/opretbruger', (req, res, next) => {
        if (!req.fields || !req.fields.username || !req.fields.password) {
            req.flash('error', 'Formularen er ikke udfyldt korrekt');
            res.redirect('/'); 
            return;
        }
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.fields.password, salt);
        db.query('INSERT INTO users SET email = ?, password = ?, fk_user_roles = (SELECT id FROM user_roles WHERE level = 1)',
        [req.fields.username, hash], (err, result) => {
            if(err) {
                if (err.code === "ER_DUP_ENTRY") {
                    req.flash('error', 'Brugernavnet findes allerede. Vælg et andet.');
                    res.redirect('/');
                    return;
                } else {
                    return next(err); 
                }
            }
            req.session.user = result.insertId;
            db.query('INSERT INTO profile SET fk_user_roles = ?', [result.insertId], (err, result) => {
                res.redirect('/profile');
            })
        });
    });

        const auth = function (req, res, next) {
        if (!req.session || !req.session.user)
            return res.redirect('/login');
        next();
    };

    app.get('/login', (req, res, next) => {
        res.render('login');
    });

    app.post('/login', (req, res, next) => {
        db.query(`SELECT users.id, users.password, user_roles.level FROM users 
        inner join user_roles on 
        users.fk_user_roles = user_roles.id
        WHERE users.email = ?`, 
        [req.fields.username], (err, result) => {
            if (err) return next(err);
            if (result.length === 1) {
                if (!bcrypt.compareSync(req.fields.password, result[0].password)) {
                    return res.redirect('/forside');
                } 
                req.session.user = result[0].id;
                req.session.role = result[0].level;
                if (req.session.role <50) {
                    res.redirect('/profile');  
                }
                else if (req.session.role >49) 
                    res.redirect('/admin');
            } else {  
                res.redirect('/forside');

            }
        });
    });

    app.get('/profile', auth, (req, res, next) => {
        const sql = `SELECT * FROM profile WHERE u`;
        db.query(sql, [req.session.user], (err, results) => {
            res.render('profile', { 'title': 'Profile'});
        });
    });

    app.get('/logud', (req, res, next) => {
        req.session.user = null;
        res.redirect('/forside');
    });
}
