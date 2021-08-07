exports.calculate = (n) => {
    if (n < 0) throw new Error('must be 0 or greater');
    if (n === 0) return 0;
    if (n === 1) return 1;
    return exports.calculate(n - 1) + exports.calculate(n - 2);
}