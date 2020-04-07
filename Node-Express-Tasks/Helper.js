const fs = require('fs'); // I'm using a filesystem module because using a db for this small implementation would be an overkill
const isPalindrome = require('./../Day5'); 

module.exports = {
    persistData(path,data, callback){
     fs.writeFile(path, data, (err)=>{
        if (err) return false;
        callback(true);
     })
    },
    readData(path, callback){
       fs.readFile(path, (err, data) => {
            if (err) return false;
            callback(data);
        })
    },
    isPalindrome(string){
      return isPalindrome(string);  // uses noReverse function from Day 5 task
    }
}
 