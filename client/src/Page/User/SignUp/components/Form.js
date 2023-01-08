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
  const [user, setUser] = useState({
    userId: "",
    password: "",
    nickname: "",
    email: "",
  });
  const [isValidInput, setIsValidInput] = useState({
    userId: null,
    password: null,
    nickname: null,
    email: null,
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    requestSignUp();
  };

  const requestSignUp = () => {
    // TODO: 서버 배포되면 로직 수정
    // const url = `url`;
    // const options = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(user),
    // };
    // fetch(url, options)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  };

  const inputFieldProps = {
    user,
    isValidInput,
    setUser,
    setIsValidInput,
  };
  const passwordInputFieldProps = {
    user,
    isValidInput,
    passwordCheck,
    isValidPasswordCheck,
    setUser,
    setIsValidInput,
    setPasswordCheck,
    setIsValidPasswordCheck,
  };
  const shouldDisableButton = !(
    isValidInput.userId &&
    isValidInput.password &&
    isValidInput.nickname &&
    isValidInput.email &&
    isValidPasswordCheck
  );

  return (
    <Container onSubmit={handleSubmit}>
      <InputField id="userId" {...inputFieldProps} />
      <PasswordInputField {...passwordInputFieldProps} />
      <InputField id="nickname" {...inputFieldProps} />
      <InputField id="email" {...inputFieldProps} />
      <Button type="submit" disabled={shouldDisableButton}>
        회원가입
      </Button>
    </Container>
  );
};

export default Form;
