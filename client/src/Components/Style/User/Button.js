import styled from "styled-components";

// 회원가입, 로그인 등에 사용되는 버튼
const Button = styled.button`
  width: 100%;
  height: 46px;
  margin: 12px 0 0 0;
  border-radius: 5px;
  color: #fefefe;
  background-color: #006eff;
  font-size: 14px;
  transition: 0.2s;
  cursor: pointer;

  :hover {
    background-color: #0055cc;
  }

  :disabled {
    background-color: #b8d7ff;
    cursor: not-allowed;
  }
`;

export default Button;
