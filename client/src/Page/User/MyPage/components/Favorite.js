import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StarIcon from "../../../../Components/Style/StarIcon";

const Container = styled.div`
  padding: 1px 5px 1px 3px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;

  :hover {
    border: 1px solid #006eff;
    background-color: #e5f0ff;
  }
`;

const Icon = styled.div``;

const Name = styled.span`
  font-size: 14px;
`;

// 즐겨찾기 컴포넌트
const Favorite = ({ name, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stock/${number}`, { state: { name: `${name}`, MarketCap: null } });
  };

  return (
    <Container onClick={handleClick}>
      <Icon>{StarIcon}</Icon>
      <Name>{name}</Name>
    </Container>
  );
};

export default Favorite;
