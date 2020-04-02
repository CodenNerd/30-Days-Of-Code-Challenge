const romaArabica = (arabicNum) => {
    const roman_benchmarks = {1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M', 5000: '_V', 10000: '_X', 50000: '_L', 100000: '_C'}; 
    // in the future, you can add higher numbers with their corresponding roman symbols/letters and the program will adjust to the change
    const arabic_benchmarks = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000];   // don't forget to include the new numbers here too
    arabicNum = parseInt(arabicNum);
    let proceed = parseInt(arabicNum.toString().length);
    let romanNumeral = '';
    while(proceed){     // the loop continues as long as there's still a unit left in arabicNum
        const temp_denominator = 1 * (10**(arabicNum.toString().length-1)); // determine what multiple of 10 arabicNum is
        const multiple = Math.floor(arabicNum/temp_denominator);        // get its first digit
        const newNum = multiple*temp_denominator;       // regenerate a floored version of arabicNum
        const filtered_two = arabic_benchmarks.filter((x, i) => newNum >= x && newNum<= arabic_benchmarks[i+1] || newNum <= x && newNum>= arabic_benchmarks[i-1]);
            // filter arabic_benchmarks for the 2 boundary numbers newNum falls within
        switch (newNum) {   // check for what roman numeral best describes newNum and assign it to romanNumeral
            case (newNum == filtered_two[0]-temp_denominator ? newNum :''):
               romanNumeral += roman_benchmarks[temp_denominator]+roman_benchmarks[filtered_two[0]]
                break;
            case (newNum == filtered_two[0] ? newNum : ''):
                romanNumeral += roman_benchmarks[filtered_two[0]]
                break;
             case (newNum > filtered_two[0] && newNum < (filtered_two[1]-temp_denominator) ? newNum : ''):
               romanNumeral += roman_benchmarks[filtered_two[0]]
               const factor = multiple < 5 ? (multiple%5)-1 : multiple%5;
                for(let i = 0; i < factor; i++){
                    romanNumeral += roman_benchmarks[temp_denominator];
                }
                break;
            case (newNum == filtered_two[1]-temp_denominator ? newNum : ''):
                romanNumeral += roman_benchmarks[temp_denominator]+roman_benchmarks[filtered_two[1]];
                break;
            case (newNum == filtered_two[1] ? newNum : ''):
                romanNumeral += roman_benchmarks[filtered_two[1]];
                break;
            default:
                break;
        }

        arabicNum = arabicNum - newNum; // reduce arabicNum by its first hierarchy
        proceed--; // continue the loop
    }
    
    return romanNumeral;
}

// NOTE: Even though I wrote a bit longer code than my preference, I still ensured not to use any heavy duty function that could slow down the program's response
// hence, the program is memory efficient... the length is only due to the underlying math logic 
console.log(romaArabica(2050));
