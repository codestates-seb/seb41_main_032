import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import notify from "../../../../Components/Function/notify";
import BlueButton from "../../../../Components/Style/User/BlueButton";
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
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    nickname: "",
    email: "",
  });
  const [isValidInput, setIsValidInput] = useState({
    username: null,
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
    const url = `${process.env.REACT_APP_API_URL}/members`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(() => navigate("/login"))
      .catch((error) => notify("회원가입 실패", "error"));
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
    isValidInput.username &&
    isValidInput.password &&
    isValidInput.nickname &&
    isValidInput.email &&
    isValidPasswordCheck
  );

  return (
    <Container onSubmit={handleSubmit}>
      <InputField id="username" {...inputFieldProps} />
      <PasswordInputField {...passwordInputFieldProps} />
      <InputField id="nickname" {...inputFieldProps} />
      <InputField id="email" {...inputFieldProps} />
      <BlueButton type="submit" disabled={shouldDisableButton}>
        회원가입
      </BlueButton>
    </Container>
  );
};

export default Form;
