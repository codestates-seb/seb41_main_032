import styled from 'styled-components';
import NumberToKR from '../../../../../Components/Function/NumberToKR';
import CommaGenerator from '../../../../../Components/Function/CommaGenerator';
import DateOutput from '../../../../../Components/Function/DateOutput';
import { RedTriangle, BlueTriangle } from '../../../../../Components/Style/Stock';
import usePagination from '../../../../../Components/Hook/usePagination';
const Title = styled.h2`
    font-size: 1.1em;
    margin-top: 20px;
`;

const SmallFont = styled.div`
    font-size: 0.8em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    color: #70727b; ;
`;

const Container = styled.section`
    padding: 20px;
`;
const Table = styled.table`
    margin-top: 10px;
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

const PageBtn = styled.li`
    display: inline;
    list-style: none;
    padding: 5px 10px;
    border: 1px solid rgb(193, 195, 197);
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? 'none' : null)};
    :hover {
        background-color: rgb(159, 207, 243);
    }
`;
const PageList = styled.ul`
    display: flex;
    margin: 30px;
    margin-top: 80px;
    margin-bottom: 40px;
    .active {
        background-color: #f48225;
        color: white;
    }
`;
/**  주식 일별 정보를 출력하는 컴포넌트입니다
 * 
    종가 최고가 최저가 거래량 · 거래대금을 출력합니다*/
const DailyInfo = ({ infoByDate }) => {
    const [currentItems, currentPage, pages, renderPageNumbers, handlePrevBtn, handleNextBtn] = usePagination(infoByDate);

    return (
        <Container>
            <Title>일별 시세</Title>
            <Table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>종가</th>
                        <th>최고가</th>
                        <th>최저가</th>
                        <th>거래량 · 거래대금</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((el) => {
                        return (
                            <tr key={el.stck_bsop_date}>
                                <td>{DateOutput(el.stck_bsop_date)}</td>
                                {el.prdy_vrss > 0 ? (
                                    <td>
                                        <div className="red">{CommaGenerator(el.stck_clpr)}</div>
                                        <SmallFont>
                                            <RedTriangle />
                                            <span className="red">+{el.prdy_vrss}</span>
                                        </SmallFont>
                                    </td>
                                ) : (
                                    <td>
                                        <div className="blue">{CommaGenerator(el.stck_clpr)}</div>
                                        <SmallFont>
                                            <BlueTriangle />
                                            <span className="blue">{el.prdy_vrss}</span>
                                        </SmallFont>
                                    </td>
                                )}
                                <td>{CommaGenerator(el.stck_hgpr)}</td>
                                <td>{CommaGenerator(el.stck_lwpr)}</td>
                                <td>
                                    <div>{CommaGenerator(el.acml_vol)}</div>
                                    <SmallFont>{NumberToKR(el.acml_tr_pbmn)}</SmallFont>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <PageList>
                <PageBtn onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>
                    Prev
                </PageBtn>

                {renderPageNumbers}

                <PageBtn onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
                    Next
                </PageBtn>
            </PageList>
        </Container>
    );
};
export default DailyInfo;