const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const dropDatabase = `DROP DATABASE IF EXISTS ex1;`;
  const createDatabase = `CREATE DATABASE ex1;`;
  const useDatabase = `USE ex1;`;

  const createTableAuthors = `
  CREATE TABLE authors (
    author_no INT,
    author_name VARCHAR(50),
    university VARCHAR(300),
    date_of_birth DATE,
    h_index SMALLINT,
    gender ENUM ('Male', 'Female'),
    PRIMARY KEY (author_no)
  );`;

  const addColumnMentor = `
  ALTER TABLE authors
  ADD COLUMN mentor_no INT,
  ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no);`;

  connection.connect();

  try {
    await execQuery(dropDatabase);
    await execQuery(createDatabase);
    await execQuery(useDatabase);
    await execQuery(createTableAuthors);
    await execQuery(addColumnMentor);
  } catch (err) {
    console.error(err.message);
  }

  connection.end();
}

seedDatabase();
