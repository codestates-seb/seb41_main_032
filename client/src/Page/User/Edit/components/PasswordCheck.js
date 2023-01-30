import { useState } from "react";
import styled from "styled-components";
import getStorage from "../../../../Components/Function/getStorage";
import notify from "../../../../Components/Function/notify";
import Button from "../../../../Components/Style/User/BlueButton";
import Warning from "../../../../Components/Style/User/Warning";
import PasswordCheckInput from "./PasswordCheckInput";

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

// 본인 확인 영역
const PasswordCheck = ({ passwordCheck, setPasswordCheck }) => {
  const [user, setUser] = useState({
    username: `${getStorage("username")}`,
    password: "",
  });
  const [isValidPassword, setIsValidPassword] = useState(null);

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
          setPasswordCheck(true);
        } else {
          setPasswordCheck(false);
          throw response;
        }
      })
      .catch((error) => notify(`회원정보 조회 실패 (error code: ${error.status})`, "error"));
  };

  const inputFieldProps = { user, isValidPassword, setUser, setIsValidPassword, setPasswordCheck };

  return (
    <Container onSubmit={handleSubmit}>
      <PasswordCheckInput {...inputFieldProps} />
      {passwordCheck === false && <Warning>비밀번호를 확인해주세요.</Warning>}
      <Button type="submit" disabled={!isValidPassword}>
        확인
      </Button>
    </Container>
  );
};

export default PasswordCheck;
