import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Horizon from "../../../../Components/Style/User/Horizon";
import WhiteButton from "../../../../Components/Style/User/WhiteButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled.p`
  margin: 24px 0 0 0;
  color: #424242;
  font-size: 12px;
  font-weight: 500;
`;

// 버튼을 클릭하면 회원가입 페이지로 이동하는 영역
const GoSignUp = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Horizon />
      <Subtitle>아직 회원이 아니신가요?</Subtitle>
      <WhiteButton onClick={() => navigate("/sign-up")}>회원가입 하기</WhiteButton>
    </Container>
  );
};

export default GoSignUp;
