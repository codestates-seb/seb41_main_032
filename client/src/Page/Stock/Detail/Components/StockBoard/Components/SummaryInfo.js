import styled from 'styled-components';
import commaGenerator from '../../../../../../Components/Function/commaGenerator';
import Chart from 'react-apexcharts';
import dateOutput from '../../../../../../Components/Function/dateOutput';
import Tooltip from '../../../../../../Components/Global/Tooltip';
import described from './tooltipText';
import QuestionMark from '../../../../../../Components/Style/QuestionMark';

const InfoBox = styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    list-style: none;
    font-size: 0.8em;
`;

const InfoItem = styled.li`
    width: 160px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 5px;
    .red {
        color: #ff4747;
    }
    .blue {
        color: #3a74ff;
    }
    p {
        display: flex;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    border-top: 1px solid #333;
    section {
        margin-right: 20px;
    }
`;

/** 매매동향을 차트로 그려주는 컴포넌트입니다
 *
 * 개인,기관, 외국인의 매매와 매수정보를 이용하여 bar 차트를 그립니다*/
const SummaryInfo = ({ stockInfo, stockInvestor }) => {
    let index = 0;

    // 증권사 api 정보 업데이트가 안된 경우 0번째 인덱스값이 '' 으로 되어있음
    if (stockInvestor) {
        index = stockInvestor[0].prsn_ntby_qty === '' ? 1 : 0;
    }

    const state = stockInvestor
        ? {
              series: [
                  {
                      name: '개인',
                      data: [
                          Number(stockInvestor[index].prsn_ntby_qty) > 0 ? stockInvestor[index].prsn_ntby_qty : '0',
                          Number(stockInvestor[index].prsn_ntby_qty) < 0 ? stockInvestor[index].prsn_ntby_qty.slice(1) : '0',
                      ],
                  },
                  {
                      name: '외국인',
                      data: [
                          Number(stockInvestor[index].frgn_ntby_qty) > 0 ? stockInvestor[index].frgn_ntby_qty : '0',
                          Number(stockInvestor[index].frgn_ntby_qty) < 0 ? stockInvestor[index].frgn_ntby_qty.slice(1) : '0',
                      ],
                  },
                  {
                      name: '기관계',
                      data: [
                          Number(stockInvestor[index].orgn_ntby_qty) > 0 ? stockInvestor[index].orgn_ntby_qty : '0',
                          Number(stockInvestor[index].orgn_ntby_qty) < 0 ? stockInvestor[index].frgn_ntby_qty.slice(1) : '0',
                      ],
                  },
              ],
              options: {
                  chart: {
                      type: 'bar',
                      height: 100,
                      stacked: true,
                      stackType: '100%',
                  },
                  plotOptions: {
                      bar: {
                          horizontal: true,
                      },
                  },
                  stroke: {
                      width: 1,
                      colors: ['#fff'],
                  },
                  title: {
                      text: `매매동향 ${dateOutput(stockInvestor[index].stck_bsop_date)}`,
                      offsetY: 5,
                      style: {
                          color: '#ccc',
                      },
                  },
                  xaxis: {
                      categories: ['매수', '매도'],
                      labels: {
                          style: {
                              colors: '#999',
                          },
                      },
                  },
                  yaxis: {
                      labels: {
                          style: {
                              colors: '#999',
                          },
                      },
                  },

                  tooltip: {
                      y: {
                          formatter: function (val) {
                              return val;
                          },
                      },
                  },

                  legend: {
                      position: 'top',
                      horizontalAlign: 'left',
                      offsetX: 10,
                      labels: {
                          colors: '#999',
                      },
                  },
              },
          }
        : null;
    return (
        <InfoContainer>
            <section>
                <h3>투자 정보</h3>
                <InfoBox>
                    <InfoItem>
                        <p>전일</p>
                        <p>{commaGenerator(stockInfo.stck_prpr - stockInfo.prdy_vrss)}</p>
                    </InfoItem>
                    <InfoItem>
                        <p>시가</p>
                        <p className={stockInfo.stck_oprc > stockInfo.stck_prpr - stockInfo.prdy_vrss ? 'red' : 'blue'}>
                            {commaGenerator(stockInfo.stck_oprc)}
                        </p>
                    </InfoItem>
                    <InfoItem>
                        <p>고가</p>
                        <p className={stockInfo.stck_prpr - stockInfo.prdy_vrss < stockInfo.stck_hgpr ? 'red' : 'blue'}>
                            {commaGenerator(stockInfo.stck_hgpr)}
                        </p>
                    </InfoItem>
                    <InfoItem>
                        <p>저가</p>
                        <p className={stockInfo.stck_prpr - stockInfo.prdy_vrss < stockInfo.stck_lwpr ? 'red' : 'blue'}>
                            {commaGenerator(stockInfo.stck_lwpr)}
                        </p>
                    </InfoItem>
                    <InfoItem>
                        <p>52주일 최고가</p>
                        <p>{commaGenerator(stockInfo.w52_hgpr)}</p>
                    </InfoItem>
                    <InfoItem>
                        <p>52주일 최저가</p>
                        <p>{commaGenerator(stockInfo.w52_lwpr)}</p>
                    </InfoItem>
                </InfoBox>
            </section>
            <section>
                <h3>투자 지표</h3>
                <InfoBox>
                    <Tooltip text={described.turnoverRatio}>
                        <InfoItem>
                            <p>
                                거래 회전율 <QuestionMark color={'white'} />
                            </p>
                            <p>{stockInfo.vol_tnrt}</p>
                        </InfoItem>
                    </Tooltip>
                    <Tooltip text={described.PER}>
                        <InfoItem>
                            <p>
                                PER <QuestionMark color={'white'} />
                            </p>
                            <p>{stockInfo.per}</p>
                        </InfoItem>
                    </Tooltip>
                    <Tooltip text={described.PBR}>
                        <InfoItem>
                            <p>
                                PBR <QuestionMark color={'white'} />
                            </p>
                            <p>{stockInfo.pbr}</p>
                        </InfoItem>
                    </Tooltip>
                    <Tooltip text={described.EPS}>
                        <InfoItem>
                            <p>
                                EPS <QuestionMark color={'white'} />
                            </p>
                            <p>{commaGenerator(Math.floor(stockInfo.eps))}</p>
                        </InfoItem>
                    </Tooltip>
                    <Tooltip text={described.BPS}>
                        <InfoItem>
                            <p>
                                BPS <QuestionMark color={'white'} />
                            </p>
                            <p>{commaGenerator(Math.floor(stockInfo.bps))}</p>
                        </InfoItem>
                    </Tooltip>
                </InfoBox>
            </section>
            {state ? <Chart options={state.options} series={state.series} type="bar" width={600} height={180} /> : null}
        </InfoContainer>
    );
};

export default SummaryInfo;
