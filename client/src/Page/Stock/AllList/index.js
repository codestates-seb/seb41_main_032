import useGetStockList from '../../../Components/API/useGetStockList';
import { Descend } from '../../../Components/Function/Sort';
import { Title, SmTitle } from '../../../Components/Style/Stock';
import DateOutput from '../../../Components/Function/DateOutput';
import StockTable from './Components/StockTable';

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
    const [allKOSPI, setAllKOSPI, allKOSDAQ, setAllKOSDAQ] = useGetStockList(AllKOSPI, AllKOSDAQ, Descend, 'mrktTotAmt', 2000);

    return (
        <>
            {allKOSDAQ && allKOSPI ? (
                <main>
                    <Title>전체 목록{<SmTitle>{`${DateOutput(allKOSPI[0].basDt)} 기준`}</SmTitle>}</Title>
                    {<StockTable allKOSPI={allKOSPI} allKOSDAQ={allKOSDAQ} setAllKOSPI={setAllKOSPI} setAllKOSDAQ={setAllKOSDAQ} />}
                </main>
            ) : null}
        </>
    );
};

export default AllList;
