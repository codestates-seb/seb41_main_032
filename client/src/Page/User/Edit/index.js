import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../../../Components/Style/User/Title";
import WhiteButton from "../../../Components/Style/User/WhiteButton";
import DeleteButton from "./components/DeleteButton";
import Form from "./components/Form";
import PasswordCheck from "./components/PasswordCheck";

const Container = styled.main`
  width: 360px;
  min-height: calc(100vh - 400px);
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

const CancelButton = styled(WhiteButton)`
  margin: 0;
`;

// 회원정보 수정 페이지
const EditProfile = () => {
  // TODO: navigate 경로 `/users/${id}`로 수정
  const [passwordCheck, setPasswordCheck] = useState(false);

  const navigate = useNavigate();

  return (
    <Container>
      <Title>회원정보 수정</Title>
      {!passwordCheck && <PasswordCheck setPasswordCheck={setPasswordCheck} />}
      {passwordCheck && <Form />}
      <CancelButton onClick={() => navigate(-1)}>취소</CancelButton>
      {passwordCheck && <DeleteButton />}
    </Container>
  );
};

export default EditProfile;
