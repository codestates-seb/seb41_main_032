import { useEffect, useState } from 'react';
import styled from 'styled-components';
import timeForToday from '../timeForToday';
import usePagination from '../../Hook/usePagination';
import { PageBtn, PageList } from '../../Style/PageBtn';

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    list-style: none;
    margin-top: 20px;

    & > :first-child {
        border-top: 1px solid rgb(193, 195, 197);
    }

    li {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        padding: 0px 15px;
        justify-content: space-evenly;
        border-bottom: 1px solid rgb(193, 195, 197);
        height: 100px;
    }

    .title {
        color: #000;
        font-size: 1.1em;
    }

    .description {
        color: #70727b;
        font-size: 0.8em;
    }

    .date {
        color: #aeaeae;
        font-size: 0.8em;
    }
    b {
        color: #000;
    }
`;

const NewsList = ({ news }) => {
    const [currentItems, currentPage, setCurrentPage, pages, renderPageNumbers, handlePrevBtn, handleNextBtn, data, setData] = usePagination(news);
    const [newsList, setNewsList] = useState();

    useEffect(() => {
        setData(news);
        setCurrentPage(1);
    }, [news]);

    useEffect(() => {
        if (currentItems.length !== 0) {
            setNewsList(currentItems);
        }
    }, [...currentItems]);

    return (
        <>
            <Container>
                {currentItems.map((el, index) => (
                    <li key={index} onClick={() => window.open(el.link)}>
                        <h3 className="title" dangerouslySetInnerHTML={{ __html: el.title }}></h3>
                        <p className="description" dangerouslySetInnerHTML={{ __html: el.description }}></p>
                        <p className="date">{timeForToday(el.pubDate)}</p>
                    </li>
                ))}
            </Container>
            <PageList>
                <PageBtn onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>
                    Prev
                </PageBtn>
                {renderPageNumbers}
                <PageBtn onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
                    Next
                </PageBtn>
            </PageList>
        </>
    );
};

export default NewsList;
