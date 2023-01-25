import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getStorage from "../../../../Components/Function/getStorage";
import LoadingPage from "../../../../Components/Style/LoadingPage";
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

// 회원정보 수정 서식
const Form = () => {
  const navigate = useNavigate();
  const memberId = getStorage("memberId");
  const [user, setUser] = useState(null);
  const [isValidInput, setIsValidInput] = useState({
    password: null,
    nickname: true,
    email: true,
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const url = `${process.env.REACT_APP_API_URL}/members/${memberId}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    requestEditProfile();
  };

  const requestEditProfile = () => {
    const { username, password, nickname, email } = user;
    const newData = { username, password, nickname, email };
    const url = `${process.env.REACT_APP_API_URL}/members/${memberId}`;
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => navigate(`/users/${memberId}`))
      .catch((error) => console.log(error));
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
    isValidInput.password &&
    isValidInput.nickname &&
    isValidInput.email &&
    isValidPasswordCheck
  );

  return (
    <Container onSubmit={handleSubmit}>
      {user ? (
        <>
          <InputField id="username" {...inputFieldProps} disabled />
          <PasswordInputField {...passwordInputFieldProps} />
          <InputField id="nickname" {...inputFieldProps} />
          <InputField id="email" {...inputFieldProps} />
          <BlueButton type="submit" disabled={shouldDisableButton}>
            수정하기
          </BlueButton>
        </>
      ) : (
        <LoadingPage />
      )}
    </Container>
  );
};

export default Form;
