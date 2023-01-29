import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMember } from "../../../Components/API/ReactQueryContainer";
import Article from "./Article";
import notify from "../../../Components/Function/notify";
const Div = styled.div`
  min-height: 100%;
  padding: 30px 50px;
  .top {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  span {
    font-size: 0.7em;
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
  const memberInfo = useMember();
  const url = `${process.env.REACT_APP_API_URL}/boards`;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        notify("조회 실패(잠시 후 다시 시도해주세요)", "error");
      });
  }, []);

  return (
    <Div>
      <div className="top">
        <h2> 게시판</h2>
        {memberInfo ? (
          <NewArticle to="/board/new">새 글 작성</NewArticle>
        ) : (
          <NewArticle
            onClick={() => notify("로그인 후 작성 가능합니다", "warning")}
          >
            새 글 작성
          </NewArticle>
        )}
      </div>
      <div className="listcontainer">
        <Article article={data} />
      </div>
    </Div>
  );
};

export default Board;
