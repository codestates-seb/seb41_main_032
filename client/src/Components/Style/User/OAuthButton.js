import styled from "styled-components";
import Button from "./Button";

// 회원가입, 로그인 등에 사용되는 OAuth 버튼
const OAuthButton = styled(Button)`
  margin: 0;
  border: 1px solid #d1d1d1;
  color: #262626;
  background-color: #ffffff;
  font-weight: 500;
  // TODO: OAuth 정해지면 스타일 추가
`;

export default OAuthButton;
