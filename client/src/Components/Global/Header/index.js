import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMember } from "../../API/ReactQueryContainer";
import Search from "./Search/index";
import Clock from "./Clock";
import { useRecoilState } from "recoil";
import { userInfo } from "../../Function/userInfo";
import { ReactComponent as HomeLogo } from "../../Img/homelogo.svg";
import { ReactComponent as Glass } from "../../Img/glass.svg";
import { ReactComponent as LogoutLogo } from "../../Img/logouticon.svg";
import { ReactComponent as LoginLogo } from "../../Img/loginicon.svg";
// 헤더 기본 구조
// 로고 / 검색창 / 시계 / 로그인버튼

const Main = styled.header`
  display: grid;
  grid-area: header;
  position: fixed;
  z-index: 100;
  background-color: white;
  grid-template-columns: 180px 1fr 110px;
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
  .user {
    margin: 15px auto auto 40px;
    &:hover {
      fill: #113cfc;
    }
  }
`;

const Header = () => {
  const memberInfo = useMember();
  // console.log('🚀  memberInfo', memberInfo); => 로그인한 유저정보
  //TODO: memberInfo에 데이터가 있을때는 로그인을 한 상태입니다
  //TODO: logout 핸들러
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
        {memberInfo ? (
          <LogoutLogo onClick={() => console.log("logout")} />
        ) : (
          <Link to="/login">
            <LoginLogo className="user" height="30" />
          </Link>
        )}
      </LogDiv>
    </Main>
  );
};

export default Header;
