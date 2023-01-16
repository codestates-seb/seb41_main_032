import styled from "styled-components";
import data from "../data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const List = styled.li`
  display: block;
  width: 500px;
  height: 30px;
  border: solid 1.5px #495464;
  border-top: none;
  border-radius: 3px;
  z-index: 100;
  background-color: white;
  font-size: 0.8em;
  padding: 5px 9px;
`;
const Autocomplete = ({ keyword }) => {
  const navigate = useNavigate();

  const [similar, setSimilar] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSimilar(data.filter((el) => el.itmsNm.includes(keyword)));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  return (
    <ul>
      {similar.map((el) => (
        <List
          key={el.srtnCd}
          onClick={() => {
            navigate(`/stock/${el.srtnCd} `, {
              state: { name: `${el.itmsNm}` },
            });
            setSimilar([]);
          }}
        >
          {el.itmsNm} Go
        </List>
      ))}
    </ul>
  );
};

export default Autocomplete;
