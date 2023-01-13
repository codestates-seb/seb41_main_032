import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Main = styled.aside`
  float: left;
  width: 115px;
  border-right: double 3px #eeeeee;

  position: fixed;
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
  width: 90px;
  text-decoration: none;
  color: gray;
  font-size: 0.8em;
  padding: 10px;
  border-radius: 7px;
  &:hover {
    background-color: #f0f0f0;
  }
  margin: 10px 10px 0 10px;
  background-color: ${(props) => props.bgcolor};
`;

// 호버 시 회색으로 백그라운드 색들어오게
// 현재 보고 있는 카테고리에 색깔 들어오게
// => useLocation 으로 현재 경로 가져오기
// => pathname 바뀔때마다 now 값 재할당
// => now 값 기준으로 삼항연산자

const Sidebar = () => {
  const location = useLocation();
  const [now, setNow] = useState("/");
  useEffect(() => {
    setNow(location.pathname);
  }, [location.pathname]);
  return (
    <Main>
      <ul>
        <li>
          <StyledLink bgcolor={now === "/" ? "orange" : "white"} to="/">
            Home
          </StyledLink>
        </li>
        <li>
          <StyledLink
            bgcolor={now === "/board" ? "orange" : "white"}
            to="/board"
          >
            게시판
          </StyledLink>
        </li>
        <li>
          <StyledLink>Mypage</StyledLink>
        </li>
      </ul>
    </Main>
  );
};

export default Sidebar;
