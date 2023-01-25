import { useEffect, useState } from "react";
import styled from "styled-components";
import commaGenerator from "../../../../Components/Function/commaGenerator";
import Subtitle from "../../../../Components/Style/User/Subtitle";
import Stock from "./Stock";

const Container = styled.div`
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
`;

const Balance = styled.p`
  color: #262626;
  font-size: 28px;
  font-weight: 700;
`;

const Profit = styled.p`
  color: #006eff;
  font-size: 16px;
  font-weight: 500px;
`;

const StockContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

// 보유 주식 영역
const Stocks = ({ stocks = [] }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (stocks.length === 0 || !stocks) return;
    const sum = stocks.reduce((acc, cur) => acc + Number(cur.price), 0);
    setBalance(commaGenerator(sum));
  }, []);

  return (
    <Container>
      <Subtitle>보유 주식</Subtitle>
      <Price>
        <Balance>{balance}원</Balance>
        {/* <Profit>-2,000,000원 (20.0%)</Profit> */}
      </Price>
      {stocks.length > 0 && (
        <StockContent>
          {stocks.map((stock) => (
            <Stock key={stock.number} {...stock} />
          ))}
        </StockContent>
      )}
    </Container>
  );
};

export default Stocks;
