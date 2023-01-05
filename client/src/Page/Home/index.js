import styled from 'styled-components';
import IndexItem from './Components/IndexList';
import useGetStockList from '../../Components/API/useGetStockList';
import StockList from './Components/StockList';

const Main = styled.main`
    margin: 20px;
`;

const Home = () => {
    const Day = '20230103';
    const Ascend = (data, compare, length) => {
        if (data) {
            let result = [...data];
            result.sort((a, b) => {
                return b[compare] - a[compare];
            });
            result = result.slice(0, length);
            return result;
        }
    };
    const Descend = (data, compare, length) => {
        if (data) {
            let result = [...data];
            result.sort((a, b) => {
                return a[compare] - b[compare];
            });
            result = result.slice(0, length);
            return result;
        }
    };

    const TopKOSPI = `&numOfRows=30&pageNo=1&resultType=json&basDt=${Day}&beginMrktTotAmt=20000000000000&mrktCls=KOSPI`;
    const TopKOSDAQ = `&numOfRows=30&pageNo=1&resultType=json&basDt=${Day}&beginMrktTotAmt=1300000000000&mrktCls=KOSDAQ`;
    const [topKOSPI, setTopKOSPI, topKOSDAQ, setTopKOSDAQ] = useGetStockList(TopKOSPI, TopKOSDAQ, Ascend, 'mrktTotAmt', 10);

    const UpKOSPI = `&numOfRows=30&pageNo=1&resultType=json&basDt=${Day}&beginFltRt=5&mrktCls=KOSPI`;
    const UpKOSDAQ = `&numOfRows=30&pageNo=1&resultType=json&basDt=${Day}&beginFltRt=10&mrktCls=KOSDAQ`;
    const [upKOSPI, setUpKOSPI, upKOSDAQ, setUpKOSDAQ] = useGetStockList(UpKOSPI, UpKOSDAQ, Ascend, 'fltRt', 10);

    const LowKOSPI = `&numOfRows=50&pageNo=1&resultType=json&basDt=${Day}&endFltRt=-5&mrktCls=KOSPI`;
    const LowKOSDAQ = `&numOfRows=50&pageNo=1&resultType=json&basDt=${Day}&endFltRt=-5&mrktCls=KOSDAQ`;
    const [lowKOSPI, setLowKOSPI, lowKOSDAQ, setLowKOSDAQ] = useGetStockList(LowKOSPI, LowKOSDAQ, Descend, 'fltRt', 10);

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
