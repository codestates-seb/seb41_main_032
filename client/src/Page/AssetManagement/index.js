import React from 'react';
import styled from 'styled-components';
import { useMember, useTradeInfo } from '../../Components/API/ReactQueryContainer';
import commaGenerator from '../../Components/Function/commaGenerator';
import tradeCalculation from '../../Components/Function/tradeCalculation';

const Section = styled.section`
    background-color: #212223;
    padding: 20px;
    color: #999;
    height: 300px;
    display: flex;
    h2 {
        color: #eee;
        font-size: 1.3em;
        margin-bottom: 30px;
    }
`;
const Asset = styled.div`
    border-right: 1px solid #999;
    width: 300px;
    height: 100%;
    padding: 10px;
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .value {
        color: #ffffff;
        margin-right: 20px;
    }
`;

const AssetManagement = () => {
    const user = useMember();
    const tradeInfo = useTradeInfo();
    const trade = tradeCalculation(tradeInfo);
    return (
        <>
            <Section>
                <Asset>
                    <h2>자산 현황</h2>
                    <ItemContainer>
                        <div className="category">총자산</div>
                        <div className="value">{`${commaGenerator(user?.money)} 원`}</div>
                    </ItemContainer>
                    <ItemContainer>
                        <div className="category">예수금</div>
                        <div className="value">{`${commaGenerator(user?.money)} 원`}</div>
                    </ItemContainer>
                    <ItemContainer>
                        <div className="category">주식 총 평가금액</div>
                        <div className="value">{`${commaGenerator(user?.money)} 원`}</div>
                    </ItemContainer>
                    <ItemContainer>
                        <div className="category">실현 손익</div>
                        <div className="value">{`${commaGenerator(user?.money)} 원`}</div>
                    </ItemContainer>
                </Asset>
                <Asset>
                    <h2>자산 유형</h2>
                </Asset>
                <Asset>
                    <h2>일자별 자산 흐름</h2>
                </Asset>
            </Section>
            <section></section>
        </>
    );
};

export default AssetManagement;
