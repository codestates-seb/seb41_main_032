import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Title from "../../../../Components/Style/User/Title";
import WhiteButton from "../../../../Components/Style/User/WhiteButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled(WhiteButton)`
  width: 100px;
  height: 30px;
  margin: 0;
  font-size: 12px;
`;

// 마이페이지 헤더
const Header = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>마이페이지</Title>
      <EditButton onClick={() => navigate(`/users/${id}/edit`)}>회원정보 수정</EditButton>
    </Container>
  );
};

export default Header;
