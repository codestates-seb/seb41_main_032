import { useState } from "react";
import styled from "styled-components";
import Button from "../../../../Components/Style/User/Button";
import InputField from "./InputField";
import PasswordInputField from "./PasswordInputField";

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
`;

// 회원가입 서식
const Form = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [isValidUserId, setIsValidUserId] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(null);
  const [isValidNickname, setIsValidNickname] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // requestSignUp();
  };

  const requestSignUp = async () => {
    // TODO: 서버 배포되면 로직 수정
    const url = `url`;
    const userData = {
      userId,
      password,
      nickname,
      email,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch(url, options);
    } catch (error) {
      console.log(error);
    }
  };

  const passwordInputFieldProps = {
    password,
    passwordCheck,
    isValidPassword,
    isValidPasswordCheck,
    setPassword,
    setPasswordCheck,
    setIsValidPassword,
    setIsValidPasswordCheck,
  };

  const isDisabled = !(isValidUserId && isValidPassword && isValidPasswordCheck && isValidNickname && isValidEmail);

  return (
    <Container onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        value={userId}
        isValid={isValidUserId}
        setValue={setUserId}
        setIsValid={setIsValidUserId}
      />
      <PasswordInputField {...passwordInputFieldProps} />
      <InputField
        label="닉네임"
        value={nickname}
        isValid={isValidNickname}
        setValue={setNickname}
        setIsValid={setIsValidNickname}
      />
      <InputField
        label="이메일"
        value={email}
        isValid={isValidEmail}
        setValue={setEmail}
        setIsValid={setIsValidEmail}
      />
      <Button type="submit" disabled={isDisabled}>
        회원가입
      </Button>
    </Container>
  );
};

export default Form;
