/**
 * yyyy/mm/dd ~~ 로 이루어진 날짜데이터를 YY/MM/DD로 바꿔주는 함수입니다
 * @author 이중원
 * @param  {string} data 문자열을 넣어주세요
 * @type {string}
 * @return 20230102 => 23/01/02
 */
const dateOutput = (data) => {
    return data ? `${data.slice(2, 4)}/${data.slice(4, 6)}/${data.slice(6, 8)}` : null;
};

export default dateOutput;
