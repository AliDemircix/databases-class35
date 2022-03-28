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
    FOREIGN KEY (author_no) REFERENCES authors (author_no),
    FOREIGN KEY (paper_id) REFERENCES research_Papers (paper_id),
    PRIMARY KEY (author_no, paper_id)
  );`;

  const insertIntoAuthors = `
  INSERT INTO authors (author_no, author_name, university, date_of_birth, h_index, gender) VALUES ? ;`;
  const authorValues = [
    [1, 'Ali', 'University of Amsterdam', '1970-01-11', '1', 'Male'],
    [2, 'Stephen', 'University of Tilburg', '1980-05-13', '3', 'Male'],
    [3, 'Tom', 'University of Turkey', '1996-03-22', '5', 'Male'],
    [4, 'Jenny', 'University of France', '1980-04-12', '7', 'Female'],
    [5, 'Robert', 'University of London', '1955-05-05', '9', 'Male'],
    [6, 'Melissa', 'University of Tokyo', '1965-06-11', '11', 'Female'],
    [7, 'Eric', 'University of Amsterdam', '1975-07-01', '13', 'Male'],
    [8, 'Can', 'University of London', '1935-08-01', '2', 'Male'],
    [9, 'David', 'University of Tilburg', '1995-09-01', '4', 'Male'],
    [10, 'Jim', 'University of Amsterdam', '1975-01-01', '6', 'Male'],
    [11, 'Esra', 'University of London', '1959-11-01', '8', 'Female'],
    [12, 'Jack', 'University of Tilburg', '1979-12-01', '10', 'Male'],
    [13, 'Nelly', 'University of Amsterdam', '1939-01-01', '12', 'Female'],
    [14, 'Melony', 'University of Tokyo', '1988-12-01', '9', 'Female'],
    [15, 'Sam', 'University of Tilburg', '1996-06-01', '11', 'Male'],
  ];

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
  const researchPaperValues = [
    [1, 'Research1', 'Conference1', '2018-03-01'],
    [2, 'Research2', 'Conference2', '1997-10-02'],
    [3, 'Research3', 'Conference3', '1999-05-03'],
    [4, 'Research4', 'Conference4', '1990-01-04'],
    [5, 'Research5', 'Conference5', '2010-02-05'],
    [6, 'Research6', 'Conference6', '1987-09-06'],
    [7, 'Research7', 'Conference7', '1966-04-07'],
    [8, 'Research8', 'Conference8', '2010-10-08'],
    [9, 'Research9', 'Conference9', '1977-09-09'],
    [10, 'Research10', 'Conference10', '1995-08-10'],
    [11, 'Research11', 'Conference11', '2020-07-11'],
    [12, 'Research12', 'Conference12', '1978-06-12'],
    [13, 'Research13', 'Conference13', '1974-05-13'],
    [14, 'Research14', 'Conference14', '2008-04-14'],
    [15, 'Research15', 'Conference15', '2006-03-15'],
    [16, 'Research16', 'Conference16', '1969-02-16'],
    [17, 'Research17', 'Conference17', '1997-01-17'],
    [18, 'Research18', 'Conference18', '1969-12-18'],
    [19, 'Research19', 'Conference19', '1990-11-19'],
    [20, 'Research20', 'Conference20', '1997-11-20'],
    [21, 'Research21', 'Conference21', '1975-10-21'],
    [22, 'Research22', 'Conference22', '1990-09-22'],
    [23, 'Research23', 'Conference23', '1987-08-23'],
    [24, 'Research24', 'Conference24', '1985-07-24'],
    [25, 'Research25', 'Conference25', '1962-06-25'],
    [26, 'Research26', 'Conference26', '1987-05-26'],
    [27, 'Research27', 'Conference27', '2010-04-27'],
    [28, 'Research28', 'Conference28', '1995-03-28'],
    [29, 'Research29', 'Conference29', '1987-02-29'],
    [30, 'Research30', 'Conference30', '2010-01-30'],
  ];

  const insertIntoAuthorsAndPapers = `
  INSERT INTO authors_papers (author_no, paper_id) VALUES ? ;`;
  const authorAndPaperValues = [
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 2],
    [2, 4],
    [2, 6],
    [3, 10],
    [3, 12],
    [5, 24],
    [5, 26],
    [5, 28],
    [6, 23],
    [6, 30],
    [7, 13],
    [7, 15],
    [7, 17],
    [9, 1],
    [9, 2],
    [10, 4],
    [10, 17],
    [11, 8],
    [11, 9],
    [13, 13],
    [13, 14],
    [13, 15],
    [14, 21],
    [14, 22],
    [14, 27],
    [15, 28],
    [15, 29],
  ];

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
