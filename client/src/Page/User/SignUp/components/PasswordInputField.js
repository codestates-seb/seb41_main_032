import { useEffect, useState } from "react";
import styled from "styled-components";
import validateInput from "../../../../Components/Function/validateInput";
import Input from "../../../../Components/Style/User/Input";
import Label from "../../../../Components/Style/User/Label";
import Warning from "../../../../Components/Style/User/Warning";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PasswordLabel = styled(Label)`
  margin-bottom: 6px;
`;

// 회원가입 페이지에서 비밀번호 인풋 영역
const PasswordInputField = ({
  password,
  passwordCheck,
  isValidPassword,
  isValidPasswordCheck,
  setPassword,
  setPasswordCheck,
  setIsValidPassword,
  setIsValidPasswordCheck,
}) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    if (count1 === 0 && count2 === 0) return;
    if (count1 > 0) setIsValidPassword(validateInput("비밀번호", password));
    if (count2 > 0) setIsValidPasswordCheck(password === passwordCheck);
  }, [password, passwordCheck]);

  const handlePasswordChange = (event) => {
    if (count1 === 0) setCount1((prevState) => prevState + 1);
    setPassword(event.target.value);
  };

  const handlePasswordCheckChange = (event) => {
    if (count2 === 0) setCount2((prevState) => prevState + 1);
    setPasswordCheck(event.target.value);
  };

  return (
    <Container>
      <PasswordLabel htmlFor="password">비밀번호</PasswordLabel>
      <Input
        type="password"
        id="password"
        autoComplete="on"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        isValid={isValidPassword}
        onChange={handlePasswordChange}
      />
      {isValidPassword === false && <Warning>8~20글자 사이 영문이나 숫자를 입력해주세요.</Warning>}
      <Input
        type="password"
        id="passwordCheck"
        autoComplete="on"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        value={passwordCheck}
        isValid={isValidPasswordCheck}
        onChange={handlePasswordCheckChange}
      />
      {isValidPasswordCheck === false && <Warning>비밀번호가 일치하지 않습니다.</Warning>}
    </Container>
  );
};

export default PasswordInputField;
