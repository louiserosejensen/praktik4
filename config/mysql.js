module.exports = (function(app) {
    const mysql = require('mysql');
    // Setup database connection
    return ()=> mysql.createPool({
        user: 'root',
        password: '',
        host: 'localhost',
        database: 'praktik4',
        connectionLimit: 10
    });
    
})()