/**
 * 오름차순으로 정렬해주는 함수입니다
 * @author 이중원
 * @param {Array|object} data 배열이나 객체를 넣어주세요
 * @param {string} compare 정렬을 할 기준을 넣어주세요
 * @param {number} length 정렬후 length만큼 배열을 반환합니다 (기본값: 전부반환)
 * @return [2,1,3] => [1,2,3]
 */
export const Ascend = (data = [], compare, length = data.length) => {
    if (typeof data !== 'object') return;

    let result;
    if (!Array.isArray(data)) {
        result = Object.entries(data);
    } else {
        result = [...data];
    }
    result.sort((a, b) => {
        return a[compare] - b[compare];
    });
    result = result.slice(0, length);

    return result;
};

/**
 * 내림차순으로 정렬해주는 함수입니다
 * @author 이중원
 * @param {Array|object} data 배열이나 객체를 넣어주세요
 * @param {string} compare 정렬을 할 기준을 넣어주세요
 * @param {number} length 정렬후 length만큼 배열을 반환합니다 (기본값: 전부반환)
 * @return [2,1,3] => [3,2,1]
 */
export const Descend = (data = [], compare, length = data.length) => {
    if (typeof data !== 'object') return;

    let result;
    if (!Array.isArray(data)) {
        result = Object.entries(data);
    } else {
        result = [...data];
    }

    result.sort((a, b) => {
        return b[compare] - a[compare];
    });
    result = result.slice(0, length);
    return result;
};
