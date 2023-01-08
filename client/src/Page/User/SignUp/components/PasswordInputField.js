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
  user,
  isValidInput,
  passwordCheck,
  isValidPasswordCheck,
  setUser,
  setIsValidInput,
  setPasswordCheck,
  setIsValidPasswordCheck,
}) => {
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [isPasswordCheckEntered, setIsPasswordCheckEntered] = useState(false);

  useEffect(() => {
    if (!isPasswordEntered && !isPasswordCheckEntered) return;
    if (isPasswordEntered) setIsValidInput({ ...isValidInput, password: validateInput("password", user.password) });
    if (isPasswordCheckEntered) setIsValidPasswordCheck(user.password === passwordCheck);
  }, [user.password, passwordCheck]);

  const handlePasswordChange = (event) => {
    if (!isPasswordEntered) setIsPasswordEntered(true);
    setUser({ ...user, password: event.target.value });
  };

  const handlePasswordCheckChange = (event) => {
    if (!isPasswordCheckEntered) setIsPasswordCheckEntered(true);
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
        value={user.password}
        isValid={isValidInput.password}
        onChange={handlePasswordChange}
      />
      {isValidInput.password === false && <Warning>8~20글자 사이 영문이나 숫자를 입력해주세요.</Warning>}
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
