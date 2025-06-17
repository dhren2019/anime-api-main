import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'turntable.proxy.rlwy.net',
    port: 30941,
    user: 'root',
    password: 'GtTyThCkDxMxmyRToupAmeRlwCGWQejL',
    database: 'railway'
});

export default pool;
