const yahooCheck = (email) =>{
    return /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,4}(?:\.[a-z]{1,4})*$/.test(email);  // in case you're interested, this regex can't be found anywhere on the internet. It's mine
}
// truthy test cases
console.log(yahooCheck('aatanda.dammy@gmail.com')); 
console.log(yahooCheck('aatanda..dammy@supermart.com'));
console.log(yahooCheck('aatanda.123@supermart3.com'));   //Gmail accepts digits after a dot
console.log(yahooCheck('codennerd@gmail.co.uk'));

// falsy test cases
console.log(yahooCheck('123@gmail'));
console.log(yahooCheck('aatanda,dammy@gmail.com'));
console.log(yahooCheck('aatanda.dammy@supermart.com4'));
console.log(yahooCheck('codennerd@gmail.co.ukkkkkkkkkkkkkk'));
