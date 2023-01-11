import styled from 'styled-components';
import { Title, SmTitle, SelectBtnContainer } from '../../../../../Components/Style/Stock';
import { Link } from 'react-router-dom';
import DateOutput from '../../../../../Components/Function/DateOutput';
import useCreateTable from '../../../../../Components/Hook/useCreateTable';
import { useState } from 'react';

const StyledLink = styled(Link)`
    text-decoration-line: none;
`;

/**
 * 주식 정보 (코스피 ,코스닥)을 테이블로(표)로 보여주는 컴포넌트입니다
 * @param title 컨텐츠의 제목입니다
 * @param KOSPI 코스피 주식 정보 배열
 * @param KOSDAQ 코스닥 주식 정보 배열
 */
const StockTable = ({ title, KOSPI, KOSDAQ }) => {
    const [indexSelect, setIndexSelect] = useState('KOSPI');
    const [table, setTable] = useCreateTable(KOSPI);
    const handleSelect = (data, select) => {
        setTable(data);
        setIndexSelect(select);
    };
    return (
        <section>
            <Title>
                {title}
                <SmTitle>{KOSPI.length > 0 ? `${DateOutput(KOSPI[0].basDt)} 기준` : null}</SmTitle>
            </Title>
            <SelectBtnContainer>
                <li>
                    <button className={indexSelect === 'KOSPI' ? 'select' : null} onClick={() => handleSelect(KOSPI, 'KOSPI')}>
                        코스피
                    </button>
                </li>
                <li>
                    <button className={indexSelect === 'KOSDAQ' ? 'select' : null} onClick={() => handleSelect(KOSDAQ, 'KOSDAQ')}>
                        코스닥
                    </button>
                </li>
                <li>
                    <StyledLink to={'/stock/List'}>
                        <button>전체 보기</button>
                    </StyledLink>
                </li>
            </SelectBtnContainer>
            {table}
        </section>
    );
};

export default StockTable;
