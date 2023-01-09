import styled from 'styled-components';
import IndexItem from './Components/IndexList';
import useGetStockList from '../../Components/API/useGetStockList';
import StockList from './Components/StockList';
import { Ascend, Descend } from '../../Components/Function/Sort';

const Main = styled.main`
    padding: 20px 50px;
`;

/**
 * 지수 정보 (코스피 ,코스닥) 전날의 주식 정보 시총10, 상승10, 하락10 주식을 보여주는 페이지입니다
 * @todo 로딩창 구현
 */
const Home = () => {
    let date = new Date();
    date.setDate(date.getDate() - 4);
    const day = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;

    const TopKOSPI = `&numOfRows=30&pageNo=1&resultType=json&beginBasDt=${day}&beginMrktTotAmt=20000000000000&mrktCls=KOSPI`;
    const TopKOSDAQ = `&numOfRows=30&pageNo=1&resultType=json&beginBasDt=${day}&beginMrktTotAmt=1300000000000&mrktCls=KOSDAQ`;
    const [topKOSPI, setTopKOSPI, topKOSDAQ, setTopKOSDAQ] = useGetStockList(TopKOSPI, TopKOSDAQ, Descend, 'mrktTotAmt', 10);

    const UpKOSPI = `&numOfRows=50&pageNo=1&resultType=json&beginBasDt=${day}&beginFltRt=5&mrktCls=KOSPI`;
    const UpKOSDAQ = `&numOfRows=50&pageNo=1&resultType=json&beginBasDt=${day}&beginFltRt=10&mrktCls=KOSDAQ`;
    const [upKOSPI, setUpKOSPI, upKOSDAQ, setUpKOSDAQ] = useGetStockList(UpKOSPI, UpKOSDAQ, Descend, 'fltRt', 10);

    const LowKOSPI = `&numOfRows=50&pageNo=1&resultType=json&beginBasDt=${day}&endFltRt=-4&mrktCls=KOSPI`;
    const LowKOSDAQ = `&numOfRows=50&pageNo=1&resultType=json&beginBasDt=${day}&endFltRt=-4&mrktCls=KOSDAQ`;
    const [lowKOSPI, setLowKOSPI, lowKOSDAQ, setLowKOSDAQ] = useGetStockList(LowKOSPI, LowKOSDAQ, Ascend, 'fltRt', 10);

    // TODO 시간남으면 주식 전체리스트 + 페이지네이션 기능
    // const AllKOSPI = `&numOfRows=5000&pageNo=1&resultType=json&beginBasDt=${day}&mrktCls=KOSPI`;
    // const AllKOSDAQ = `&numOfRows=5000&pageNo=1&resultType=json&beginBasDt=${day}&mrktCls=KOSDAQ`;
    // const [allKOSPI, setAllKOSPI, allKOSDAQ, setAllKOSDAQ] = useGetStockList(AllKOSPI, AllKOSDAQ, Descend, 'mrktTotAmt', 3000);

    return (
        <Main>
            <IndexItem />
            <StockList title={`시가총액 TOP10`} KOSPI={topKOSPI} KOSDAQ={topKOSDAQ}></StockList>
            <StockList title={`상승 TOP10`} KOSPI={upKOSPI} KOSDAQ={upKOSDAQ}></StockList>
            <StockList title={`하락 TOP10`} KOSPI={lowKOSPI} KOSDAQ={lowKOSDAQ}></StockList>
        </Main>
    );
};

export default Home;
