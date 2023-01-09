import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../../Components/Style/User/Button";
import Horizon from "../../../../Components/Style/User/Horizon";

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

const GoSignUpButton = styled(Button)`
  width: 100%;
  color: #006eff;
  border: 1px solid #006eff;
  background-color: #fefefe;

  :hover {
    background-color: #e5f0ff;
  }
`;

// 버튼을 클릭하면 회원가입 페이지로 이동하는 영역
const GoSignUp = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Horizon />
      <Subtitle>아직 회원이 아니신가요?</Subtitle>
      <GoSignUpButton onClick={() => navigate("/sign-up")}>회원가입 하기</GoSignUpButton>
    </Container>
  );
};

export default GoSignUp;
