const knex = require("knex");
const config = require("./knexfile");

const db = knex(config);

db.raw("SELECT 1")
  .then((ros) => {
    console.log("database terknoneksi dengan sukses");
  })
  .catch((err) => {
    console.log("database gagal terkoneksi", err);
    process.exit(1);
  });

module.exports = db;
