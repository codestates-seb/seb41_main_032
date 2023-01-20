import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import commaGenerator from "../../../../Components/Function/commaGenerator";

const Container = styled.div`
  width: 250px;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: #262626;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  transition: 0.2s;
  cursor: pointer;

  :hover {
    border: 1px solid #006eff;
    background-color: #e5f0ff;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4px;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Count = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 4px;
`;

const Balance = styled.span`
  font-weight: 600;
`;

const Profit = styled.span`
  font-size: 14px;
  color: #006eff;
`;

// 보유 주식 컴포넌트
const Stock = ({ name, number, count, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stock/${number}`, { state: { name: `${name}`, MarketCap: null } });
  };
  return (
    <Container onClick={handleClick}>
      <LeftSide>
        <Name>{name}</Name>
        <Count>{count}주</Count>
      </LeftSide>
      <RightSide>
        <Balance>{commaGenerator(price)}원</Balance>
        <Profit>-500,000원 (5.0%)</Profit>
      </RightSide>
    </Container>
  );
};

export default Stock;
