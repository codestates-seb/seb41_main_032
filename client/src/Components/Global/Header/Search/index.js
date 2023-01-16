// 헤더 검색창 기능 구현
// 코드 srtnCd, 이름 itmsNm

import Autocomplete from "./Autocomplete";
import styled from "styled-components";
import { useState } from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  display: flex;
  width: 500px;
  height: 30px;
  border: solid 1.5px #495464;
  border-radius: 3px;
  margin: 15px 10px 0 0;
  padding-left: 9px;
`;

const Search = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <Div>
      <Input
        placeholder="어떤 종목이 궁금하세요?"
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
      ></Input>
      {keyword.length ? <Autocomplete keyword={keyword} /> : <></>}
    </Div>
  );
};
export default Search;
