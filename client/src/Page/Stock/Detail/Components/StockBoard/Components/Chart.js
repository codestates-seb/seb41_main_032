import Chart from 'react-apexcharts';
import styled from 'styled-components';
import { Ascend } from '../../../../../../Components/Function/Sort';
const Section = styled.section`
    padding-top: 20px;
    border-top: 1px solid #333;
    .apexcharts-title-text {
        color: red;
    }
`;

/** 빨간색과 파란색으로 표시되는 캔들 차트를 출력하는 컴포넌트입니다*/
const Areachart = ({ infoByDate }) => {
    const sortedData = Ascend(infoByDate, 'stck_bsop_date');

    /**
     * @param x 날짜
     * @param y [시가,최고가,최저가,종가]
     */
    const dataList = sortedData
        ? sortedData.map((el) => {
              const data = {
                  x: `${el.stck_bsop_date.slice(2, 4)}/${el.stck_bsop_date.slice(4, 6)}/${el.stck_bsop_date.slice(6, 8)}`,
                  y: [Number(el.stck_oprc), Number(el.stck_hgpr), Number(el.stck_lwpr), Number(el.stck_clpr)],
              };
              return data;
          })
        : null;

    const chartData = {
        series: [
            {
                data: dataList ? dataList : null,
            },
        ],
        options: {
            chart: {
                type: 'candlestick',
                height: 350,
            },
            title: {
                text: '차트',
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '14px',
                    color: '#CCCCCC',
                },
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
                labels: {
                    style: {
                        colors: '#999',
                    },
                },
            },
            xaxis: {
                labels: {
                    style: {
                        colors: '#999',
                    },
                },
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#ed3738',
                        downward: '#097df3',
                    },
                },
            },
        },
        zoom: {
            enabled: true,
            type: 'x',
            resetIcon: {
                offsetX: -10,
                offsetY: 0,
                fillColor: '#fff',
                strokeColor: '#37474F',
            },
            selection: {
                background: '#90CAF9',
                border: '#0D47A1',
            },
        },
    };

    return <Section>{dataList ? <Chart options={chartData.options} series={chartData.series} type="candlestick" height={300} /> : null}</Section>;
};

export default Areachart;
