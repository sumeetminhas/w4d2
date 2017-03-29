const settings = require("./settings");
const knex = require("knex") ({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

args = process.argv.slice(2);

let firstname = args[0];
let lastname = args[1];
let birthDate = args[2];

const query = knex('famous_people').insert({
  first_name: firstname,
  last_name: lastname,
  birthdate: birthDate
});

query.asCallback((error, results) => {
  if (error) return console.error(error);
  console.log(query.toString())
});

knex.destroy()