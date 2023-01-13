import { useEffect, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
  width: auto;
  height: auto;
  padding: 15px;
  font-size: 1.2em;
  font-family: "Oswald";
`;

const Clock = () => {
  const [date, setDate] = useState(new Date());
  // date 의 초기값은 현재 시각
  const setClock = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timer = setInterval(setClock, 1000);
    return function clearTimer() {
      clearInterval(timer);
    };
  }, []);

  return (
    <Div>
      {date.toLocaleTimeString("ko-KR", { timeStyle: "medium", hour12: false })}
    </Div>
  );
};

export default Clock;
