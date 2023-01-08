import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import CommaGenerator from '../../../../Components/Function/CommaGenerator';
import Chart from 'react-apexcharts';

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
    .red {
        color: #ff4747;
    }
    .blue {
        color: #3a74ff;
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
const SummaryInfo = ({ todayInfo, tradingTrends }) => {
    const MarketCap = useLocation().state.MarketCap;
    const state = tradingTrends
        ? {
              series: [
                  {
                      name: '개인',
                      data: [
                          Number(tradingTrends[0].prsn_ntby_qty) > 0 ? tradingTrends[0].prsn_ntby_qty : '0',
                          Number(tradingTrends[0].prsn_ntby_qty) < 0 ? tradingTrends[0].prsn_ntby_qty.slice(1) : '0',
                      ],
                  },
                  {
                      name: '외국인',
                      data: [
                          Number(tradingTrends[0].frgn_ntby_qty) > 0 ? tradingTrends[0].frgn_ntby_qty : '0',
                          Number(tradingTrends[0].frgn_ntby_qty) < 0 ? tradingTrends[0].frgn_ntby_qty.slice(1) : '0',
                      ],
                  },
                  {
                      name: '기관계',
                      data: [
                          Number(tradingTrends[0].orgn_ntby_qty) > 0 ? tradingTrends[0].orgn_ntby_qty : '0',
                          Number(tradingTrends[0].orgn_ntby_qty) < 0 ? tradingTrends[0].frgn_ntby_qty.slice(1) : '0',
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
                      text: '매매동향',
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
            {todayInfo ? (
                <>
                    <section>
                        <h3>투자 정보</h3>
                        <InfoBox>
                            <InfoItem>
                                <p>종가</p>
                                <p>{CommaGenerator(todayInfo.stck_prpr - todayInfo.prdy_vrss)}</p>
                            </InfoItem>
                            <InfoItem>
                                <p>시가</p>
                                <p className={todayInfo.stck_prpr - todayInfo.prdy_vrss < todayInfo.stck_prpr ? 'red' : 'blue'}>
                                    {CommaGenerator(todayInfo.stck_prpr)}
                                </p>
                            </InfoItem>
                            <InfoItem>
                                <p>고가</p>
                                <p className={todayInfo.stck_prpr - todayInfo.prdy_vrss < todayInfo.stck_hgpr ? 'red' : 'blue'}>
                                    {CommaGenerator(todayInfo.stck_hgpr)}
                                </p>
                            </InfoItem>
                            <InfoItem>
                                <p>저가</p>
                                <p className={todayInfo.stck_prpr - todayInfo.prdy_vrss < todayInfo.stck_lwpr ? 'red' : 'blue'}>
                                    {CommaGenerator(todayInfo.stck_lwpr)}
                                </p>
                            </InfoItem>
                            <InfoItem>
                                <p>52주일 최고가</p>
                                <p className={todayInfo.stck_prpr - todayInfo.prdy_vrss < todayInfo.w52_hgpr ? 'red' : 'blue'}>
                                    {CommaGenerator(todayInfo.w52_hgpr)}
                                </p>
                            </InfoItem>
                            <InfoItem>
                                <p>52주일 최저가</p>
                                <p className={todayInfo.stck_prpr - todayInfo.prdy_vrss < todayInfo.w52_lwpr ? 'red' : 'blue'}>
                                    {CommaGenerator(todayInfo.w52_lwpr)}
                                </p>
                            </InfoItem>
                        </InfoBox>
                    </section>
                    <section>
                        <h3>투자 지표</h3>
                        <InfoBox>
                            <InfoItem>
                                <p>시가총액</p>
                                <p>{MarketCap}</p>
                            </InfoItem>
                            <InfoItem>
                                <p>거래 회전율</p>
                                <p>{todayInfo.vol_tnrt}</p>
                            </InfoItem>
                            <InfoItem>
                                <p>PER</p>
                                <p>{todayInfo.per}</p>
                            </InfoItem>
                            <InfoItem>
                                <p>PBR</p>
                                <p>{todayInfo.pbr}</p>
                            </InfoItem>
                            <InfoItem>
                                <p>EPS</p>
                                <p>{CommaGenerator(Math.floor(todayInfo.eps))}</p>
                            </InfoItem>
                            <InfoItem>
                                <p>BPS</p>
                                <p>{CommaGenerator(Math.floor(todayInfo.bps))}</p>
                            </InfoItem>
                        </InfoBox>
                    </section>
                    {state ? <Chart options={state.options} series={state.series} type="bar" width={600} height={180} /> : null}
                </>
            ) : null}
        </InfoContainer>
    );
};

export default SummaryInfo;
