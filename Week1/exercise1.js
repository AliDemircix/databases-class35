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
  const dropDatabase = 'DROP DATABASE IF EXISTS meetup';
  const createDatabase = 'CREATE DATABASE meetup';
  const connectMeetup = 'USE meetup';

  const createTableInvitee = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no SMALLINT,
    invitee_name VARCHAR(250),
    invited_by VARCHAR(250)
  );`;

  const createTableRoom = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no SMALLINT,
    room_name VARCHAR(250),
    floor_number TINYINT
  );`;

  const createTableMeeting = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no SMALLINT,
    meeting_title TEXT,
    starting_time DATETIME,
    ending_time DATETIME,  
    room_no SMALLINT
  );`;

  const insertIntoInvitee = `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES ? ;`;
  const inviteeValues = [
    [1, 'Ronny', 'Ali'],
    [2, 'Terra', 'Ali'],
    [3, 'Stephen', 'Ali'],
    [4, 'Melon', 'Ali'],
    [5, 'Kim', 'Ali'],
  ];

  const insertIntoRoom = `INSERT INTO Room (room_no, room_name, floor_number) VALUES ? ;`;
  const roomValues = [
    [1, 'Interview1', 3],
    [2, 'Interview2', 3],
    [3, 'Interview3', 3],
    [4, 'Interview4', 3],
    [5, 'Interview5', 3],
  ];

  const insertIntoMeeting = `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ? ;`;
  const meetingValues = [
    [1, 'Social Interview 1', '2020-03-19 09:00:00', '2020-03-19 10:00:00', 1],
    [2, 'Social Interview 2', '2020-03-19 09:00:00', '2020-03-19 10:00:00', 2],
    [3, 'Social Interview 3', '2020-03-19 09:00:00', '2020-03-19 10:00:00', 3],
    [4, 'Social Interview 4', '2020-03-19 09:00:00', '2020-03-19 10:00:00', 4],
    [5, 'Social Interview 5', '2020-03-19 09:00:00', '2020-03-19 10:00:00', 5],
  ];

  connection.connect();

  try {
    await execQuery(dropDatabase);
    await execQuery(createDatabase);
    await execQuery(connectMeetup);
    await execQuery(createTableInvitee);
    await execQuery(createTableRoom);
    await execQuery(createTableMeeting);
    await execQuery(insertIntoInvitee, [inviteeValues]);
    await execQuery(insertIntoRoom, [roomValues]);
    await execQuery(insertIntoMeeting, [meetingValues]);
  } catch (err) {
    console.error(err.message);
    connection.end();
  }

  connection.end();
}

seedDatabase();
