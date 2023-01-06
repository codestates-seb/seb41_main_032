import styled from 'styled-components';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import useStockDetails from '../../Components/API/useStockDetails';
import CommaGenerator from '../../Components/Function/CommaGenerator';
import { RedTriangle, BlueTriangle } from '../../Components/Style/Triangle';
const Main = styled.main`
    margin: 50px;
    background-color: #212223;
    padding: 20px;
    color: #999;
    h2 {
        margin: 10px 0px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        color: #eee;
        span {
            display: inline-block;
            font-size: 12px;
            color: #eee;
            border-radius: 2px;
            border: 0.5px solid #ddd;
            margin-left: 7px;
            font-weight: 400;
            line-height: 15px;
            padding: 0 5px;
            vertical-align: 3px;
        }
    }
    h3 {
        margin: 10px 0px;
        font-size: 1em;
        font-weight: 900;
        color: #ccc;
    }
`;
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
    border-top: 2px solid #333;
    section {
        margin-right: 20px;
    }
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

const Stock = () => {
    const params = useParams();
    const query = `?&FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=${params.id}`;
    const [data, setData] = useStockDetails(query);
    const info = useLocation().state;
    console.log(data);
    return (
        <>
            {data ? (
                <Main>
                    <section>
                        <p>한국증권 거래소 #{data.bstp_kor_isnm}</p>
                        <h2>
                            {info.name} <span>{params.id}</span>
                        </h2>
                        <PriceContainer>
                            {data.prdy_vrss > 0 ? (
                                <>
                                    <RedTriangle />
                                    <Price>{CommaGenerator(data.stck_prpr)}</Price>
                                    <RedPrice>{`${data.prdy_vrss}`}</RedPrice>
                                    <RedPrice>{`${data.prdy_ctrt}%`}</RedPrice>
                                </>
                            ) : (
                                <>
                                    <BlueTriangle />
                                    <Price>{CommaGenerator(data.stck_prpr)}</Price>
                                    <BluePrice>{`${data.prdy_vrss}`}</BluePrice>
                                    <BluePrice>{`${data.prdy_ctrt}%`}</BluePrice>
                                </>
                            )}
                        </PriceContainer>
                    </section>
                    <InfoContainer>
                        <section>
                            <h3>투자 정보</h3>
                            <InfoBox>
                                <InfoItem>
                                    <p>종가</p>
                                    <p>{CommaGenerator(data.stck_prpr - data.prdy_vrss)}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>시가</p>
                                    <p className={data.stck_prpr - data.prdy_vrss < data.stck_prpr ? 'red' : 'blue'}>{CommaGenerator(data.stck_prpr)}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>고가</p>
                                    <p className={data.stck_prpr - data.prdy_vrss < data.stck_hgpr ? 'red' : 'blue'}>{CommaGenerator(data.stck_hgpr)}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>저가</p>
                                    <p className={data.stck_prpr - data.prdy_vrss < data.stck_lwpr ? 'red' : 'blue'}>{CommaGenerator(data.stck_lwpr)}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>52주일 최고가</p>
                                    <p className={data.stck_prpr - data.prdy_vrss < data.w52_hgpr ? 'red' : 'blue'}>{CommaGenerator(data.w52_hgpr)}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>52주일 최저가</p>
                                    <p className={data.stck_prpr - data.prdy_vrss < data.w52_lwpr ? 'red' : 'blue'}>{CommaGenerator(data.w52_lwpr)}</p>
                                </InfoItem>
                            </InfoBox>
                        </section>
                        <section>
                            <h3>투자 지표</h3>
                            <InfoBox>
                                <InfoItem>
                                    <p>시가총액</p>
                                    <p>{info.MarketCap}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>거래 회전율</p>
                                    <p>{data.vol_tnrt}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>PER</p>
                                    <p>{data.per}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>PBR</p>
                                    <p>{data.pbr}</p>
                                </InfoItem>

                                <InfoItem>
                                    <p>EPS</p>
                                    <p>{CommaGenerator(Math.floor(data.eps))}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>BPS</p>
                                    <p>{CommaGenerator(Math.floor(data.bps))}</p>
                                </InfoItem>
                            </InfoBox>
                        </section>
                    </InfoContainer>
                </Main>
            ) : null}
        </>
    );
};

export default Stock;
