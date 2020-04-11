const fs = require('fs'); // I'm using a filesystem module because using a db for this small implementation would be an overkill
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
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
            if (err) callback(false);
            try {
                data = this.decryptDBData(data.toString()); // if error, it means data in db isn't encrypted and that's bad
                data = JSON.parse(data.toString())  // content it's retrieving must be parseable to JSON
            } catch (error) {
                data = [];  // if an error is thrown, then the db either is empty or contains invalid data, replace with []
            }
            // if db is empty, assign it an empty array
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
        return isValidEmail(email); // uses yahooCheck function from day 10
    },
    findEntryInDB(array, checkFor, property){       // findEmailInDB changed to this so as to allow check for other entries
        return array.find(entry=>eval('entry.'+checkFor) == property);
    },
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },
    async comparePassword(hashPassword, password) {
        return await bcrypt.compareSync(password, hashPassword);
    },
    encryptDBData(data){
        return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.SECRET || '30daysofCode').toString(); // in production, the alternative will be removed, leaving only dotenv
    },
    decryptDBData(cipherText){
        const bytes  = CryptoJS.AES.decrypt(cipherText, process.env.SECRET || '30daysofCode'); // you can set a DB_SECRET in the dotenv file you create
        return decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },
    generateToken(email) {
        const token = jwt.sign({
          email,
        },
        process.env.SECRET, { expiresIn: '7d' });
        return token;
    },
}
 