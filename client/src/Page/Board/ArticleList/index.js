import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import Article from "./Article";

// 게시판의 글 목록 조회 페이지 입니다. 각 목록은 ArticleThumbnail

const Div = styled.div`
  min-height: 100%;
  padding: 30px 50px;
  .top {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const NewArticle = styled(Link)`
  width: 90px;
  height: 35px;
  text-align: center;
  padding-top: 7px;
  text-decoration: none;
  color: white;
  background-color: black;
  border-radius: 10px;
  &:hover {
    background-color: blue;
  }
`;

const Board = () => {
  //  const url = `${process.env.REACT_APP_API_URL}/board`;
  const url = "https://jsonplaceholder.typicode.com/posts";
  // 현재 보고 있는 페이지의 데이터
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Div>
      <div className="top">
        <h2> 게시판</h2>
        <NewArticle to="/board/new">새 글 작성</NewArticle>
      </div>
      <div className="listcontainer">
        <Article article={data} />
      </div>
    </Div>
  );
};

export default Board;
