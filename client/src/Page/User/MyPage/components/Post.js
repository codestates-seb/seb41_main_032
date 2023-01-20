import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 50%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  transition: 0.2s;
  cursor: pointer;

  :hover {
    border: 1px solid #006eff;
    background-color: #e5f0ff;
  }
`;

// 작성글 컴포넌트
const Post = ({ id, title }) => {
  const navigate = useNavigate();

  return <Container onClick={() => navigate(`/board/detail/${id}`)}>{title}</Container>;
};

export default Post;
