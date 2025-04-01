import mysql from 'mysql2/promise';

export const getDbConnection = async () =>
    mysql.createPool({
        host: process.env.db_HOST,
        user: process.env.db_USER,
        password: process.env.db_PASSWORD,
        database: process.env.db_NAME,
        port: Number(process.env.db_PORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
