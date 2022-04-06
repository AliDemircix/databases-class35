const util = require('util');
const mysql = require('mysql');

import {
  authorValues,
  researchPaperValues,
  authorAndPaperValues,
} from './data.js';

import {
  createTableAuthors,
  addColumnMentor,
  createTableResearchPapers,
  createTableAuthorsAndPapers,
  insertIntoAuthors,
  updateAuthorsForMentors,
} from './create-tables.js';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  port: 3306,
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const dropDatabase = `DROP DATABASE IF EXISTS exerciseTwo;`;
  const createDatabase = `CREATE DATABASE exerciseTwo;`;
  const useDatabase = `USE exerciseTwo;`;

  const insertIntoResearchPapers = `
  INSERT INTO research_Papers (paper_id, paper_title, conference, publish_date) VALUES ? ;`;

  const insertIntoAuthorsAndPapers = `
  INSERT INTO authors_papers (author_no, paper_id) VALUES ? ;`;

  connection.connect();

  try {
    await execQuery(dropDatabase);
    await execQuery(createDatabase);
    await execQuery(useDatabase);

    await execQuery(createTableAuthors);
    await execQuery(createTableResearchPapers);
    await execQuery(createTableAuthorsAndPapers);

    await execQuery(insertIntoAuthors, [authorValues]);
    await execQuery(addColumnMentor);
    await execQuery(updateAuthorsForMentors);
    await execQuery(insertIntoResearchPapers, [researchPaperValues]);
    await execQuery(insertIntoAuthorsAndPapers, [authorAndPaperValues]);
  } catch (err) {
    console.error(err.message);
  }

  connection.end();
}

seedDatabase();
