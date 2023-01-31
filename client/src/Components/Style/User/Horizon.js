import styled from "styled-components";

// 회원가입, 로그인 등에 사용되는 구분선
const Horizon = styled.hr`
  width: 100%;
  height: 0;
  border: 1px solid #e1e1e1;
  text-align: center;
  overflow: visible;

  :after {
    content: "or";
    position: relative;
    top: -10px;
    padding: 0 2px;
    color: #d1d1d1;
    background: #ffffff;
  }
`;

export default Horizon;
