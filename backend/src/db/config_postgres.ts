import { db_host, db_port, db_name, db_user, db_password } from "../config";
import { Sequelize } from "sequelize";
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
