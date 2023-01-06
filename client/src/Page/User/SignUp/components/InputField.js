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
const InputField = ({ label, value, isValid, setValue, setIsValid }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    setIsValid(validateInput(label, value));
  }, [value]);

  const handleChange = (event) => {
    setCount((prevCount) => prevCount + 1);
    setValue(event.target.value);
  };

  const getPlaceholderText = () => {
    return `${label}${label === "아이디" ? "를" : "을"} 입력해주세요.`;
  };

  const getWarningText = () => {
    return label === "이메일" ? "이메일 형식에 맞게 입력해주세요." : "5~16글자 사이 영문이나 숫자를 입력해주세요.";
  };

  return (
    <Container>
      <Label htmlFor={`${label}`}>{label}</Label>
      <Input
        type="text"
        id={`${label}`}
        value={value}
        isValid={isValid}
        placeholder={getPlaceholderText()}
        onChange={handleChange}
      />
      {isValid === false && <Warning>{getWarningText()}</Warning>}
    </Container>
  );
};

export default InputField;
