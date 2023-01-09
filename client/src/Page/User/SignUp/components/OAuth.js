import styled from "styled-components";
import Horizon from "../../../../Components/Style/User/Horizon";
import OAuthButton from "../../../../Components/Style/User/OAuthButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const MarginedHorizon = styled(Horizon)`
  margin: 26px 0;
`;

// OAuth로 회원가입하는 버튼
const OAuth = () => {
  // TODO: OAuth 확정되면 수정
  const handleKakaoClick = () => {};
  const handleGoogleClick = () => {};
  const handleFacebookClick = () => {};

  return (
    <Container>
      <OAuthButton kakao onClick={handleKakaoClick}>
        카카오로 회원가입
      </OAuthButton>
      <OAuthButton google onClick={handleGoogleClick}>
        구글로 회원가입
      </OAuthButton>
      <OAuthButton facebook onClick={handleFacebookClick}>
        페이스북으로 회원가입
      </OAuthButton>
      <MarginedHorizon />
    </Container>
  );
};

export default OAuth;
