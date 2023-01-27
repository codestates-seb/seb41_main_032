import styled from "styled-components";
import OAuthButton from "../../../../Components/Style/User/OAuthButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

// OAuth로 로그인하는 버튼
const OAuth = () => {
  const handleGoogleClick = () => {};

  return (
    <Container>
      <OAuthButton google onClick={handleGoogleClick}>
        구글로 로그인
      </OAuthButton>
    </Container>
  );
};

export default OAuth;
