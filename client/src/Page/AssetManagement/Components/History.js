import React from 'react';
import styled from 'styled-components';
import timeForToday from '../../../Components/Function/timeForToday';
const Table = styled.table`
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    margin: 50px 30px;
    th,
    td {
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
        }
    }
    tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
        :hover {
            background-color: #c7d3ef;
        }
    }
`;

const History = ({ tradeInfo }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>종목명</th>
                    <th>거래타입</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>날짜</th>
                </tr>
            </thead>
            <tbody>
                {tradeInfo?.map((el, index) => {
                    return (
                        <tr key={index}>
                            <td>{el.stockName}</td>
                            <td>{el.tradeType}</td>
                            <td>{el.price}</td>
                            <td>{el.quantity}</td>
                            <td>{timeForToday(new Date(el.createdAt))}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default History;
