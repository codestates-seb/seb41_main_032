import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../../../../Components/API/ReactQueryContainer";
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
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isValidInput, setIsValidInput] = useState({
    username: null,
    password: null,
  });
  const [isLogin, setIsLogin] = useState(null);
  const [keepLogin, setKeepLogin] = useState(false);

  // 성공시 실행할 로직 - 이중원
  const success = (data) => {
    navigate("/stock/top");
  };

  // 실패시 실행할 로직 -이중원
  const error = (error) => {
    setIsLogin(false);
  };

  // React query (server status)
  const { mutate: tryLogin } = useLogin(user, keepLogin, success, error);

  const handleSubmit = (event) => {
    event.preventDefault();
    tryLogin();
  };

  const inputFieldProps = { user, isValidInput, isLogin, setUser, setIsValidInput };
  const optionFieldProps = { keepLogin, setKeepLogin };
  const shouldDisableButton = !isValidInput.username || !isValidInput.password;

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
