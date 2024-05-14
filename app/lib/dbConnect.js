import {Pool} from "pg";

const {
    invoices, customers, revenue, users,
} = require('../../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

export const pool = new Pool({
    user: process.env.PGSQL_USER,
    host: process.env.PGSQL_HOST,
    database: process.env.PGSQL_DATABASE,
    password: process.env.PGSQL_PASSWORD,
    port: process.env.PGSQL_PORT
});

export default async function dbConnect() {
    await pool.connect((err, client, release) => {
        if (err) {
            return console.error("Error in connection", err.stack);
        }
        client.query("SELECT NOW()", (err, result) => {
            release();
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            console.log("Connect to database", result.rows)
        })

    })

}
