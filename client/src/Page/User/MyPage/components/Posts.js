import { useEffect, useState } from "react";
import styled from "styled-components";
import notify from "../../../../Components/Function/notify";
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

const EmptyMessage = styled.p`
  color: #aaaaaa;
  font-size: 16px;
`;

// 작성글 영역
const Posts = ({ memberId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  });

  const fetchPosts = () => {
    const url = `${process.env.REACT_APP_API_URL}/boards/member/${memberId}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((posts) => setPosts(posts))
      .catch((error) => notify("작성글 조회 실패", "error"));
  };

  return (
    <Container>
      <Subtitle>작성글</Subtitle>
      <Contents>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.borderId} {...post} />)
        ) : (
          <EmptyMessage>없음</EmptyMessage>
        )}
      </Contents>
    </Container>
  );
};

export default Posts;
