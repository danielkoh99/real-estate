import { Sequelize } from "sequelize";

import { db_host, db_name, db_password, db_port, db_user } from "../config";
const db = new Sequelize({
 dialect: "postgres",
 host: db_host,
 port: db_port,
 database: db_name,
 username: db_user,
 password: db_password,
 logging: false,
});

export default db;
