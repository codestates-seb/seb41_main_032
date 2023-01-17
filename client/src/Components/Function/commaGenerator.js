/**
 * 숫자의 3자리수마다 , 를 찍어주는 함수입니다 12345 => 12,345
 * @author 이중원
 * @param  data 숫자나 문자열을 넣어주세요
 * @type {string | number}
 * @return 문자열을 반환합니다
 */
const commaGenerator = (data) => {
    return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export default commaGenerator;
