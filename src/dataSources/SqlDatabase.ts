import { SQLDataSource } from "datasource-sql"

const MINUTE = 60;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export default class MyDatabase extends SQLDataSource {
    constructor(config: any){
        super(config)
    }

    async getUserById(id: string) {
        return super.db
            .select("*")
            .from("USERS")
            .where({ id })
            .cache(MINUTE);
    }    
    
    async createUser({ name: string }) {
        const id = uuidv4()
        await super.db("USERS").insert({id , name})
        return this.getUserById(id)
    } 

    async removeUserById(id: string) {
        return super.db("USERS")
        .where({ id })
        .delete()
    }
}