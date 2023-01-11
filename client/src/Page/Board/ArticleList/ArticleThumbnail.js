import styled from "styled-components";
import { Link } from "react-router-dom";
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

const ArticleThumbnail = ({ data }) => {
  return (
    <Div>
      <div className="box">
        <div>
          <StyledLink to={`/board/detail/${data.id}`}>{data.title}</StyledLink>
        </div>
        <div className="writer">
          Writer &nbsp;
          {data.userId}
        </div>
        <p>{data.body.slice(0, 20)}... </p>
      </div>
    </Div>
  );
};

export default ArticleThumbnail;
