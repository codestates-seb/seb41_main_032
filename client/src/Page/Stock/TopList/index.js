import styled from 'styled-components';
import IndexItem from './Components/IndexList';
import useGetStockList from '../../../Components/API/useGetStockList';
import StockTable from './Components/StockTable';
import { ascend, descend } from '../../../Components/Function/sort';
import News from '../../../Components/News';

const Container = styled.div`
    margin-bottom: 50px;
`;

/**
 * 전날의 지수 정보(코스피, 코스닥), 주식 정보 시총10, 상승10, 하락10 주식을 보여주는 페이지입니다
 * @author 이중원
 */
const TopList = () => {
    /**
     * 정부에서 제공하는 api 업데이트가 늦을때는 4일까지 지연됨
     * 그래서 4일전 부터 오늘까지의 데이터를 요청후
     * 가장 최신일의 데이터만 가져옴
     */
    let date = new Date();
    date.setDate(date.getDate() - 4);
    const day = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;

    const TopKOSPI = `&numOfRows=30&pageNo=1&resultType=json&beginBasDt=${day}&beginMrktTotAmt=20000000000000&mrktCls=KOSPI`;
    const TopKOSDAQ = `&numOfRows=30&pageNo=1&resultType=json&beginBasDt=${day}&beginMrktTotAmt=1300000000000&mrktCls=KOSDAQ`;
    const [topKOSPI, setTopKOSPI, topKOSDAQ, setTopKOSDAQ] = useGetStockList(TopKOSPI, TopKOSDAQ, descend, 'mrktTotAmt', 10);

    const UpKOSPI = `&numOfRows=50&pageNo=1&resultType=json&beginBasDt=${day}&beginFltRt=5&mrktCls=KOSPI`;
    const UpKOSDAQ = `&numOfRows=50&pageNo=1&resultType=json&beginBasDt=${day}&beginFltRt=10&mrktCls=KOSDAQ`;
    const [upKOSPI, setUpKOSPI, upKOSDAQ, setUpKOSDAQ] = useGetStockList(UpKOSPI, UpKOSDAQ, descend, 'fltRt', 10);

    const LowKOSPI = `&numOfRows=100&pageNo=1&resultType=json&beginBasDt=${day}&endFltRt=-2&mrktCls=KOSPI`;
    const LowKOSDAQ = `&numOfRows=100&pageNo=1&resultType=json&beginBasDt=${day}&endFltRt=-4&mrktCls=KOSDAQ`;
    const [lowKOSPI, setLowKOSPI, lowKOSDAQ, setLowKOSDAQ] = useGetStockList(LowKOSPI, LowKOSDAQ, ascend, 'fltRt', 10);

    return (
        <Container>
            <IndexItem />
            <StockTable title={`시가총액 TOP10`} KOSPI={topKOSPI} KOSDAQ={topKOSDAQ} />
            <StockTable title={`상승 TOP10`} KOSPI={upKOSPI} KOSDAQ={upKOSDAQ} />
            <StockTable title={`하락 TOP10`} KOSPI={lowKOSPI} KOSDAQ={lowKOSDAQ} />
            <News searchWord={'증시'} />
        </Container>
    );
};

export default TopList;
