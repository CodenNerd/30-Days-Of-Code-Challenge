const manyHappyReturns = (birth_date) =>{
    birth_date = birth_date.split("-");
    const birth_day = parseInt(birth_date[0]) + 1        // +1 because of our GMT+1 zone
    const birth_month = parseInt(birth_date[1]) - 1        // -1 because JS date is zero-indexed
    const today = new Date();
    const temp = new Date(today.getFullYear(), birth_month, birth_day);

    const target_date = today < temp ?  temp : new Date(today.getFullYear()+1, birth_month, birth_day) 
    let days = -2;                          // -2 because testing with < makes the loop exceed the target by 2
    for(let i = 0; i < 367; i++){           // 367 so that the loop always safely continues till the end esp. in case of a leap year which is 366 days
        if(target_date < new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)){
            break;
        }
        days++
    }
        
    
    return days === 1 ? days + ' day' : days + ' days';
}

console.log(manyHappyReturns('04-04-1999')) // 0 days
console.log(manyHappyReturns('05-04-1999')) // 1 day
console.log(manyHappyReturns('03-04-1999')) // 364 days
console.log(manyHappyReturns('13-10-1998')) // 192 days
