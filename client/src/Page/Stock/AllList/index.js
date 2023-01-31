import { Title, SmTitle } from '../../../Components/Style/Stock';
import dateOutput from '../../../Components/Function/dateOutput';
import StockTable from './Components/StockTable';
import Loading from '../../../Components/Style/Loading';
import styled from 'styled-components';
import { useKOSPIList, useKOSDAQList } from '../../../Components/API/ReactQueryContainer';
import useInput from '../../../Components/Hook/useInput';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Container = styled.div`
    width: 100%;
    min-height: 800px;
    margin-bottom: 100px;
    padding: 20px;
`;

const SearchInput = styled.input`
    height: 30px;
    width: 300px;
    color: #70727b;
    border-radius: 3px;
    border: 1px solid rgb(186 191 196);
    margin-top: 20px;
    padding-left: 5px;
    margin-bottom: 10px;
`;

/**
 * 모든 주식정보를 출력하는 페이지입니다
 * @author 이중원
 */
const AllList = () => {
    const location = useLocation();
    const KOSPI = useKOSPIList();
    const KOSDAQ = useKOSDAQList();
    const [keyword, setKeyword, ChangeKeyword] = useInput('');

    useEffect(() => {
        if (location.state?.name.length !== 0) {
            setKeyword(location.state?.name);
        }
    }, [location.state?.name]);

    return (
        <Container>
            {KOSPI && KOSDAQ ? (
                <>
                    <header>
                        <Title>전체 목록</Title>
                        {<SmTitle>{`${dateOutput(KOSPI[0].basDt)} 기준`}</SmTitle>}
                    </header>
                    <SearchInput type="text" placeholder="검색" onChange={ChangeKeyword} value={keyword || ''} />
                    {<StockTable KOSPI={KOSPI} KOSDAQ={KOSDAQ} keyword={keyword} setKeyword={setKeyword} />}
                </>
            ) : (
                <Loading />
            )}
        </Container>
    );
};

export default AllList;
