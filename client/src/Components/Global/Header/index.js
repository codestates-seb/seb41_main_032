import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search/index';
import Clock from './Clock';
import clearStorage from '../../Function/clearStorage';
import { ReactComponent as HomeLogo } from '../../Img/homelogo.svg';
import { ReactComponent as Glass } from '../../Img/glass.svg';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../Function/userInfo';
import notify from '../../Function/notify';
import { useMember } from '../../API/ReactQueryContainer';
// 헤더 기본 구조
// 로고 / 검색창 / 시계 / 로그인버튼

const Main = styled.header`
    display: grid;
    grid-area: header;
    position: fixed;
    z-index: 100;
    background-color: white;
    grid-template-columns: 250px 1fr 250px;
    width: 100%;
    height: 63px;
    top: 0px;
    .icon {
        margin-top: 10px;
        margin-left: 30px;
    }
    .search {
        display: flex;
        flex-direction: row;
        justify-content: center;

        > div {
            display: flex;
        }
    }
    .logo {
        display: flex;
        flex-direction: row;
    }
    .sicon {
        &:hover {
            fill: #113cfc;
        }
    }
    .name {
        font-weight: 800;
        margin: 20px auto auto 8px;
    }
`;

const LogDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    a {
        text-decoration: none;
    }
    p {
        font-size: 1em;
        color: #000;
        font-weight: 600;
        margin-right: 10px;
    }
    button {
        height: auto;
        padding: 10px 20px;
        border-radius: 10px;
        border: 1px solid gray;
        margin-right: 20px;
        cursor: pointer;
        :hover {
            transform: scale(1.1);
        }
    }
    .user {
        margin: 15px auto auto 40px;
        &:hover {
            fill: #113cfc;
        }
    }
`;

const Header = () => {
    const navigate = useNavigate();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const memberInfo = useMember();
    const handlerLogout = () => {
        clearStorage();
        setMemberId(null);
        notify(`${memberInfo.username}님 다음에 만나요!`, 'info');
        navigate('/stock/top');
    };
    return (
        <Main>
            <div className="logo">
                <Link to="/">
                    <HomeLogo className="icon" width="40" fill="#113CFC" />
                </Link>
                <div className="name">시가총액32조</div>
            </div>
            <div className="search">
                <div>
                    <Search />
                    <Glass className="sicon" width="20" height="60" />
                    <Clock />
                </div>
            </div>
            <LogDiv>
                {memberId && memberInfo ? (
                    <>
                        <button onClick={handlerLogout}>로그아웃</button>
                        <Link to={`/users/${memberId}`}>
                            <p>{`${memberInfo.username}님`}</p>
                        </Link>
                    </>
                ) : (
                    <Link to="/login">
                        <button>로그인</button>
                    </Link>
                )}
            </LogDiv>
        </Main>
    );
};

export default Header;
