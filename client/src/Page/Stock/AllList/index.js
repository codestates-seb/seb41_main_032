import useGetStockList from '../../../Components/API/useGetStockList';
import { Title, SmTitle } from '../../../Components/Style/Stock';
import dateOutput from '../../../Components/Function/dateOutput';
import StockTable from './Components/StockTable';
import Loading from '../../../Components/Style/Loading';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    min-height: 800px;
    margin-bottom: 100px;
`;

/**
 * 모든 주식정보를 출력하는 페이지입니다
 * @author 이중원
 */

const AllList = () => {
    let date = new Date();
    date.setDate(date.getDate() - 4);
    const day = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
    const AllKOSPI = `&numOfRows=1000&pageNo=1&resultType=json&beginBasDt=${day}&mrktCls=KOSPI`;
    const AllKOSDAQ = `&numOfRows=2000&pageNo=1&resultType=json&beginBasDt=${day}&mrktCls=KOSDAQ`;
    const [allKOSPI, setAllKOSPI, allKOSDAQ, setAllKOSDAQ] = useGetStockList(AllKOSPI, AllKOSDAQ);

    return (
        <Container>
            {allKOSDAQ && allKOSPI ? (
                <>
                    <header>
                        <Title>전체 목록</Title>
                        {<SmTitle>{`${dateOutput(allKOSPI[0].basDt)} 기준`}</SmTitle>}
                    </header>

                    {<StockTable allKOSPI={allKOSPI} allKOSDAQ={allKOSDAQ} setAllKOSPI={setAllKOSPI} setAllKOSDAQ={setAllKOSDAQ} />}
                </>
            ) : (
                <Loading />
            )}
        </Container>
    );
};

export default AllList;
