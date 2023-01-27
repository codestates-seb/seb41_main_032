import styled from "styled-components";
import Title from "../../../../Components/Style/User/Title";
import DeleteButton from "./DeleteButton";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

// 마이페이지 헤더
const Header = ({ username, isOwner }) => {
  return (
    <Container>
      <Title>{username}</Title>
      {isOwner && <DeleteButton />}
    </Container>
  );
};

export default Header;
