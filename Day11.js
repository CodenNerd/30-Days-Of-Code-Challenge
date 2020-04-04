const manyHappyReturns = (birth_date) =>{
    birth_date = birth_date.split("-");
    const birth_day = parseInt(birth_date[0])        
    const birth_month = parseInt(birth_date[1]) - 1        // -1 because JS date is zero-indexed
    const today = new Date();
    const temp = new Date(today.getFullYear(), birth_month, birth_day);

    const target_date =  temp > today ? temp : new Date(today.getFullYear()+1, birth_month, birth_day) 
    let days = -1;                          // -1 because testing with < makes the loop exceed the target by 1
    for(let i = 0; i < 367; i++){           // 367 so that the loop always safely continues till the end esp. in case of a leap year which is 366 days
        if( new Date(today.getFullYear(), today.getMonth(), today.getDate() + i) > target_date) break;
        days++
    }
    days = days === 365 ? 0 : days          // for a birthday that falls on today, you can choose to either count for the next birthday (365 or 366 days left) or say it's today (0 days left)
    return days === 1 ? days + ' day' : days + ' days';
}

console.log(manyHappyReturns('04-04-1999')) // 0 days or 365 days (if you remove line 14)
console.log(manyHappyReturns('05-04-1999')) // 1 day
console.log(manyHappyReturns('03-04-1999')) // 364 days
console.log(manyHappyReturns('13-10-1998')) // 192 days
