import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getStorage from "../../../Components/Function/getStorage";
import Title from "../../../Components/Style/User/Title";
import Form from "./components/Form";
import GoSignUp from "./components/GoSignUp";
import OAuth from "./components/OAuth";

const Container = styled.main`
  width: 360px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  a {
    padding: 2px;
    color: #006eff;
    font-size: 12px;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

// 로그인 페이지
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const memberId = getStorage("memberId");
    if (memberId) navigate("/stock/top");
  }, []);

  return (
    <Container>
      <Title>로그인</Title>
      <Form />
      <OAuth />
      <GoSignUp />
    </Container>
  );
};

export default Login;
