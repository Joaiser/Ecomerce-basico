import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function registerAdminInDB(username, password) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [insertRows] = await connection.execute(
        'INSERT INTO Administradores (username, password) VALUES (?, ?)',
        [username, passwordHash]
    );

    connection.end();

    return insertRows;
}

export async function getAdminInDB(username) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [selectRows] = await connection.execute(
        'SELECT * FROM Administradores WHERE username = ?',
        [username]
    );

    connection.end();

    if (selectRows.length > 0) {
        return selectRows[0];
    } else {
        return null;
    }
}
