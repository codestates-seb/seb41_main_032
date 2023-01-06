import styled from "styled-components";

// 회원가입, 로그인 등에 사용되는 인풋
const Input = styled.input`
  width: 100%;
  padding: 14px 12px;
  margin: 3px 0;
  border: 1px solid;
  border-color: ${(props) => (props.isValid ? "#6D7991" : "#d1d1d1")};
  border-radius: 5px;
  color: #616161;
  font-size: 14px;

  :focus {
    outline: none;
    border: 1px solid;
    border-color: ${(props) => (props.isValid === false ? "#f00001" : "#126fff")};
  }

  ::placeholder {
    color: #999999;
  }
`;

export default Input;
