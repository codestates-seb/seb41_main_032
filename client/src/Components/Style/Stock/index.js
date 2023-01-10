import styled from 'styled-components';

/**@author 이중원*/

/** 제목 css 입니다 */
export const Title = styled.h2`
    margin-top: 50px;
    margin-bottom: 15px;
`;

/** 작은 폰트를 사용할때 사용합니다
 *
 * font-size: 0.8em; */
export const SmFont = styled.span`
    margin-right: 5px;
    font-size: 0.8em;
`;
/**
 *  타이들 옆에 작은 글씨를 표현할때 사용합니다
 *
 *  font-size: 0.4em;
 */
export const SmTitle = styled.span`
    margin-left: 5px;
    font-size: 0.4em;
`;

/** fonst-size : 0.8em
 *
 * 레이아웃을 정렬해줍니다 */
export const SmFontContainer = styled.div`
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    color: #70727b;
`;

/** 주식이 상승일때 사용하는 빨간색 삼각형입니다 */
export const RedTriangle = styled.span`
    border-bottom: 5px solid #ff4747;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    margin-right: 2px;
`;

/** 주식이 하락일때 사용하는 파란색 삼각형입니다 */
export const BlueTriangle = styled.span`
    border-top: 5px solid #3a74ff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    margin-right: 2px;
`;

/** 주식이 하락일때 등락률을 표시하는 파란색 박스입니다 */
export const BlueBox = styled.span`
    background-color: #097df3;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    display: inline-block;
    min-width: 57px;
    margin-top: 4px;
    border-radius: 3px;
    color: #fff;
    text-align: center;
    padding: 5px 8px;
`;

/** 주식이 하락일때 등락률을 표시하는 빨간색 박스입니다 */
export const RedBox = styled.span`
    background-color: #ed3738;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    display: inline-block;
    min-width: 57px;
    margin-top: 4px;
    border-radius: 3px;
    color: #fff;
    text-align: center;
    padding: 5px 8px;
`;

/** 주식페이지에서 코스피,코스닥 선택 버튼 or  주식정렬 선택버튼을 구현할떄 사용하는 css 입니다
 *
 * ClassName 을 'select' 로 지정하면 선택효과가 생깁니다 */
export const SelectBtnContainer = styled.ul`
    display: flex;
    width: 100%;
    list-style: none;
    margin-right: 10px;
    margin: 20px 0px;
    button {
        padding: 10px 20px;
        border-radius: 15px;
        border: 1px solid gray;
        margin-right: 10px;
    }
    .select {
        font-weight: 600;
        color: #fff;
        background-color: #404954;
    }
`;
