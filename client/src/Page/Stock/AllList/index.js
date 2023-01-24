import { Title, SmTitle } from '../../../Components/Style/Stock';
import dateOutput from '../../../Components/Function/dateOutput';
import StockTable from './Components/StockTable';
import Loading from '../../../Components/Style/Loading';
import styled from 'styled-components';
import { useKOSPIList, useKOSDAQList } from '../../../Components/API/ReactQueryContainer';

const Container = styled.div`
    width: 100%;
    min-height: 800px;
    margin-bottom: 100px;
    padding: 20px;
`;

/**
 * 모든 주식정보를 출력하는 페이지입니다
 * @author 이중원
 */
const AllList = () => {
    const KOSPI = useKOSPIList();
    const KOSDAQ = useKOSDAQList();

    return (
        <Container>
            {KOSPI && KOSDAQ ? (
                <>
                    <header>
                        <Title>전체 목록</Title>
                        {<SmTitle>{`${dateOutput(KOSPI[0].basDt)} 기준`}</SmTitle>}
                    </header>

                    {<StockTable KOSPI={KOSPI} KOSDAQ={KOSDAQ} />}
                </>
            ) : (
                <Loading />
            )}
        </Container>
    );
};

export default AllList;
