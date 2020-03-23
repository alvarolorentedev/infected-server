import { DataSource } from "apollo-datasource"
import sqlDatabase from './SqlDatabase'
import Formatter from 'knex/lib/formatter'

Formatter.prototype.wrapAsIdentifier = value => `"${(value || '').replace(/FROM\s\"(\w+)\"/g, 'FROM $1')}"`


let sqlAPIConfig: any = {
    client: "pg",
    connection: process.env.DATABASE_URL,
    searchPath: ['salesforce', 'public']
};

if(process.env.NODE_ENV !== 'production')
    sqlAPIConfig = {
        client: "sqlite3",
        connection: {
            filename: "./local.sqlite"
        }
    };
  
const sqlAPI = new sqlDatabase(sqlAPIConfig) as DataSource
  
export default {
    sqlAPI
}