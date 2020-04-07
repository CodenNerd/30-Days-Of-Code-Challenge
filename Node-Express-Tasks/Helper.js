const fs = require('fs'); // I'm using a filesystem module because using a db for this small implementation would be an overkill

module.exports = {
    persistData(data, callback){
     fs.writeFile('./db/day-13_db.txt', data, (err)=>{
        if (err) return false;
        callback(true);
     })
    },
    async readData(callback){
       fs.readFile('./db/day-13_db.txt', (err, data) => {
            if (err) return false;
            callback(data);
        })
    }
}
 