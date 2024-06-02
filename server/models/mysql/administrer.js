import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function registerAdminInDB(username, password) {
    // Crear una conexión a la base de datos
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    // Generar el hash de la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insertar el usuario y el hash de la contraseña en la base de datos
    const [insertRows, insertFields] = await connection.execute(
        'INSERT INTO Administradores (username, password) VALUES (?, ?)',
        [username, passwordHash]
    );

    connection.end();

    return insertRows;
}

export async function getAdminInDB(username, password) {
    // Crear una conexión a la base de datos
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    // Obtener el usuario de la base de datos
    const [selectRows, selectFields] = await connection.execute(
        'SELECT * FROM Administradores WHERE username = ?',
        [username]
    );

    connection.end();

    // Verificar la contraseña
    if (selectRows.length > 0 && await bcrypt.compare(password, selectRows[0].password)) {
        return selectRows[0];
    } else {
        return null;
    }
}