import styled from "styled-components";
import Subtitle from "../../../../Components/Style/User/Subtitle";
import Post from "./Post";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

// 작성글 영역
const Posts = () => {
  const posts = [
    { id: 1, title: "제목1" },
    { id: 2, title: "제목2" },
  ];
  return (
    <Container>
      <Subtitle>작성글</Subtitle>
      <Contents>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Contents>
    </Container>
  );
};

export default Posts;
