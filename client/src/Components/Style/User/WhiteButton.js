import styled from "styled-components";
import BlueButton from "./BlueButton";

// 회원가입, 로그인 등에 사용되는 흰색 버튼
const WhiteButton = styled(BlueButton)`
  width: 100%;
  color: #006eff;
  border: 1px solid #006eff;
  background-color: #fefefe;

  :hover {
    background-color: #e5f0ff;
  }
`;

export default WhiteButton;
