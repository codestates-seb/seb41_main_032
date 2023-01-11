import { useParams } from 'react-router';
import styled from 'styled-components';
import { useStockDayList, useStockDetails, useStockInvestor } from '../../../Components/API/useGetStockDetails';
import Loading from '../../../Components/Style/Loading';
import DailyInfo from './Components/DailyInfo';
import StockBoard from './Components/StockBoard';

const Main = styled.main`
    position: relative;
    width: 100%;
    min-height: 500px;
`;

/**
 * 주식의 상세정보를 보여주는 페이지 입니다
 * @author 이중원
 */
const StockDetail = () => {
    const params = useParams();

    //오늘 주식데이터를 가져옴
    const TodayQuery = `?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${params.id}`;
    const [todayInfo, setTodayInfo] = useStockDetails(TodayQuery);

    // 매매동향 정보를 가져옴
    const [tradingTrends, setTradingTrends] = useStockInvestor(TodayQuery);

    // 오늘부터 100일전까지의 주식정보 데이터를 가져옴 (업데이트가 느림 - 오늘날짜 데이터 누락이 있을 수 있음)
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 100);
    const Start = `${startDate.getFullYear()}${('0' + (startDate.getMonth() + 1)).slice(-2)}${('0' + startDate.getDate()).slice(-2)}`;

    let endDate = new Date();
    endDate.setDate(endDate.getDate());
    const EndDate = `${endDate.getFullYear()}${('0' + (endDate.getMonth() + 1)).slice(-2)}${('0' + endDate.getDate()).slice(-2)}`;

    const InfoByDateQuery = `?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${params.id}&FID_INPUT_DATE_1=${Start}&FID_INPUT_DATE_2=${EndDate}&FID_PERIOD_DIV_CODE=D&FID_ORG_ADJ_PRC=0`;
    const [infoByDate, setInfoByDate] = useStockDayList(InfoByDateQuery);

    return (
        <Main>
            {todayInfo && tradingTrends && infoByDate ? (
                <>
                    <StockBoard todayInfo={todayInfo} tradingTrends={tradingTrends} infoByDate={infoByDate} />
                    <DailyInfo infoByDate={infoByDate} />
                </>
            ) : (
                <Loading />
            )}
        </Main>
    );
};

export default StockDetail;
