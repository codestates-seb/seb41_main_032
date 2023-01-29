import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMember, useTradeInfo } from '../../Components/API/ReactQueryContainer';
import tradeCalculation from '../../Components/Function/tradeCalculator';
import numberToKR from '../../Components/Function/numberToKR';
import Pie from './Components/Pie';
import AssetHistory from './Components/AssetHistory';
import { useNavigate } from 'react-router-dom';
import History from './Components/History';
import Tooltip from '../../Components/Global/Tooltip';
import QuestionMark from '../../Components/Style/QuestionMark';

const Section = styled.section`
    background-color: #212223;
    padding: 20px;
    color: #999;
    height: 300px;
    display: flex;
    h2 {
        color: #eee;
        font-size: 1.3em;
        margin-bottom: 15px;
    }
`;
const Asset = styled.div`
    border-right: 1px solid #999;
    width: 500px;
    height: 100%;
    padding: 10px;
    margin-right: 30px;
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .value {
        color: #999999;
        margin-right: 20px;
    }
`;

const Chart = styled.div`
    width: 100%;
    .apexcharts-legend-text {
        color: #999999 !important;
    }
`;

/**
 * 자산관리 페이지입니다
 * @author 이중원
 */
const AssetManagement = () => {
    const user = useMember();
    const navigate = useNavigate();
    const tradeInfo = useTradeInfo();
    const trade = tradeCalculation(tradeInfo);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
    }, []);

    return (
        <>
            {tradeInfo ? (
                <>
                    <Section>
                        <Asset>
                            <h2>자산 현황</h2>
                            <Tooltip text={'예수금과 보유 주식 가치를 더한 값입니다'}>
                                <ItemContainer>
                                    <div className="category">
                                        총자산
                                        <QuestionMark color={'white'} />
                                    </div>
                                    <div className="value">{`${numberToKR(trade.totalStockPrice() + user?.money)}원`}</div>
                                </ItemContainer>
                            </Tooltip>

                            <Tooltip text={'현재 사용 할 수 있는 금액을 의미합니다'}>
                                <ItemContainer>
                                    <div className="category">
                                        예수금
                                        <QuestionMark color={'white'} />
                                    </div>
                                    <div className="value">{`${numberToKR(user?.money)}원`}</div>
                                </ItemContainer>
                            </Tooltip>

                            <Tooltip text={'현재 보유한 주식의 총 가치를 나타냅니다'}>
                                <ItemContainer>
                                    <div className="category">
                                        보유 주식
                                        <QuestionMark color={'white'} />
                                    </div>
                                    <div className="value">{`${numberToKR(trade.totalStockPrice())}원`}</div>
                                </ItemContainer>
                            </Tooltip>
                            <Tooltip text={'이제까지 누적된 손실과 이익을 나타냅니다'}>
                                <ItemContainer>
                                    <div className="category">
                                        손익
                                        <QuestionMark color={'white'} />
                                    </div>
                                    <div className="value">{`${numberToKR(trade.totalEstimatedAssets())}원`}</div>
                                </ItemContainer>
                            </Tooltip>

                            <Tooltip text={'이제까지 누적된 손실과 이익을 백분율로 나타냅니다'}>
                                <ItemContainer>
                                    <div className="category">
                                        손익률
                                        <QuestionMark color={'white'} />
                                    </div>
                                    <div className="value">{`${((trade.totalEstimatedAssets() / 10000000) * 100)?.toFixed(2)}%`}</div>
                                </ItemContainer>
                            </Tooltip>
                        </Asset>
                        <Pie trade={trade} />
                        <Chart>
                            <AssetHistory trade={trade} />
                        </Chart>
                    </Section>
                    <section>
                        <History tradeInfo={[...tradeInfo].reverse()}></History>
                    </section>
                </>
            ) : null}
        </>
    );
};

export default AssetManagement;
