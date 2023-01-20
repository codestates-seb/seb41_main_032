import styled from "styled-components";
import { Link } from "react-router-dom";
import usePagination from "../../../Components/Hook/usePagination";
import { PageBtn, PageList } from "../../../Components/Style/PageBtn";
import { useEffect } from "react";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 80%;
  height: 120px;
  border-radius: 10px;
  border: solid 3px #eff5f5;
  margin: 30px auto 30px 0;
  padding: 20px 30px;

  .writer {
    font-size: 0.9em;
    color: #7c7c7c;
    margin-top: 5px;
  }
  p {
    font-size: 0.9em;
    margin-top: 10px;
  }
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
`;

const Article = ({ article }) => {
  const [
    currentItems,
    currentPage,
    setCurrentPage,
    pages,
    renderPageNumbers,
    handlePrevBtn,
    handleNextBtn,
    data,
    setData,
  ] = usePagination(article);
  useEffect(() => {
    setData(article);
    setCurrentPage(1);
  }, [article]);

  return (
    <>
      <Div>
        {currentItems.map((el, index) => (
          <li key={index}>
            <StyledLink to={`/board/detail/${data.id}`}>{el.title}</StyledLink>
            <div className="writer">
              Writer &nbsp;
              {data.userId}
            </div>
            <p>{el.content.slice(0, 20)}...</p>
          </li>
        ))}
      </Div>
      <PageList>
        <PageBtn
          onClick={handlePrevBtn}
          disabled={currentPage === pages[0] ? true : false}
        >
          Prev
        </PageBtn>
        {renderPageNumbers}
        <PageBtn
          onClick={handleNextBtn}
          disabled={currentPage === pages[pages.length - 1] ? true : false}
        >
          Next
        </PageBtn>
      </PageList>
    </>
  );
};

export default Article;
