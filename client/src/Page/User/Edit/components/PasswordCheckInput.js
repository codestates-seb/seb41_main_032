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
  margin-bottom: 12px;
`;

// 본인 확인용 비밀번호 인풋 영역
const PasswordCheckInput = ({ user, isValidPassword, setUser, setIsValidPassword }) => {
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);

  useEffect(() => {
    if (!isPasswordEntered) return;
    setIsValidPassword(validateInput("password", user.password));
  }, [user.password]);

  const handleChange = ({ target }) => {
    if (!isPasswordEntered) setIsPasswordEntered(true);
    setUser({ ...user, password: target.value });
  };

  return (
    <Container>
      <PasswordLabel htmlFor="password">본인 확인을 위해 비밀번호를 입력해주세요.</PasswordLabel>
      <Input
        type="password"
        id="password"
        autoComplete="on"
        placeholder="비밀번호를 입력해주세요."
        value={user.password}
        isValid={isValidPassword}
        onChange={handleChange}
      />
      {isValidPassword === false && <Warning>8~20글자 사이 영문이나 숫자를 입력해주세요.</Warning>}
    </Container>
  );
};

export default PasswordCheckInput;
