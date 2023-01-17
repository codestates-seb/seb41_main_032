// 헤더 검색창 기능 구현
// 코드 srtnCd, 이름 itmsNm

import Autocomplete from "./Autocomplete";
import styled from "styled-components";
import { useState } from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  > .box {
    display: flex;
    flex-direction: row;
    display: flex;
    width: 500px;
    height: 30px;
    border: solid 1.5px #495464;
    border-radius: 3px;
    margin: 15px 10px 0 0;
    padding-left: 9px;
  }
  & button {
    background-color: white;
    &:hover {
      color: blue;
    }
  }
`;

const Input = styled.input`
  width: 450px;
  &:focus {
    outline: none;
  }
`;

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [focus, setFocus] = useState(false);
  return (
    <Div
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
    >
      <div className="box">
        <Input
          placeholder="어떤 종목이 궁금하세요?"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        ></Input>
        <button onClick={() => setKeyword("")}>⌫</button>
      </div>
      {keyword.length && focus ? (
        <Autocomplete keyword={keyword} setKeyword={setKeyword} />
      ) : (
        <></>
      )}
    </Div>
  );
};
export default Search;
