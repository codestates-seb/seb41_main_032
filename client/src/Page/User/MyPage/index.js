import styled from "styled-components";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Stocks from "./components/Stocks";

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
  return (
    <Container>
      <Header />
      <Stocks />
      <Favorites />
      <Posts />
    </Container>
  );
};

export default MyPage;
