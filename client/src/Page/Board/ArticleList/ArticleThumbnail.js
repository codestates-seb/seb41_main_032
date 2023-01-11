import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 80%;
  height: 120px;
  border-radius: 10px;
  border: solid 3px #eff5f5;
  margin: 30px auto 30px 0;

  h1 {
  }
  > .box {
    margin: 15px auto auto 30px;
  }
  span {
    padding-top: 10px;
  }
  span {
    color: #7c7c7c;
  }
  p {
    margin-top: 10px;
  }
`;

const ArticleThumbnail = ({ data }) => {
  return (
    <Div>
      <div className="box">
        <h1>{data.title}</h1>
        <span>
          Writter &nbsp;
          {data.userId}
        </span>
        <p>{data.body.slice(0, 20)}... </p>
      </div>
    </Div>
  );
};

export default ArticleThumbnail;
