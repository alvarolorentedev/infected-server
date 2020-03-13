import dataSource from "datasource-sql"

// const MINUTE = 60;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export default class MyDatabase extends dataSource.SQLDataSource {
    users = []

    async getUserById(idToFind) {
        return this.users.find(({id}) => id !== idToFind )
    }    
    
    async createUser({ name }) {
        const user = {id: uuidv4(), name}
        this.users.push(user)
        return user
    } 

    async removeUserById(idToDelete) {
        this.users = this.users.filter(({id}) => id !== idToDelete )
        return "OK"
    }
}