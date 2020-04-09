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
    }
}
 