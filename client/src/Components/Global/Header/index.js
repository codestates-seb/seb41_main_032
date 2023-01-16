import styled from "styled-components";
import { Link } from "react-router-dom";

import Search from "./Search/index";
import Clock from "./Clock";
// 헤더 기본 구조
// 로고 / 검색창 / 로그인버튼
// 로그인 버튼 클릭시의 경로는 임시 설정

const Main = styled.header`
  display: grid;
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
  return (
    <Main>
      <div className="logo">
        <Link to="/">
          <svg
            className="icon"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="#113CFC"
              className="icon"
              d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164.1 160v6.3c6.6 1.2 16.6 3.2 21 4.4c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-3.8-1-17.4-3.7-21.7-4.3c-12.2-1.9-22.2-.3-28.6 2.6c-6.3 2.9-7.9 6.2-8.2 8.1c-.6 3.4 0 4.7 .1 5c.3 .5 1 1.8 3.6 3.5c6.1 4.2 15.7 7.2 29.9 11.4l.8 .2c12.1 3.7 28.3 8.5 40.4 17.4c6.7 4.9 13 11.4 16.9 20.5c4 9.1 4.8 19.1 3 29.4c-3.3 19-15.9 32-31.6 38.7c-4.9 2.1-10 3.6-15.4 4.6V352c0 11.1-9 20.1-20.1 20.1s-20.1-9-20.1-20.1v-6.4c-9.5-2.2-21.9-6.4-29.8-9.1c-1.7-.6-3.2-1.1-4.4-1.5c-10.5-3.5-16.1-14.8-12.7-25.3s14.8-16.1 25.3-12.7c2 .7 4.1 1.4 6.4 2.1l0 0 0 0c9.5 3.2 20.2 6.9 26.2 7.9c12.8 2 22.7 .7 28.8-1.9c5.5-2.3 7.4-5.3 8-8.8c.7-4 .1-5.9-.2-6.7c-.4-.9-1.3-2.2-3.7-4c-5.9-4.3-15.3-7.5-29.3-11.7l-2.2-.7c-11.7-3.5-27-8.1-38.6-16c-6.6-4.5-13.2-10.7-17.3-19.5c-4.2-9-5.2-18.8-3.4-29c3.2-18.3 16.2-30.9 31.1-37.7c5-2.3 10.3-4 15.9-5.1v-6c0-11.1 9-20.1 20.1-20.1s20.1 9 20.1 20.1z"
            />
          </svg>
        </Link>
        <div className="name">시가총액32조</div>
      </div>
      <div className="search">
        <div>
          <Search />
          <svg
            className="sicon"
            width="20"
            height="60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
          <Clock />
        </div>
      </div>
      <LogDiv>
        <Link to="/login">
          <svg
            className="user"
            height="30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              className="user"
              d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
            />
          </svg>
        </Link>
      </LogDiv>
    </Main>
  );
};

export default Header;
