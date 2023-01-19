/**
 * 숫자를 한국인이 읽기 쉽게 만,억,조,경 단위로 변환해줍니다
 * @author 이중원
 * @param data 숫자나 문자열을 넣어주세요
 * @type {string | number}
 * @return 347441344410000 => 347조4413억
 */
const numberToKR = (data) => {
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

    // 뒤에서 5번째 숫자에 0일경우 제거 1조 0234억 => 1조 234억
    if (result.charAt(result.length - 5) === '0') {
        result = `${result.slice(0, result.length - 5)}${result.slice(result.length - 4)}`;
    }

    return result;
};

export default numberToKR;
