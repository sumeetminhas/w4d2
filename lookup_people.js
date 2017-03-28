const pg = require("pg");
const settings = require("./settings");
let name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE '%' || $1 || '%' OR last_name LIKE '%' || $1 || '%';", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log('Found', result.rows.length, 'person(s) by the name', name,':');


    for (var i = 0; i < result.rows.length; i++) {
      var currRecord = result.rows[i];
      var output = "- " + i + ": " + currRecord.first_name + " " + currRecord.last_name + " "+ "born" + " " + (currRecord.birthdate)
      console.log(output);
    }
    client.end();
  });
});
