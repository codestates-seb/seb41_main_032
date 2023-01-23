import styled from 'styled-components';
import IndexItem from './Components/IndexList';
import StockTable from './Components/StockTable';
import { ascend, descend } from '../../../Components/Function/sort';
import News from '../News';
import { useKOSDAQList, useKOSPIList } from '../../../Components/API/ReactQueryContainer';
import BookMarks from './Components/BookMarks';

const Container = styled.div`
    margin-bottom: 50px;
`;

/**
 * 전날의 지수 정보(코스피, 코스닥), 주식 정보 시총10, 상승10, 하락10 주식을 보여주는 페이지입니다
 * @author 이중원
 */
const TopList = () => {
    const KOSPI = useKOSPIList();
    const KOSDAQ = useKOSDAQList();

    return (
        <Container>
            <IndexItem />
            <BookMarks />
            <StockTable title={`시가총액 TOP10`} KOSPI={descend(KOSPI, 'mrktTotAmt', 10)} KOSDAQ={descend(KOSDAQ, 'mrktTotAmt', 10)} />
            <StockTable title={`상승 TOP10`} KOSPI={descend(KOSPI, 'fltRt', 10)} KOSDAQ={descend(KOSDAQ, 'fltRt', 10)} />
            <StockTable title={`하락 TOP10`} KOSPI={ascend(KOSPI, 'fltRt', 10)} KOSDAQ={ascend(KOSDAQ, 'fltRt', 10)} />
            <News searchWord={'증시'} />
        </Container>
    );
};

export default TopList;
