import styled from 'styled-components';
import ItemBox from './ItemBox';
import { Title, SmTitle } from '../../../../../Components/Style/Stock';
import { useIndexKOSPI, useIndexKOSDAQ } from '../../../../../Components/API/ReactQueryContainer';
import dateOutput from '../../../../../Components/Function/dateOutput';

const Section = styled.section`
    padding: 20px;
`;

const ItemList = styled.ul`
    display: flex;
    list-style: none;
`;

/**
 * 지수 정보 (코스피 ,코스닥)을 보여주는 컴포넌트입니다
 */
const IndexList = () => {
    const KOSPI = useIndexKOSPI();
    const KOSDAQ = useIndexKOSDAQ();

    return (
        <Section>
            <header>
                <Title>국내지수</Title>
                <SmTitle>{`${dateOutput(KOSPI?.basDt)} 기준`}</SmTitle>
            </header>
            <ItemList>
                <ItemBox data={KOSPI}></ItemBox>
                <ItemBox data={KOSDAQ}></ItemBox>
            </ItemList>
        </Section>
    );
};

export default IndexList;
