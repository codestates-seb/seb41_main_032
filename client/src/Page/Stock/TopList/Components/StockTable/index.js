import styled from 'styled-components';
import { Title, SmTitle, SelectBtnContainer } from '../../../../../Components/Style/Stock';
import { Link } from 'react-router-dom';
import dateOutput from '../../../../../Components/Function/dateOutput';
import useCreateTable from '../../../../../Components/Hook/useCreateTable';
import { useEffect, useState } from 'react';
import Loading from '../../../../../Components/Style/Loading';

const StyledLink = styled(Link)`
    text-decoration-line: none;
`;
const Section = styled.section`
    position: relative;
    width: 100%;
    min-height: 500px;
`;
/**
 * 주식 정보 (코스피 ,코스닥)을 테이블로(표)로 보여주는 컴포넌트입니다
 * @param title 컨텐츠의 제목입니다
 * @param KOSPI 코스피 주식 정보 배열
 * @param KOSDAQ 코스닥 주식 정보 배열
 */
const StockTable = ({ title, KOSPI, KOSDAQ }) => {
    const [indexSelect, setIndexSelect] = useState('KOSPI');
    const [table, setTable] = useCreateTable();
    const handleSelect = (data, select) => {
        setTable(data);
        setIndexSelect(select);
    };

    /** 시작될 때 + KOSPI, KOSDAQ 값이 변경될 때 */
    useEffect(() => {
        if (indexSelect === 'KOSPI') setTable(KOSPI);
        else if (indexSelect === 'KOSDAQ') setTable(KOSDAQ);
        else {
            // 기본값
            setIndexSelect('KOSPI');
            setTable(KOSPI);
        }
    }, [KOSPI, KOSDAQ]);

    return (
        <Section>
            {KOSPI && KOSDAQ ? (
                <>
                    <Title>
                        {title}
                        <SmTitle>{KOSPI.length > 0 ? `${dateOutput(KOSPI[0].basDt)} 기준` : null}</SmTitle>
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
                </>
            ) : (
                <>
                    <Title>{title}</Title>
                    <Loading />
                </>
            )}
        </Section>
    );
};

export default StockTable;
