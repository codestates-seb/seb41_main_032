import { useParams } from 'react-router';
import { useStockDayList, useStockDetails, useStockInvestor } from '../../Components/API/useStockDetails';
import DailyInfo from './Components/DailyInfo';
import StockBoard from './Components/StockBoard';

/** 주식의 상세정보를 보여주는 페이지입니다 */
const Stock = () => {
    const params = useParams();
    const TodayQuery = `?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${params.id}`;
    const [todayInfo, setTodayInfo] = useStockDetails(TodayQuery);

    const [tradingTrends, setTradingTrends] = useStockInvestor(TodayQuery);

    const InfoByDateQuery = `?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${params.id}&FID_INPUT_DATE_1=20221101&FID_INPUT_DATE_2=20230105&FID_PERIOD_DIV_CODE=D&FID_ORG_ADJ_PRC=0`;
    const [infoByDate, setInfoByDate] = useStockDayList(InfoByDateQuery);

    return (
        <main>
            <StockBoard todayInfo={todayInfo} tradingTrends={tradingTrends} infoByDate={infoByDate} />
            {infoByDate ? <DailyInfo infoByDate={infoByDate} /> : null}
        </main>
    );
};

export default Stock;
