const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const createTableAccount = `
  CREATE TABLE account (
    accountNumber INT,
    balance BIGINT,
    PRIMARY KEY (accountNumber)
  );`;

  const createTableAccountChanges = `
  CREATE TABLE accountChanges (
    changeNumber INT,
    accountNumber INT,
    amount BIGINT,
    changedDate DATETIME,
    remark VARCHAR(600),
    FOREIGN KEY (accountNumber) REFERENCES account(accountNumber),
    PRIMARY KEY (changeNumber, accountNumber)
  );`;

  connection.connect();

  try {
    await execQuery('START TRANSACTION');

    await execQuery(createTableAccount);
    await execQuery(createTableAccountChanges);

    await execQuery('COMMIT');
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
    connection.end();
  }

  connection.end();
}

seedDatabase();
