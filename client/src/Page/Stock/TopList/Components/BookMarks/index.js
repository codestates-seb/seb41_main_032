import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useBookMarks } from '../../../../../Components/API/ReactQueryContainer';
import { Title } from '../../../../../Components/Style/Stock';
import ItemBox from './ItemBox';
import addImg from '../../../../../Components/Img/add.png';

const Section = styled.section`
    padding: 20px;
`;

const ItemList = styled.ul`
    display: flex;
    list-style: none;
`;

const AddBookMarks = styled.div`
    display: flex;
    height: 200px;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    p {
        font-size: 1.3em;
        color: #404954;
    }
`;

const StyleLink = styled(Link)`
    margin-top: 10px;
    text-decoration: none;
    color: #00bb81;
    font-weight: 600;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
`;

const BookMarks = () => {
    const bookmarks = useBookMarks('2');
    return (
        <Section>
            <header>
                <Title>즐겨찾기</Title>
            </header>
            {bookmarks?.length === 0 ? (
                <AddBookMarks>
                    <p>관심있는 종목을 추가하세요!</p>
                    <StyleLink to="/stock/AddBookMarks">
                        <img src={addImg} alt={'Go to the Add Bookmarks page'} />
                        종목 추가
                    </StyleLink>
                </AddBookMarks>
            ) : (
                <ItemList>
                    {bookmarks?.map((el) => (
                        <ItemBox key={el.stockCode} data={el} />
                    ))}
                </ItemList>
            )}
        </Section>
    );
};

export default BookMarks;
