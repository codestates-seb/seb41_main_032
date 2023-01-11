import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 30px 50px;
  > input,
  textarea {
    margin-top: 30px;
    border: solid 3px #eff5f5;
    border-radius: 10px;
  }
  input {
    height: 40px;
    padding-left: 10px;
  }
  textarea {
    padding: 10px;
    height: 500px;
    line-height: 1.5em;
    resize: none;
    font-size: 0.9em;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  width: 50px;
  height: 35px;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: black;
  border-radius: 10px;
  &:hover {
    background-color: blue;
  }
`;

const NewArticle = () => {
  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={HandleSubmit}>
      <Div>
        <h1>새 글 작성</h1>
        <input
          className="ti"
          placeholder="제목을 입력해주세요(20자까지)"
          maxLength="20"
        ></input>
        <textarea className="form" placeholder="본문을 입력해주세요"></textarea>
        <Button type="submit">등록</Button>
      </Div>
    </form>
  );
};

export default NewArticle;
