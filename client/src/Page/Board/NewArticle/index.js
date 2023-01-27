import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useInput from "../../../Components/Hook/useInput";
import { userInfo } from "../../../Components/Function/userInfo";
import { useRecoilState } from "recoil";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 30px 50px;
`;

const Input = styled.input`
  border: ${(props) => props.borderColor} solid 2px;
  border-radius: 10px;
  height: 40px;
  padding-left: 10px;
  outline: none;
  margin-top: 15px;
`;

const Textarea = styled.textarea`
  border: ${(props) => props.borderColor} solid 2px;
  border-radius: 10px;
  padding: 10px;
  height: 500px;
  line-height: 1.5em;
  resize: none;
  font-size: 0.9em;
  margin: 15px 0 20px 0;
  outline: none;
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
  // const navigate = useNavigate();
  const [memberId, setMemberId] = useRecoilState(userInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO : 서버 배포되면 기능 마저 구현
    // const url = `url`;
    // const options = {
    //   method: "POST",
    //   data: data,
    // };
    console.log(data);
    console.log(memberId);
    // axios(url, options).then((res) => {
    //   console.log(res);
    //   navigate("/board");
    //  });
  };
  // 글 데이터
  const [data, handleChange] = useInput({
    memberId: memberId,
    title: "",
    content: "",
  });
  const handleDisable = !(memberId && data.title && data.content);

  return (
    <form onSubmit={handleSubmit}>
      <Div>
        <h2>새 글 작성</h2>
        <Input
          type="text"
          id="title"
          onChange={(e) =>
            handleChange({ ...data, [e.target.id]: e.target.value })
          }
          placeholder="제목을 입력해주세요(20자까지)"
          maxLength="20"
          borderColor={data.title ? "#eff5f5" : "#0081C9"}
        ></Input>

        <Textarea
          type="text"
          id="content"
          cols="20"
          onChange={(e) =>
            handleChange({ ...data, [e.target.id]: e.target.value })
          }
          placeholder="본문을 입력해주세요"
          borderColor={data.content ? "#eff5f5" : "#0081C9"}
        ></Textarea>

        <Button type="submit" disabled={handleDisable}>
          등록
        </Button>
      </Div>
    </form>
  );
};

export default NewArticle;
