import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRemoveBookMarks } from "../../../../Components/API/ReactQueryContainer";
import StarIcon from "../../../../Components/Style/StarIcon";

const Container = styled.div`
  padding: 1px 5px 1px 3px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;

  :hover {
    border: 1px solid #006eff;
    background-color: #e5f0ff;
  }
`;

const Icon = styled.div``;

const Name = styled.span`
  font-size: 14px;
`;

// 즐겨찾기 컴포넌트
const Bookmark = ({ bookmarkId, stockName, stockCode, isOwner }) => {
  const navigate = useNavigate();
  const { mutate: removeBookMarks } = useRemoveBookMarks();

  const handleBookmarkClick = () => {
    navigate(`/stock/${stockCode}`, { state: { stockName: `${stockName}` } });
  };

  const handleIconClick = (event) => {
    if (!isOwner) return;
    event.stopPropagation();
    removeBookMarks(bookmarkId);
  };

  return (
    <Container onClick={handleBookmarkClick}>
      <Icon onClick={handleIconClick}>{StarIcon}</Icon>
      <Name>{stockName}</Name>
    </Container>
  );
};

export default Bookmark;
