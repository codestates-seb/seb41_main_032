import styled from 'styled-components';
import useGetMarket from '../../../../../Components/API/useGetMarket';
import ItemBox from './ItemBox';
import { Title, SmTitle } from '../../../../../Components/Style/Stock';
import dateOutput from '../../../../../Components/Function/dateOutput';
import Loading from '../../../../../Components/Style/Loading';

const ItemList = styled.ul`
    display: flex;
    list-style: none;
    flex-wrap: nowrap;
    flex-direction: row;
    list-style: none;
    padding-bottom: 30px;
`;
const Section = styled.section`
    width: 100%;
    min-height: 150px;
    margin-bottom: 100px;
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

    const kospiQuery = `&numOfRows=5&pageNo=1&resultType=json&beginBasDt=${day}&idxNm=코스피`;
    const kosdaqQuery = `&numOfRows=5&pageNo=1&resultType=json&beginBasDt=${day}&idxNm=코스닥`;
    const [KOSPI, setKOSPI, KOSDAQ, setKOSDAQ] = useGetMarket(kospiQuery, kosdaqQuery);
    return (
        <Section>
            {KOSPI && KOSDAQ ? (
                <>
                    <header>
                        <Title>국내지수</Title>
                        {KOSPI ? <SmTitle>{`${dateOutput(KOSPI.basDt)} 기준`}</SmTitle> : null}
                    </header>
                    <ItemList>
                        {KOSPI ? <ItemBox data={KOSPI}></ItemBox> : null}
                        {KOSDAQ ? <ItemBox data={KOSDAQ}></ItemBox> : null}
                    </ItemList>
                </>
            ) : (
                <>
                    <header>
                        <Title>국내지수</Title>
                    </header>
                    <Loading />
                </>
            )}
        </Section>
    );
};

export default IndexList;
