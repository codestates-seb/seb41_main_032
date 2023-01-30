import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import notify from "../../../../Components/Function/notify";
import Subtitle from "../../../../Components/Style/User/Subtitle";
import WhiteButton from "../../../../Components/Style/User/WhiteButton";
import Bookmark from "./Bookmark";

const Container = styled.div`
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const AddButton = styled(WhiteButton)`
  width: 20px;
  height: 20px;
  margin: 0;
  color: #262626;
  border-color: #cccccc;

  :hover {
    border-color: #006eff;
  }
`;

const EmptyMessage = styled.p`
  color: #aaaaaa;
  font-size: 16px;
`;

// 즐겨찾기 영역
const Bookmarks = ({ memberId, isOwner }) => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = () => {
    const url = `${process.env.REACT_APP_API_URL}/bookmarks/member/${memberId}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((bookmarks) => setBookmarks(bookmarks))
      .catch((error) => notify(`북마크 조회 실패 (error code: ${error.status})`, "error"));
  };

  return (
    <Container>
      <Subtitle>즐겨찾기</Subtitle>
      <Contents>
        {bookmarks.length > 0
          ? bookmarks.map((bookmark) => <Bookmark key={bookmark.bookmarkId} {...bookmark} isOwner={isOwner} />)
          : !isOwner && <EmptyMessage>없음</EmptyMessage>}
        {isOwner && <AddButton onClick={() => navigate("/stock/AddBookMarks")}>+</AddButton>}
      </Contents>
    </Container>
  );
};

export default Bookmarks;
