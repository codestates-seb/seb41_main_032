import { Link } from "react-router-dom";
import styled from "styled-components";
import Title from "../../../Components/Style/User/Title";
import Form from "./components/Form";

const Container = styled.main`
  width: 360px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    padding: 2px;
    margin-bottom: 26px;
    color: #006eff;
    font-size: 12px;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

// 회원가입 페이지
const SignUp = () => {
  return (
    <Container>
      <Title>회원가입</Title>
      <Link to="/login">이미 계정이 있으신가요?</Link>
      <Form />
    </Container>
  );
};

export default SignUp;
