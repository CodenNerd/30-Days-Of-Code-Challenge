const monoTong = (string) => {
    const vowels = "aeiou".split("");
    string = string.split("");

    let count = 0;
    vowels.forEach(v => {
        const temp = string.filter(s => s==v);

        count += temp.length;
    });
    count = count.toString(); // this extraneous line --> to fulfil the expected output of type string
    return count;
}

console.log(monoTong("30 days of code"));
