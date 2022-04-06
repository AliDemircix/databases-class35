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
  const insertIntoAccount = `
  INSERT INTO account (accountNumber, balance) VALUES ? ;`;
  const accountValues = [
    [101, 5000],
    [102, 7000],
    [103, 3000],
    [104, 6000],
    [105, 2000],
  ];

  const insertIntoAccountChanges = `
  INSERT INTO accountChanges (changeNumber, accountNumber, amount, changedDate, remark) VALUES ? ;`;
  const accountChangesValues = [
    [1, 103, 1000, '2020-11-12 16:29:20', 'Received'],
    [2, 101, 2000, '2019-04-11 18:12:00', 'Sent'],
    [3, 104, 3000, '2014-01-02 13:09:26', 'Sent'],
    [4, 101, 1000, '2016-10-20 19:29:06', 'Received'],
    [5, 102, 2000, '2021-07-01 10:59:12', 'Received'],
  ];

  connection.connect();

  try {
    await execQuery('START TRANSACTION');

    await execQuery(insertIntoAccount, [accountValues]);
    await execQuery(insertIntoAccountChanges, [accountChangesValues]);

    await execQuery('COMMIT');
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
  } finally {
    connection.end();
  }
}

seedDatabase();
