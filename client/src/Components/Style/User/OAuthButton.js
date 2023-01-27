import styled from "styled-components";
import BlueButton from "./BlueButton";

// 회원가입, 로그인 등에 사용되는 OAuth 버튼
const OAuthButton = styled(BlueButton)`
  margin: 0;
  border: 1px solid #d1d1d1;
  color: #262626;
  background-color: #ffffff;
  font-weight: 500;

  :hover {
    color: #fefefe;
  }
`;

export default OAuthButton;
