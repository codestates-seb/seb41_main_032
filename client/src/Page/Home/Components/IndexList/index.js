import styled from 'styled-components';
import useGetMarket from '../../../../Components/API/useGetMarket';
import ItemBox from './ItemBox';
import { Title } from '../Style';

const ItemList = styled.ul`
    display: flex;
    list-style: none;
    flex-wrap: nowrap;
    flex-direction: row;
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(227 230 232);
`;

const IndexList = () => {
    const Day = '20230102';
    const KOSPI = `&resultType=json&basDt=${Day}&idxNm=코스피`;
    const KOSDAQ = `&resultType=json&basDt=${Day}&idxNm=코스닥`;
    const [kospi, setKospi] = useGetMarket(KOSPI);
    const [kosdaq, setKosdaq] = useGetMarket(KOSDAQ);

    return (
        <section>
            <Title>국내지수</Title>
            <ItemList>
                {kospi ? <ItemBox data={kospi[0]}></ItemBox> : null}
                {kosdaq ? <ItemBox data={kosdaq[0]}></ItemBox> : null}
            </ItemList>
        </section>
    );
};

export default IndexList;
