import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import getStorage from "../../../Components/Function/getStorage";
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
  const navigate = useNavigate();
  const { id } = useParams();
  const memberId = getStorage("memberId");
  const [passwordCheck, setPasswordCheck] = useState(null);

  useEffect(() => {
    if (id !== memberId) navigate(`/users/${memberId}/edit`);
  }, []);

  return (
    <Container>
      <Title>회원정보 수정</Title>
      {!passwordCheck && <PasswordCheck passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck} />}
      {passwordCheck && <Form />}
      <CancelButton onClick={() => navigate(`/users/${memberId}`)}>취소</CancelButton>
      {passwordCheck && <DeleteButton memberId={memberId} />}
    </Container>
  );
};

export default EditProfile;
