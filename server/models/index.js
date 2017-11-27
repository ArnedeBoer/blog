const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
let config;

try {
  config = require(`${__dirname}/../config/config.json`)[env];
} catch (err) {
  console.log('Include a config.json or use enviroment variables');
}

const database = process.env.POSTGRES_DATABASE || 'blog_application'; // as the assignment specifies
const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST || 'localhost'; // as the assignment specifies
const dialect = process.env.POSTGRES_DIALECT || 'postgres'; // as the assignment specifies

let sequelize;

if (config === undefined) {
  sequelize = new Sequelize(database, user, password, { host, dialect });
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

module.exports = db;
