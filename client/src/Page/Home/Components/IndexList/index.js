import styled from 'styled-components';
import useGetMarket from '../../../../Components/API/useGetMarket';
import ItemBox from './ItemBox';
import { Title, SmFont } from '../Style';
import DateOutput from '../../../../Components/Function/DateOutput';
const ItemList = styled.ul`
    display: flex;
    list-style: none;
    flex-wrap: nowrap;
    flex-direction: row;
    list-style: none;
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(227 230 232);
`;

/**
 * 지수 정보 (코스피 ,코스닥)을 보여주는 컴포넌트입니다
 */
const IndexList = () => {
    /* 오늘 날짜 기준으로 4일전 날짜를 가져와서 api 요청을 합니다
    정부에서 제공하는 api 데이터가 업데이트 주기가 랜덤합니다 ㅠㅜ (늦으면 4일까지 업데이트 안됨...)
    4일전부터 오늘까지 데이터를 요청하여 가장 최신의 데이터를 가져옵니다  */
    let date = new Date();
    date.setDate(date.getDate() - 4);
    const day = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;

    const KOSPI = `&numOfRows=5&pageNo=1&resultType=json&beginBasDt=${day}&idxNm=코스피`;
    const KOSDAQ = `&numOfRows=5&pageNo=1&resultType=json&beginBasDt=${day}&idxNm=코스닥`;
    const [kospi, setKospi, kosdaq, setKosdaq] = useGetMarket(KOSPI, KOSDAQ);

    return (
        <section>
            <Title>
                국내지수
                {kospi ? <SmFont>{`${DateOutput(kospi.basDt)} 기준`}</SmFont> : null}
            </Title>
            <ItemList>
                {kospi ? <ItemBox data={kospi}></ItemBox> : null}
                {kosdaq ? <ItemBox data={kosdaq}></ItemBox> : null}
            </ItemList>
        </section>
    );
};

export default IndexList;
