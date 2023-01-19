import { useState } from 'react';
import styled from 'styled-components';

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
/**
 * 1페이지당 10개씩 출력합니다 페이지버튼은 5개씩 출력합니다
 * @author 이중원
 * @param {Array} data2 배열을 넣어주세요
 * @returns [현재 페이지의 데이터, 현재 페이지의 페이지 번호, 페이지버튼 총 갯수, 페이지버튼, 페이지 뒤로가기, 페이지 앞으로가기, data, setData]
 */
const usePagination = (data = []) => {
    const [Data, setData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1); //현재 페이지
    const [itemsPerPage, setItemsPerPage] = useState(10); //아이템 갯수
    const [pageLimit, setPageLimit] = useState(5); // 페이지 버튼갯수

    // 페이지이동시 버튼값 변경을 위한 값
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);

    /**현재 페이지를 가리킴 */
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    /** 페이지버튼 총 갯수 */
    const pages = [];
    // Math.ceil -> 나눴을때 발생하는 소수점 처리
    for (let i = 1; i <= Math.ceil(Data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    // 현재 페이지를 기준으로 데이터를 잘라서 보여줌 (itemsPerPage = 아이템 갯수 ,currentPage= 현재 페이지 )
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

    /** 페이지 버튼 생성 */
    const renderPageNumbers = pages.map((num) => {
        if (num < maxPageLimit + 1 && num > minPageLimit) {
            return (
                <PageBtn key={num} id={num} onClick={handleClick} className={currentPage === num ? 'active' : null}>
                    {num}
                </PageBtn>
            );
        } else {
            return null;
        }
    });
    /**페이지 뒤로가기 이벤트 */
    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageLimit === 0) {
            setMinPageLimit(minPageLimit - pageLimit);
            setMaxPageLimit(maxPageLimit - pageLimit);
        }
    };

    /**  페이지 앞으로가기 이벤트*/
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageLimit) {
            setMinPageLimit(minPageLimit + pageLimit);
            setMaxPageLimit(maxPageLimit + pageLimit);
        }
    };

    return [currentItems, currentPage, setCurrentPage, pages, renderPageNumbers, handlePrevBtn, handleNextBtn, data, setData];
};

export default usePagination;
