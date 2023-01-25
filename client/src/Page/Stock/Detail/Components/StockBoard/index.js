import styled from 'styled-components';
import Info from './Components/Info';
import CandlestickChar from './Components/CandlestickChar';
import SummaryInfo from './Components/SummaryInfo';
import { useStockDayList, useStockInfo, useStockInvestor } from '../../../../../Components/API/ReactQueryContainer';
import { useParams } from 'react-router-dom';

const Board = styled.section`
    background-color: #212223;
    padding: 20px;
    color: #999;
    h2 {
        margin: 10px 0px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        color: #eee;
        span {
            display: inline-block;
            font-size: 12px;
            color: #eee;
            border-radius: 2px;
            border: 0.5px solid #ddd;
            margin-left: 7px;
            font-weight: 400;
            line-height: 15px;
            padding: 0 5px;
            vertical-align: 3px;
        }
    }
    h3 {
        margin: 10px 0px;
        font-size: 1em;
        font-weight: 900;
        color: #ccc;
    }
`;

/** 주식 이름,가격,투자정보,투자 지표,매매 동향,캔들차트를 출력하는 컴포넌트입니다*/
const StockBoard = () => {
    const params = useParams();
    const stockInfo = useStockInfo(params.id);
    const stockInvestor = useStockInvestor(params.id);
    const stockDayList = useStockDayList(params.id);

    return (
        <Board>
            {stockInfo ? <Info stockInfo={stockInfo} /> : null}
            {stockInfo && stockInvestor ? <SummaryInfo stockInfo={stockInfo} stockInvestor={stockInvestor} /> : null}
            {stockDayList ? <CandlestickChar stockDayLis={stockDayList} /> : null}
        </Board>
    );
};

export default StockBoard;
