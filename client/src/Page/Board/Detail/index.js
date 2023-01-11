import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const Div = styled.div`
  display: flex;
  height: auto;
  min-height: 100%;
  flex-direction: column;
  margin: 30px 50px;
  padding: 50px 50px;
  border-radius: 10px;
  border: solid 3px #eff5f5;
  .title {
    font-size: 1.3em;
    font-weight: bold;
  }
  .writer {
    color: #7c7c7c;
    font-size: 0.9em;
    border-bottom: solid 1px black;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
  .body {
    height: 100%;
    min-height: 300px;
  }
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  height: ${(props) => props.height};
`;

const Article = () => {
  const params = useParams();
  const [data, setData] = useState({});
  //TODO : 백엔드 작업에 따라 get 경로 변경
  const url = `https://jsonplaceholder.typicode.com/posts`;
  useEffect(() => {
    axios.get(`${url}/${params.num}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <Div>
      <Box className="title" height="30px">
        {data.title}
      </Box>
      <Box className="writer">Writer {data.userId}</Box>
      <Box className="body">{data.body}</Box>
    </Div>
  );
};

export default Article;
