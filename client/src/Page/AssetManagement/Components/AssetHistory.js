import React from 'react';
import Chart from 'react-apexcharts';
import numberToKR from '../../../Components/Function/numberToKR';
const Testa = ({ trade }) => {
    const chartData = {
        series: [
            {
                name: '보유 주식',
                type: 'column',
                data: trade.history().holdingStockPrice,
            },
            {
                name: '예수금',
                type: 'column',
                data: trade.history().moneyHistory,
            },
            {
                name: '손익',
                type: 'line',
                data: trade.history().incomeStatement,
            },
        ],
        options: {
            chart: {
                type: 'line',
                stacked: false,
                width: '100%',
            },
            title: {
                text: '기록',
                style: {
                    fontSize: '14px',
                    color: '#CCCCCC',
                },
                noData: { text: '기록이 없습니다' },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [1, 1, 4],
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB',
                    },
                    labels: {
                        style: {
                            colors: '#008FFB',
                        },
                        formatter: function (value) {
                            return numberToKR(value);
                        },
                    },
                    title: {
                        text: '보유 주식',
                        style: {
                            color: '#008FFB',
                        },
                        formatter: function (value) {
                            return numberToKR(value);
                        },
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                {
                    seriesName: '예수금',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#00E396',
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        },
                        formatter: function (value) {
                            return numberToKR(value);
                        },
                    },
                    title: {
                        text: '예수금',
                        style: {
                            color: '#00E396',
                        },
                        formatter: function (value) {
                            return numberToKR(value);
                        },
                    },
                },
                {
                    seriesName: '손익',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019',
                    },
                    labels: {
                        style: {
                            colors: '#FEB019',
                        },
                        formatter: function (value) {
                            return numberToKR(value);
                        },
                    },
                    title: {
                        text: '손익',
                        style: {
                            color: '#FEB019',
                        },
                        formatter: function (value) {
                            return numberToKR(value);
                        },
                    },
                },
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60,
                },
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40,
            },
        },
    };
    return <Chart options={chartData.options} series={chartData.series} height={270} type="line" />;
};

export default Testa;
