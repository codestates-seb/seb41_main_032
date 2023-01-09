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
  // TODO: OAuth 확정되면 수정
  const handleKakaoClick = () => {};
  const handleGoogleClick = () => {};
  const handleFacebookClick = () => {};

  return (
    <Container>
      <OAuthButton kakao onClick={handleKakaoClick}>
        카카오로 로그인
      </OAuthButton>
      <OAuthButton google onClick={handleGoogleClick}>
        구글로 로그인
      </OAuthButton>
      <OAuthButton facebook onClick={handleFacebookClick}>
        페이스북으로 로그인
      </OAuthButton>
    </Container>
  );
};

export default OAuth;
