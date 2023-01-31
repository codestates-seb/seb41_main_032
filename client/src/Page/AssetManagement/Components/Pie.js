import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';
const Container = styled.div`
    .apexcharts-legend-text {
        color: #999999 !important;
    }
`;

// 보유주식 비율,현황을 확인 할 수 있는 차트
const Pie = ({ trade }) => {
    return (
        <Container>
            <Chart
                type="pie"
                width={350}
                series={trade.holdingStock().price.length === 0 ? ['100'] : trade.holdingStock().price}
                options={{
                    title: {
                        text: '보유 주식',
                        style: {
                            fontSize: '14px',
                            color: '#CCCCCC',
                        },
                    },
                    labels: trade.holdingStock().stockName.length === 0 ? ['예수금'] : trade.holdingStock().stockName,
                }}
            />
        </Container>
    );
};

export default Pie;
