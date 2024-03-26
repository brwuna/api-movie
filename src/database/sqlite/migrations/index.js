const sqlConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun() {
    const schemas = [
        createUsers
    ].join('');

    sqlConnection()
    .then(db => db.exec(schemas))
    .catch(err => console.error(err));
}

module.exports = migrationsRun;