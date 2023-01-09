import styled from "styled-components";
import { Link } from "react-router-dom";

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
  &:hover {
    border-radius: 7px;
    background-color: #f0f0f0;
  }
  margin: 10px 10px 0 10px;
`;

const Sidebar = () => {
  return (
    <Main>
      <ul>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink>게시판</StyledLink>
        </li>
        <li>
          <StyledLink>Mypage</StyledLink>
        </li>
      </ul>
    </Main>
  );
};

export default Sidebar;
