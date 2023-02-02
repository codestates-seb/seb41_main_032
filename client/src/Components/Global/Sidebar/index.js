import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../Function/userInfo';

const Aside = styled.aside`
    display: flex;
    grid-area: side;
    position: fixed;
    float: left;
    width: 112px;
    height: 70%;
    border-right: double 3px #eeeeee;
    top: 100px;
    bottom: 0;
    > ul li {
        display: block;
        width: 80px;
        margin-bottom: 20px;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    text-decoration: none;
    color: gray;
    font-size: 0.8em;
    padding: 10px;
    border-radius: 7px;

    &:hover {
        background-color: #f0f0f0;
        transform: scale(1.1);
    }
    margin: 10px 10px 0 10px;

    &.select {
        background-color: #f48225;
        color: white;
    }
`;

// 호버 시 회색으로 백그라운드 색들어오게
// 현재 보고 있는 카테고리에 색깔 들어오게
// => useLocation 으로 현재 경로 가져오기
// => pathname 바뀔때마다 now 값 재할당
// => now 값 기준으로 삼항연산자

const Sidebar = () => {
    const location = useLocation();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const [now, setNow] = useState('/');
    useEffect(() => {
        setNow(location.pathname);
    }, [location.pathname]);
    return (
        <Aside>
            <ul>
                <li>
                    <StyledLink className={now === '/' ? 'select' : null} to="/">
                        Home
                    </StyledLink>
                </li>
                <li>
                    <StyledLink className={now === '/stock/top' ? 'select' : null} to="/stock/top">
                        Top 10
                    </StyledLink>
                </li>
                <li>
                    <StyledLink className={now === '/stock/List' ? 'select' : null} to="/stock/List">
                        전체 목록
                    </StyledLink>
                </li>
                <li>
                    <StyledLink className={now === '/stock/AddBookMarks' ? 'select' : null} to="/stock/AddBookMarks">
                        관심종목
                    </StyledLink>
                </li>
                <li>
                    <StyledLink className={now === '/AssetManagement' ? 'select' : null} to="/AssetManagement">
                        자산 관리
                    </StyledLink>
                </li>
                <li>
                    <StyledLink className={now.split('/')[1] === 'users' ? 'select' : null} to={`/users/${memberId}`}>
                        마이페이지
                    </StyledLink>
                </li>
                <li>
                    <StyledLink className={now.split('/')[1] === 'board' ? 'select' : null} to="/board">
                        게시판
                    </StyledLink>
                </li>
            </ul>
        </Aside>
    );
};

export default Sidebar;
