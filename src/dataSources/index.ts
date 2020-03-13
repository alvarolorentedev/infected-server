import sqlDatabase from './SqlDatabase'

let sqlAPIConfig = {
    client: "pg",
    connection: process.env.DATABASE_URL
};

if(process.env.NODE_ENV !== 'production')
    sqlAPIConfig = {
        client: "sqlite3",
        connection: {
            filename: "./local.sqlite"
        }
    };
  
const sqlAPI = new sqlDatabase(sqlAPIConfig);
  
export default {
    sqlAPI
}