const util = require('util');
const mysql = require('mysql');
import {
  authorValues,
  researchPaperValues,
  authorAndPaperValues,
} from './data.js';

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
  ADD COLUMN mentor INT,
  ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no);`;

  const createTableResearchPapers = `
  CREATE TABLE research_Papers (
    paper_id INT,
    paper_title VARCHAR(500),
    conference VARCHAR(400),
    publish_date DATE,
    PRIMARY KEY (paper_id)
  );`;

  const createTableAuthorsAndPapers = `
  CREATE TABLE authors_papers (
    author_no INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors (author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id),
    PRIMARY KEY (author_no, paper_id)
  );`;

  const insertIntoAuthors = `
  INSERT INTO authors (author_no, author_name, university, date_of_birth, h_index, gender) VALUES ? ;`;

  const updateAuthorsForMentors = `
  UPDATE authors
  SET    mentor = 
         CASE author_no
              WHEN 1 THEN 3
              WHEN 2 THEN 5
              WHEN 3 THEN 7
              WHEN 4 THEN 9
              WHEN 5 THEN 11
              WHEN 6 THEN 13
              WHEN 7 THEN 15
              WHEN 8 THEN 14
              WHEN 9 THEN 12
              WHEN 10 THEN 10
              WHEN 11 THEN 8
              WHEN 12 THEN 6
              WHEN 13 THEN 4
              WHEN 14 THEN 2
              WHEN 15 THEN 1
       END
  WHERE  author_no IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);`;

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
