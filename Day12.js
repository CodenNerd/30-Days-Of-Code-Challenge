const strinverter = (string) => {
    try {
        number =  Number(string);                       // straighforward cases
        if(isNaN(number)) number = parseFloat(string);  // float alternative 
        if(isNaN(number)) number = parseInt(string);    // int alternative
        if (isNaN(number)) throw new Error('Error');
    } catch (error) {
        return error;
    }
    return number;
}

console.log(strinverter('-7'));  // -7
console.log(strinverter('20'));     // 20 - straightforward
console.log(strinverter('27.0djdjd')); // 27 - utilises the int alternative after bypassing the float alternative

console.log(strinverter('jj32'));   // Error - No alternative worked
console.log(strinverter('[2,4]'));  // Error
console.log(strinverter({24:''})); // Error
