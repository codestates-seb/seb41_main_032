import { useEffect, useState } from "react";
import styled from "styled-components";
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
  const [user, setUser] = useState({
    userId: "",
    password: "",
    nickname: "",
    email: "",
  });
  const [isValidInput, setIsValidInput] = useState({
    password: null,
    nickname: true,
    email: true,
  });
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    // TODO: 유저 정보 가져오는 로직 수정
    const data = {
      userId: "aaaaa",
      nickname: "aaaaa",
      email: "a@a.a",
    };
    setUser({ ...user, ...data });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    requestEditProfile();
  };

  const requestEditProfile = () => {
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
    isValidInput.password &&
    isValidInput.nickname &&
    isValidInput.email &&
    isValidPasswordCheck
  );

  return (
    <Container onSubmit={handleSubmit}>
      <InputField id="userId" {...inputFieldProps} disabled />
      <PasswordInputField {...passwordInputFieldProps} />
      <InputField id="nickname" {...inputFieldProps} />
      <InputField id="email" {...inputFieldProps} />
      <BlueButton type="submit" disabled={shouldDisableButton}>
        수정하기
      </BlueButton>
    </Container>
  );
};

export default Form;
