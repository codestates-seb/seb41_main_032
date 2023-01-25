import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    requestLogin();
  };

  const requestLogin = () => {
    const url = `${process.env.REACT_APP_API_URL}/user/login`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          setIsLogin(true);
          if (keepLogin) {
            localStorage.setItem("memberId", "2"); // FIXME: 임시 저장
            localStorage.setItem("username", user.username);
            localStorage.setItem("authorization", response.headers.get("authorization"));
            localStorage.setItem("refresh", response.headers.get("refresh"));
          } else {
            sessionStorage.setItem("memberId", "2"); // FIXME: 임시 저장
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("authorization", response.headers.get("authorization"));
            sessionStorage.setItem("refresh", response.headers.get("refresh"));
          }
          navigate("/stock/top");
        } else {
          setIsLogin(false);
          throw response;
        }
      })
      .catch((error) => console.log(error));
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
