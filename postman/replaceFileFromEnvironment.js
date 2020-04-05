const fs = require('fs')
const file = require('./infecteed - remote.postman_environment.json')
file.values = file.values.map((value) => {
    if(value.key === "username")
        value.value = process.env.SERVICE_USERNAME    
    if(value.key === "password")
        value.value = process.env.SERVICE_PASSWORD
    return value
})

fs.writeFileSync('./postman/smoke.postman_environment.json', JSON.stringify(file))