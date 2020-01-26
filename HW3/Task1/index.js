import { Pool } from 'pg';
import defaultUsers from '../defaultUsers';
const pgp = require('pg-promise')();

const connectionString = 'postgresql://postgres:test1@localhost:5432/postgres';
const db = pgp(connectionString);

const pool = new Pool({
    connectionString
});

pool.on('connect', () => {
    console.log('connected to the db');
});

const createTables = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        users(
          id serial PRIMARY KEY,
          login VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          age VARCHAR(128) NOT NULL,
          isDeleted BOOLEAN NOT NULL DEFAULT FALSE
        )`;

    pool.query(queryText)
        .then(() => {
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const populateTable = () => {
    const cs = new pgp.helpers.ColumnSet(['login', 'password', 'age'], { table: 'users' });

    const query = pgp.helpers.insert(defaultUsers, cs);
    db.one(query)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
};

createTables();
populateTable();
