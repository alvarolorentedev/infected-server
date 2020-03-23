import { DataSource } from "apollo-datasource"
import sqlDatabase from './SqlDatabase'

let sqlAPIConfig: any = {
    client: "pg",
    connection: process.env.DATABASE_URL,
    searchPath: ['salesforce', 'public'],
    wrapIdentifier: (value) => value
};

if(process.env.NODE_ENV !== 'production')
    sqlAPIConfig = {
        client: "sqlite3",
        connection: {
            filename: "./local.sqlite"
        },
        wrapIdentifier: (value) => value
    };
  
const sqlAPI = new sqlDatabase(sqlAPIConfig) as DataSource
  
export default {
    sqlAPI
}