import { useState } from "react";
import styled from "styled-components";
import BlueButton from "../../../../Components/Style/User/BlueButton";
import InputField from "./InputField";
import OptionField from "./OptionField";

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
`;

// 로그인 서식
const Form = () => {
  const [user, setUser] = useState({
    userId: "",
    password: "",
    keepLogin: false,
  });
  const [isValidInput, setIsValidInput] = useState({
    userId: null,
    password: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    requestLogin();
  };

  const requestLogin = () => {
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

  const inputFieldProps = { user, isValidInput, setUser, setIsValidInput };
  const optionFieldProps = { user, setUser };
  const shouldDisableButton = !isValidInput.userId || !isValidInput.password;

  return (
    <Container onSubmit={handleSubmit}>
      <InputField {...inputFieldProps} />
      <BlueButton type="submit" disabled={shouldDisableButton}>
        로그인
      </BlueButton>
      <OptionField {...optionFieldProps} />
    </Container>
  );
};

export default Form;
