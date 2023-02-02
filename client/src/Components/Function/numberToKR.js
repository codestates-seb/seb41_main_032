/**
 * 숫자를 한국인이 읽기 쉽게 만,억,조,경 단위로 변환해줍니다
 * @author 이중원
 * @param data 숫자나 문자열을 넣어주세요
 * @type {string | number}
 * @return 347441344410000 => 347조4413억
 */
const numberToKR = (data) => {
    if (!data) return 0;
    const unitWords = ['', '만', '억', '조', '경'];
    let result = String(data);

    // 만단위 미만
    if (result.length < 5) return result;
    // 억단위 미만
    if (result.length < 9) {
        result = `${result.slice(0, result.length - 4)}만 ${result.slice(result.length - 4, result.length)}`;
        // 만 단위 뒤에 숫자 0이 들어오는 경우 ex) 1만 0100
        if (result.charAt(result.length - 4) === '0') {
            let count = 0;
            // 0의 갯수를 카운트하여
            for (let i = result.length - 4; i < result.length; i++) {
                if (result[i] === '0') count++;
                else break;
            }
            // 0을 지움
            result = `${result.slice(0, result.length - 5)}${result.slice(result.length - (4 - count))}`;
        }
        return `${result.slice(0, result.length - 4)}${result.slice(result.length - 4, result.length)}`;
    }

    // 억단위 이상일떄 2개의 단위만 표시하기 위함 => 1억 2000만 3000 => 1억 2000만
    let count = Math.floor(result.length / 4) * 4;

    // 4 나누기로 딱 떨어질때 예외처리 1000,0000,0000 => result.length - count === 0 -> slice가 작동안함
    if (result.length === count)
        return `${result.slice(0, 4)}${unitWords[Math.floor(result.length / 4) - 1]}${result.slice(4, 8)}${unitWords[Math.floor(result.length / 4) - 2]}`;

    result = `${result.slice(0, result.length - count)}${unitWords[Math.floor(result.length / 4)]}${result.slice(
        result.length - count,
        result.length - count + 4,
    )}${unitWords[Math.floor(result.length / 4) - 1]}`;

    // 뒤에서 5번째 숫자부터 0갯수를 카운트 후 0 제거 1조 0234억 => 1조 234억
    if (result.charAt(result.length - 5) === '0') {
        let count = 0;
        for (let i = result.length - 4; i < result.length; i++) {
            if (result[i] === '0') count++;
            else break;
        }
        result = `${result.slice(0, result.length - 5)}${result.slice(result.length - (4 - count))}`;
    }

    // '만', '억', '조', '경' 뒤에 띄워쓰기 삽입
    for (let i = 1; i < result.length; i++) {
        if (unitWords.includes(result[i])) {
            return `${result.slice(0, i + 1)} ${result.slice(i + 1)}`;
        }
    }

    return result;
};

export default numberToKR;
