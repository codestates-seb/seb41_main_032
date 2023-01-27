import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBookMarks, useKOSDAQList, useKOSPIList } from '../../../Components/API/ReactQueryContainer';
import { Title, SelectBtnContainer } from '../../../Components/Style/Stock';
import usePagination from '../../../Components/Hook/usePagination';
import useInput from '../../../Components/Hook/useInput';
import StockList from './Components/StockList';
import { PageBtn, PageList } from '../../../Components/Style/PageBtn';

const Section = styled.section`
    width: 100%;
    min-height: 500px;
    margin-bottom: 100px;
    padding: 20px;
`;
const SearchInput = styled.input`
    height: 30px;
    width: 300px;
    color: #70727b;
    border-radius: 3px;
    border: 1px solid rgb(186 191 196);
    margin-top: 20px;
    padding-left: 5px;
    margin-bottom: 10px;
`;

/**
 * 관심종목(북마크)를 쉽게 추가하거나 삭제하기 위한 페이지입니다
 * @author 이중원
 */
const AddBookMarks = () => {
    const [keyword, setKeyword, ChangeKeyword] = useInput();
    const [select, setSelect] = useState('stock');
    const [currentItems, currentPage, setCurrentPage, pages, renderPageNumbers, handlePrevBtn, handleNextBtn, data, setData] = usePagination([], 35);
    const [stockList, setStockList] = useState();

    const KOSPI = useKOSPIList();
    const KOSDAQ = useKOSDAQList();

    const bookMarks = useBookMarks();

    // 코스피,코스닥이 변경되었을때 실행
    useEffect(() => {
        if (!KOSPI && !KOSDAQ) return;

        const stock = KOSPI?.concat(KOSDAQ);
        setStockList(stock);
        if (select === 'stock') setData(stock);
    }, [KOSPI, KOSDAQ]);

    //북마크가 변경되었을때 실행
    useEffect(() => {
        if (!bookMarks) return;
        if (select === 'bookMarks') setData(bookMarks);
    }, [bookMarks]);

    const handleSelect = (select) => {
        setSelect(select);
        switch (select) {
            case 'bookMarks':
                setData(bookMarks);
                setCurrentPage(1);
                break;
            case 'stock':
                setData(stockList);
                setCurrentPage(1);
                break;
            default:
                break;
        }
    };

    const Submit = (e) => {
        if (e.key === 'Enter') {
            if (keyword) {
                setData(
                    stockList.filter((el) => {
                        if (el.itmsNm.includes(keyword)) return true;
                        else return false;
                    }),
                );
                setKeyword('');
                setSelect('stock');
                setCurrentPage(1);
            }
        }
    };

    return (
        <Section>
            <header>
                <Title>{'관심종목 추가'}</Title>
            </header>

            <SearchInput type="text" placeholder="검색" onChange={ChangeKeyword} value={keyword} onKeyPress={Submit} />

            <SelectBtnContainer>
                <li>
                    <button className={select === 'stock' ? 'select' : null} onClick={() => handleSelect('stock')}>
                        주식 리스트
                    </button>
                </li>
                <li>
                    <button className={select === 'bookMarks' ? 'select' : null} onClick={() => handleSelect('bookMarks')}>
                        북마크
                    </button>
                </li>
            </SelectBtnContainer>

            <StockList data={currentItems} bookMarks={bookMarks} select={select} />

            <PageList>
                <PageBtn onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>
                    Prev
                </PageBtn>
                {renderPageNumbers}
                <PageBtn onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
                    Next
                </PageBtn>
            </PageList>
        </Section>
    );
};

export default AddBookMarks;
