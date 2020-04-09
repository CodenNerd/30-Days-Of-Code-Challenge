const fs = require('fs'); // I'm using a filesystem module because using a db for this small implementation would be an overkill
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const isPalindrome = require('./../Day5');
const isValidEmail = require('./../Day10');

dotenv.config();

module.exports = {
    persistData(path,data, callback){
     fs.writeFile(path, data, (err)=>{
        if (err) callback(false);
        callback(true);
     })
    },
    readData(path, callback){
       fs.readFile(path, (err, data) => {
            if (err)  callback(false);
            callback(data);
        })
    },
    isPalindrome(string){
        return isPalindrome(string);  // uses noReverse function from Day 5 task
    },
    calculateSGPA(courses_array){
        const grade_points = [70, 60, 50, 45, 40, 0]  
        // I gave preference to using an array over an object because it is always ordered.
        let total_units = 0;
        const sum = courses_array.reduce((total, current)=>{
            const scoreIndex = grade_points.findIndex((elem) => parseInt(current.score) >= elem) // it gets only the first true number index
            const grade = 5 - scoreIndex;    // as if grade_points array is reversed
            
            const units = parseInt(current.units);
            total_units+=units      // keep calculating the units as the reduce method proceeds
            return total + (grade*units);

        }, 0) 

        return (sum/total_units).toFixed(2);    // the resulting number is rounded off to 2 decimal places... at least, that's how CGPAs I know look
    },
    isValidEmail(email){
        return isValidEmail(email);
    },
    findEmailInDB(array, email){
        return array.find(entry=>entry.email==email);
    },
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },
    async comparePassword(hashPassword, password) {
        return await bcrypt.compareSync(password, hashPassword);
    },
    encryptDBData(data){
        return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.DB_SECRET || '30daysofCode').toString(); // in production, the alternative will be removed, leaving only dotenv
    },
    decryptDBData(cipherText){
        const bytes  = CryptoJS.AES.decrypt(cipherText, process.env.DB_SECRET || '30daysofCode'); // you can set a DB_SECRET in the dotenv file you create
        return decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}
 