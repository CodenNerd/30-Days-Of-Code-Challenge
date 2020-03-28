const plusLitmus = (digit) => {
    if (typeof digit == "number" && digit !== NaN) return digit === 0 ? "Neutral" : digit < 0 ? "Negative" : "Positive";
}

console.log(plusLitmus(-2));