const donFibonacci = (n) =>{        //takes one argument
   return recurse(n, [0]);          //abstracted recursive function so that donFibonacci is always called with one arg only 
}                                   // and for separation of concerns

const recurse = (n, fibonacciSequence, x=0, y=1) =>{
    fibonacciSequence.push(x+y);
    const l = fibonacciSequence.length;
    return l <= n ? recurse(n, fibonacciSequence, fibonacciSequence[l - 2], fibonacciSequence[l - 1]) : fibonacciSequence[n];
}

// I took the liberty to split the program into more than 1 function since d problem statement didnt give a restriction
console.log(donFibonacci(20));
