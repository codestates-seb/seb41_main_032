import styled from "styled-components";
import loadingImg from "../Img/loading.gif";

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    width: 50px;
    height: 50px;
  }
`;

const LoadingPage = () => {
  return (
    <Container>
      <img src={loadingImg} alt="Loading..." />
    </Container>
  );
};

export default LoadingPage;
