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
  gap: 6px;
`;

// 회원가입 페이지에서 아이디, 닉네임, 이메일 인풋 영역
const InputField = ({ keyName, user, isValidInput, setUser, setIsValidInput }) => {
  const value = user[keyName];
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (!isEntered) return;
    setIsValidInput({ ...isValidInput, [keyName]: validateInput(keyName, value) });
  }, [value]);

  const handleChange = (event) => {
    if (!isEntered) setIsEntered(true);
    setUser({ ...user, [keyName]: event.target.value });
  };

  const getLabel = () => {
    if (keyName === "userId") return "아이디";
    if (keyName === "nickname") return "닉네임";
    if (keyName === "email") return "이메일";
  };

  const getPlaceholderText = () => {
    if (keyName === "userId") return "아이디를 입력해주세요.";
    return `${getLabel()}을 입력해주세요.`;
  };

  const getWarningText = () => {
    if (keyName === "email") return "이메일 형식에 맞게 입력해주세요.";
    return "5~16글자 사이 영문이나 숫자를 입력해주세요.";
  };

  return (
    <Container>
      <Label htmlFor={keyName}>{getLabel()}</Label>
      <Input
        type="text"
        id={keyName}
        value={value}
        isValid={isValidInput[keyName]}
        placeholder={getPlaceholderText()}
        onChange={handleChange}
      />
      {isValidInput[keyName] === false && <Warning>{getWarningText()}</Warning>}
    </Container>
  );
};

export default InputField;
