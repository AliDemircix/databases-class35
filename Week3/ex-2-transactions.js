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
  const sendMoney = `
                      UPDATE account
                      SET balance = balance - 1000
                      WHERE accountNumber = 101;`;
  const receiveMoney = `
                      UPDATE account
                      SET balance = balance + 1000
                      WHERE accountNumber = 102;`;

  const insertIntoAccountChanges = `
    INSERT INTO accountChanges (changeNumber, accountNumber, amount, changedDate, remark) VALUES ? ;`;
  const accountChangesValues = [
    [6, 101, 1000, '2022-04-04 12:19:12', 'Sent'],
    [7, 102, 1000, '2022-04-05 22:22:22', 'Received'],
  ];

  connection.connect();

  try {
    await execQuery('START TRANSACTION');

    await execQuery(sendMoney);
    await execQuery(receiveMoney);
    await execQuery(insertIntoAccountChanges, [accountChangesValues]);

    await execQuery('COMMIT');
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
  }

  connection.end();
}

seedDatabase();
