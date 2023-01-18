import styled from 'styled-components';
import { useParams } from 'react-router';
import { RedTriangle, BlueTriangle } from '../../../../../../Components/Style/Stock';
import commaGenerator from '../../../../../../Components/Function/commaGenerator';
import { useLocation } from 'react-router';

const PriceContainer = styled.div`
    margin-bottom: 30px;
    color: #eee;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
`;
const Price = styled.span`
    font-size: 1.2em;
    font-weight: 700;
    margin-right: 10px;
`;

const RedPrice = styled.span`
    margin-right: 3px;
    font-size: 0.9em;
    color: #ff4747;
`;
const BluePrice = styled.span`
    margin-right: 3px;
    font-size: 0.9em;
    color: #3a74ff;
`;

/** 주식의 이름,가격을 표시하는 컴포넌트입니다 */
const Info = ({ todayInfo }) => {
    const params = useParams();
    const { state } = useLocation();
    return (
        <section>
            <p>{`한국증권 거래소 #${todayInfo.bstp_kor_isnm}`}</p>
            <h2>
                {state.name} <span>{params.id}</span>
            </h2>
            <PriceContainer>
                {todayInfo.prdy_vrss > 0 ? (
                    <>
                        <RedTriangle />
                        <Price>{commaGenerator(todayInfo.stck_prpr)}</Price>
                        <RedPrice>{`${todayInfo.prdy_vrss}`}</RedPrice>
                        <RedPrice>{`${todayInfo.prdy_ctrt}%`}</RedPrice>
                    </>
                ) : (
                    <>
                        <BlueTriangle />
                        <Price>{commaGenerator(todayInfo.stck_prpr)}</Price>
                        <BluePrice>{`${todayInfo.prdy_vrss}`}</BluePrice>
                        <BluePrice>{`${todayInfo.prdy_ctrt}%`}</BluePrice>
                    </>
                )}
            </PriceContainer>
        </section>
    );
};

export default Info;
