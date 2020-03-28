const errorChecker = ({arg, valueType = "string"}) => {
    if (typeof arg !== valueType) return "Error";
}

console.log(errorChecker({arg: "book", valueType: "boolean"}));
console.log(errorChecker({arg: 3})); // checks with valueType as string if valueType isn't provided... Done this way because of the ambiguity in the problem statement.
