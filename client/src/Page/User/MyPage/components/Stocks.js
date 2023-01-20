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
const Stocks = () => {
  const stocks = [
    {
      name: "삼성전자",
      number: "005930",
      count: 12,
      price: "2000000",
    },
    {
      name: "카카오",
      number: "035720",
      count: 12,
      price: "2000000",
    },
    {
      name: "NAVER",
      number: "035420",
      count: 12,
      price: "2000000",
    },
    {
      name: "SK하이닉스",
      number: "000660",
      count: 12,
      price: "2000000",
    },
  ];

  const sum = commaGenerator(stocks.reduce((acc, cur) => acc + Number(cur.price), 0));

  return (
    <Container>
      <Subtitle>보유 주식</Subtitle>
      <Price>
        <Balance>{sum}원</Balance>
        <Profit>-2,000,000원 (20.0%)</Profit>
      </Price>
      <StockContent>
        {stocks.map((stock) => (
          <Stock key={stock.number} {...stock} />
        ))}
      </StockContent>
    </Container>
  );
};

export default Stocks;
