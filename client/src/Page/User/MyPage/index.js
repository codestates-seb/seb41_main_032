import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import getStorage from '../../../Components/Function/getStorage';
import notify from '../../../Components/Function/notify';
import LoadingPage from '../../../Components/Style/LoadingPage';
import Bookmarks from './components/Bookmarks';
import Header from './components/Header';
import Posts from './components/Posts';

const Container = styled.main`
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
`;

// 마이페이지
const MyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        // id값이 없을때 null 타입이 아니라 문자열 null이 들어옴
        if (id === 'null' || id === undefined) {
            navigate('/login'); // 비로그인시 로그인페이지로 유도
            return;
        }
        fetchUserData();
    }, []);

    const fetchUserData = () => {
        const url = `${process.env.REACT_APP_API_URL}/members/${id}`;
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(url, options)
            .then((response) => {
                if (response.ok) return response.json();
                throw response;
            })
            .then((userData) => {
                setUser(userData);
                setIsOwner(getStorage('memberId') === userData.memberId.toString());
            })
            .catch((error) => notify('회원정보 조회 실패', 'error'));
    };

    return (
        <Container>
            {user ? (
                <>
                    <Header memberId={id} username={user?.username} isOwner={isOwner} />
                    <Bookmarks memberId={id} isOwner={isOwner} />
                    <Posts memberId={id} />
                </>
            ) : (
                <LoadingPage />
            )}
        </Container>
    );
};

export default MyPage;
