const codeWatch = () => {
    const d = new Date();
    const days =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Today is ${days[d.getDay()]} \nCurrent time is ${d.toLocaleTimeString()}`;
}

console.log(codeWatch());