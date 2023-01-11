import { useState } from "react";
import styled from "styled-components";
import Button from "../../../../Components/Style/User/BlueButton";
import PasswordCheckInput from "./PasswordCheckInput";

const Container = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 본인 확인 영역
const PasswordCheck = ({ setPasswordCheck }) => {
  const [user, setUser] = useState({
    userId: "DUMMY",
    password: "",
  });
  const [isValidPassword, setIsValidPassword] = useState(null);

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

  const inputFieldProps = { user, isValidPassword, setUser, setIsValidPassword };

  return (
    <Container onSubmit={handleSubmit}>
      <PasswordCheckInput {...inputFieldProps} />
      <Button type="submit" disabled={!isValidPassword}>
        확인
      </Button>
    </Container>
  );
};

export default PasswordCheck;
