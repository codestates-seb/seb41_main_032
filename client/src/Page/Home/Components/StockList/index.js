import styled from 'styled-components';
import { Title, SmFont } from '../Style';
import { RedBox, BlueBox } from '../../../../Components/Style/ChgBox';
import NumberToKR from '../../../../Components/Function/NumberToKR';
import CommaGenerator from '../../../../Components/Function/CommaGenerator';
import { RedTriangle, BlueTriangle } from '../../../../Components/Style/Triangle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateOutput from '../../../../Components/Function/DateOutput';
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;

    th,
    td {
        width: 20%;
        padding: 12px 15px;
    }

    thead tr {
        font-size: 1.3em;
        font-weight: bold;
        color: #555;
        text-align: left;
        font-weight: bold;
        border-bottom: 1px solid #373737;
    }

    tbody tr {
        border-bottom: 1px solid #eee;
        font-size: 1.1em;
        .red {
            color: red;
        }
        .blue {
            color: blue;
        }
        :hover {
            background-color: #ddd;
        }
    }
    tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
        :hover {
            background-color: #ddd;
        }
    }
`;

const SmallFont = styled.div`
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    color: #70727b; ;
`;

const Button = styled.button`
    font-weight: 700;
    font-size: 0.9em;
    height: 40px;
    display: block;
    padding: 0 14px;
    border-radius: 20px;
    text-align: center;
    margin-right: 15px;
    color: #000;
    background-color: #f1f3f6;

    :hover {
        box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.25) inset, -200px 0 0 0 rgba(0, 0, 0, 0.25) inset;
    }
`;
const BtnContainer = styled.ul`
    display: flex;
    list-style: none;
    .selected {
        background-color: #404954;
        color: #fff;
    }
`;

/**
 * 주식 정보 (코스피 ,코스닥)을 보여주는 컴포넌트입니다
 * @param title 컨텐츠의 제목입니다
 * @param KOSPI 코스피 주식 정보 배열
 * @param KOSDAQ 코스닥 주식 정보 배열
 */
const StockList = ({ title, KOSPI = [], KOSDAQ = [] }) => {
    const navigate = useNavigate();

    // 코스피 또는 코스닥 주식정보를 보여줄지 결정하는 역할입니다
    const [select, setSelect] = useState(true);

    const Selecthandler = () => {
        setSelect((current) => !current);
    };

    /** 클릭시 주식코드기준으로 주식상세페이지로 이동합니다
     * @type {[ 주식코드, 주식이름, 주식시가총액 ]} */
    const Linkhandler = (data) => {
        navigate(`/stock/${data[0]}`, { state: { name: data[1], MarketCap: data[2] } });
    };
    return (
        <section>
            <Title>
                {title} <SmFont>{KOSPI.length > 0 ? `${DateOutput(KOSPI[0].basDt)} 기준` : null}</SmFont>
            </Title>
            <BtnContainer>
                <li>
                    <Button className={select === true ? 'selected' : null} onClick={Selecthandler}>
                        코스피
                    </Button>
                </li>
                <li>
                    <Button className={select === false ? 'selected' : null} onClick={Selecthandler}>
                        코스닥
                    </Button>
                </li>
            </BtnContainer>

            <Table>
                <thead>
                    <tr>
                        <th>종목명</th>
                        <th>종가</th>
                        <th>등락률</th>
                        <th>시가총액</th>
                        <th>거래량 · 거래대금</th>
                    </tr>
                </thead>
                <tbody>
                    {select
                        ? KOSPI.map((el) => {
                              return (
                                  <tr
                                      key={el.srtnCd}
                                      onClick={(e) => {
                                          Linkhandler([el.srtnCd, el.itmsNm, NumberToKR(el.mrktTotAmt)]);
                                      }}
                                  >
                                      <td>
                                          <div>{el.itmsNm}</div>
                                          <SmallFont>{el.srtnCd}</SmallFont>
                                      </td>
                                      {el.fltRt > 0 ? (
                                          <td>
                                              <div className="red">{CommaGenerator(el.clpr)}</div>
                                              <SmallFont>
                                                  <RedTriangle />
                                                  <span className="red">+{el.vs}</span>
                                              </SmallFont>
                                          </td>
                                      ) : (
                                          <td>
                                              <div className="blue">{CommaGenerator(el.clpr)}</div>
                                              <SmallFont>
                                                  <BlueTriangle />
                                                  <span className="blue">{el.vs}</span>
                                              </SmallFont>
                                          </td>
                                      )}
                                      <td>{el.fltRt > 0 ? <RedBox>{Number(el.fltRt)}%</RedBox> : <BlueBox>{Number(el.fltRt)}%</BlueBox>}</td>
                                      <td>{NumberToKR(el.mrktTotAmt)}</td>
                                      <td>
                                          <div>{CommaGenerator(el.trqu)}</div>
                                          <SmallFont>{NumberToKR(el.trPrc)}</SmallFont>
                                      </td>
                                  </tr>
                              );
                          })
                        : KOSDAQ.map((el) => {
                              return (
                                  <tr
                                      key={el.srtnCd}
                                      onClick={(e) => {
                                          Linkhandler([el.srtnCd, el.itmsNm, NumberToKR(el.mrktTotAmt)]);
                                      }}
                                  >
                                      <td>
                                          <div>{el.itmsNm}</div>
                                          <SmallFont>{el.srtnCd}</SmallFont>
                                      </td>
                                      {el.fltRt > 0 ? (
                                          <td>
                                              <div className="red">{CommaGenerator(el.clpr)}</div>
                                              <SmallFont>
                                                  <RedTriangle />
                                                  <span className="red">+{el.vs}</span>
                                              </SmallFont>
                                          </td>
                                      ) : (
                                          <td>
                                              <div className="blue">{CommaGenerator(el.clpr)}</div>
                                              <SmallFont>
                                                  <BlueTriangle />
                                                  <span className="blue">{el.vs}</span>
                                              </SmallFont>
                                          </td>
                                      )}
                                      <td>{el.fltRt > 0 ? <RedBox>{Number(el.fltRt)}%</RedBox> : <BlueBox>{Number(el.fltRt)}%</BlueBox>}</td>
                                      <td>{NumberToKR(el.mrktTotAmt)}</td>
                                      <td>
                                          <div>{CommaGenerator(el.trqu)}</div>
                                          <SmallFont>{NumberToKR(el.trPrc)}</SmallFont>
                                      </td>
                                  </tr>
                              );
                          })}
                </tbody>
            </Table>
        </section>
    );
};

export default StockList;
