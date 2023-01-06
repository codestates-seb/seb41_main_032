const NumberToKR = (data) => {
    const unitWords = ['', '만', '억', '조', '경'];
    let result = String(data);
    if (result.length < 5) return result;
    if (result.length < 9) return `${result.slice(0, result.length - 4)}만${result.slice(result.length - 4, result.length)}`;

    let count = Math.floor(result.length / 4) * 4;

    // 4 나누기로 딱 떨어질때 예외처리 1000,0000,0000 => result.length - count === 0 -> slice가 작동안함
    if (result.length === count)
        return `${result.slice(0, 4)}${unitWords[Math.floor(result.length / 4) - 1]}${result.slice(4, 8)}${unitWords[Math.floor(result.length / 4) - 2]}`;

    result = `${result.slice(0, result.length - count)}${unitWords[Math.floor(result.length / 4)]}${result.slice(
        result.length - count,
        result.length - count + 4,
    )}${unitWords[Math.floor(result.length / 4) - 1]}`;

    return result;
};

export default NumberToKR;
