import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../../Components/Hook/useInput";
import { userInfo } from "../../../Components/Function/userInfo";
import { useRecoilState } from "recoil";
import { useRef, useEffect, useCallback } from "react";
import notify from "../../../Components/Function/notify";
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
  min-height: 500px;

  line-height: 1.5em;
  resize: none;
  font-size: 0.9em;
  margin: 15px 0 20px 0;
  outline: none;
  white-space: pre-wrap;
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

const EditArticle = () => {
  const textRef = useRef();
  const handleSize = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_API_URL}/boards`;
  const params = useParams();
  const [memberId, setMemberId] = useRecoilState(userInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${url}/${params.num}`, inputValue)
      .then(() => {
        notify("수정되었습니다", "success");
        navigate(`/board/detail/${params.num}`);
      })
      .catch((err) => {
        console.log(err);
        notify("수정 실패", "error");
      });
  };
  // 글 데이터
  const [inputValue, setInputValue] = useInput({});
  useEffect(() => {
    axios.get(`${url}/${params.num}`).then((res) => {
      setInputValue({
        memberId: memberId,
        title: res.data.title,
        content: res.data.content,
      });
    });
  }, []);

  const handleDisable = !(memberId && inputValue.title && inputValue.content);

  return (
    <form onSubmit={handleSubmit}>
      <Div>
        <h2>글 수정</h2>
        <Input
          type="text"
          id="title"
          value={inputValue.title || ""}
          onChange={(e) =>
            setInputValue({ ...inputValue, [e.target.id]: e.target.value })
          }
          placeholder="제목을 입력해주세요(20자까지)"
          maxLength="20"
          borderColor={inputValue.title ? "#eff5f5" : "#0081C9"}
        ></Input>

        <Textarea
          ref={textRef}
          onInput={handleSize}
          type="text"
          id="content"
          cols="20"
          value={inputValue.content || ""}
          onChange={(e) =>
            setInputValue({ ...inputValue, [e.target.id]: e.target.value })
          }
          placeholder="본문을 입력해주세요"
          borderColor={inputValue.content ? "#eff5f5" : "#0081C9"}
        ></Textarea>

        <Button type="submit" disabled={handleDisable}>
          등록
        </Button>
      </Div>
    </form>
  );
};

export default EditArticle;
