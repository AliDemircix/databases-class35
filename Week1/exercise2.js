const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  port: 3306,
});

const execQuery = (connection, query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
  });
};

connection.connect();

// What are the names of countries with population greater than 8 million?
const queryOne = `SELECT name, population
                  FROM country
                  WHERE population > 8000000
                  ORDER BY population`;
execQuery(connection, queryOne);

// What are the names of countries that have “land” in their names?
const queryTwo = `SELECT name
                  FROM country
                  WHERE name LIKE '%land%'
                  ORDER BY name`;
execQuery(connection, queryTwo);

// What are the names of the cities with population in between 500,000 and 1 million?
const queryThree = `SELECT name, population
                    FROM city
                    WHERE population BETWEEN 500000 AND 1000000
                    ORDER BY population`;
execQuery(connection, queryThree);

// What's the name of all the countries on the continent ‘Europe’?
const queryFour = `SELECT name, continent
                   FROM country
                   WHERE continent = 'Europe'
                   ORDER BY name`;
execQuery(connection, queryFour);

// List all the countries in the descending order of their surface areas.
const queryFive = `SELECT Name, SurfaceArea
                   FROM country
                   ORDER BY SurfaceArea DESC`;
execQuery(connection, queryFive);

// What are the names of all the cities in the Netherlands?
const querySix = `SELECT Name, CountryCode
                  FROM city
                  WHERE CountryCode = 'NLD'
                  ORDER BY name`;
execQuery(connection, querySix);

// What is the population of Rotterdam?
const querySeven = `SELECT Name, Population
                    FROM city
                    WHERE Name = 'Rotterdam'`;
execQuery(connection, querySeven);

// What's the top 10 countries by Surface Area?
const queryEight = `SELECT Name, SurfaceArea
                    FROM country
                    ORDER BY SurfaceArea DESC
                    LIMIT 10`;
execQuery(connection, queryEight);

// What's the top 10 most populated cities?
const queryNine = `SELECT Name, Population
                   FROM city
                   ORDER BY Population DESC
                   LIMIT 10`;
execQuery(connection, queryNine);

// What is the population number of the world?
const queryTen = `SELECT 
                  SUM(Population) AS 'Total Population of the World'
                  FROM country`;
execQuery(connection, queryTen);

connection.end();
