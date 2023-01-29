import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBookMarks } from '../../../../../Components/API/ReactQueryContainer';
import { Title } from '../../../../../Components/Style/Stock';
import ItemBox from './ItemBox';
import addImg from '../../../../../Components/Img/add.png';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../../../../Components/Function/userInfo';

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
    const bookmarks = useBookMarks();
    const [memberId, setMemberId] = useRecoilState(userInfo); // ../Function/userInfo

    const Switch = () => {
        if (memberId === null) {
            return (
                <AddBookMarks>
                    <p>로그인 후 이용해주세요!</p>
                    <StyleLink to="/login">
                        <img src={addImg} alt={'Go to the Login'} />
                        로그인
                    </StyleLink>
                </AddBookMarks>
            );
        } else if (bookmarks === undefined || bookmarks?.length === 0) {
            return (
                <AddBookMarks>
                    <p>관심있는 종목을 추가하세요!</p>
                    <StyleLink to="/stock/AddBookMarks">
                        <img src={addImg} alt={'Go to the Add Bookmarks page'} />
                        종목 추가
                    </StyleLink>
                </AddBookMarks>
            );
        } else {
            return (
                <ItemList>
                    {bookmarks?.map((el) => (
                        <ItemBox key={el.stockCode} data={el} />
                    ))}
                </ItemList>
            );
        }
    };

    return (
        <Section>
            <header>
                <Title>즐겨찾기</Title>
            </header>
            {Switch()}
        </Section>
    );
};

export default BookMarks;
