import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search/index';
import Clock from './Clock';
import clearStorage from '../../Function/clearStorage';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../Function/userInfo';
import notify from '../../Function/notify';
import { useMember } from '../../API/ReactQueryContainer';
import Logo from '../../Img/logo.png';
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
        font-weight: bold;
        margin: 20px auto auto 8px;
    }
`;

const LogDiv = styled.div`
    position: fixed;
    top: 10px;
    right: 10px;
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
            transition: 0.5s ease-in-out;
        }
    }
    .user {
        margin: 15px auto auto 40px;
        &:hover {
            fill: #113cfc;
        }
    }
`;

const StyledLink = styled(Link)`
    position: fixed;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    margin-left: 10px;
    img {
        width: 50px;
        height: 50px;
    }
    h1 {
        margin-left: 10px;
        color: #000000;
        font-size: 1.3em;
        font-weight: bold;
    }
`;

const Header = () => {
    const navigate = useNavigate();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const memberInfo = useMember();

    const handlerLogout = () => {
        clearStorage();
        setMemberId(null);
        notify(`${memberInfo.nickname}님 다음에 만나요!`, 'info');
        navigate('/stock/top');
    };
    return (
        <Main>
            <div className="logo">
                <StyledLink to="/stock/top">
                    <img src={Logo} alt="logo" />
                    <h1>STOCK BOX</h1>
                </StyledLink>
            </div>

            <div className="search">
                <div>
                    <Search />
                    <Clock />
                </div>
            </div>
            <LogDiv>
                {memberId && memberInfo ? (
                    <>
                        <button onClick={handlerLogout}>로그아웃</button>
                        <Link to={`/users/${memberId}`}>
                            <p>{`${memberInfo.nickname}님`}</p>
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
