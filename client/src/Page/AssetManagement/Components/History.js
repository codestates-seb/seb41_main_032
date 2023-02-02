import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import timeForToday from '../../../Components/Function/timeForToday';
import usePagination from '../../../Components/Hook/usePagination';
import { PageBtn, PageList } from '../../../Components/Style/PageBtn';
import numberToKR from '../../../Components/Function/numberToKR';
const Table = styled.table`
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    border-radius: 5px 5px 0 0;
    th,
    td {
        padding: 12px 15px;
    }

    thead tr {
        font-weight: bold;
        color: #555;
        text-align: left;
        font-weight: bold;
        border-bottom: 1px solid #373737;
    }
    tbody tr {
        border-bottom: 1px solid #eee;
        height: 70px;
        cursor: pointer;

        .red {
            color: red;
        }
        .blue {
            color: blue;
        }
        :hover {
            background-color: #c7d3ef;
            transform: scale(1.01);
            transition: 0.5s ease-in-out;
        }
    }
    tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
        :hover {
            background-color: #c7d3ef;
        }
    }
`;

const Section = styled.section`
    padding: 20px;
    margin-bottom: 30px;
    margin-top: 20px;
    h3 {
        margin-bottom: 20px;
    }
`;

// 매매한 기록을 출력하는 컴포넌트
const History = ({ tradeInfo }) => {
    const [currentItems, currentPage, setCurrentPage, pages, renderPageNumbers, handlePrevBtn, handleNextBtn, data, setData] = usePagination(tradeInfo, 8);
    const navigate = useNavigate();
    const handlerLink = (data) => {
        navigate(`/stock/${data.stockCode}`, { state: { name: data.stockName } });
    };
    return (
        <Section>
            <header>
                <h3>거래기록</h3>
            </header>
            <Table>
                <thead>
                    <tr>
                        <th>종목명</th>
                        <th>거래타입</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>총 가격</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((el, index) => {
                        return (
                            <tr key={index} onClick={(e) => handlerLink(el)}>
                                <td>{el.stockName}</td>
                                <td>{el.tradeType === 'BUY' ? '매수' : '매도'}</td>
                                <td>{`${numberToKR(el.price)}원`}</td>
                                <td>{el.quantity}</td>
                                <td>{`${numberToKR(el.price * el.quantity)}원`}</td>
                                <td>{timeForToday(new Date(el.createdAt))}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <PageList>
                <PageBtn onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>
                    이전
                </PageBtn>
                {renderPageNumbers}
                <PageBtn onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
                    다음
                </PageBtn>
            </PageList>
        </Section>
    );
};

export default History;
