import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import { useStockDayList } from '../../../Components/API/useGetStockDetails';
import Loading from '../../../Components/Style/Loading';
import DailyInfo from './Components/DailyInfo';
import StockBoard from './Components/StockBoard';
import News from '../News';

const Container = styled.div`
    width: 100%;
    min-height: 500px;
    margin-bottom: 100px;
`;

/**
 * 주식의 상세정보를 보여주는 페이지 입니다
 * @author 이중원
 */
const StockDetail = () => {
    const { state } = useLocation();

    return (
        <Container>
            <StockBoard />
            <DailyInfo />
            <News searchWord={state.name}></News>
        </Container>
    );
};

export default StockDetail;
