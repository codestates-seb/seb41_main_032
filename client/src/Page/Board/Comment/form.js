import styled from "styled-components";
import axios from "axios";
import { useRef, useCallback, useState } from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  border-radius: 7px;
  border: solid 2px #eff5f5;
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 50px;
  resize: none;
  white-space: pre-wrap;
  padding: 10px;
  outline: none;
`;
const Button = styled.button`
  width: 40px;
  height: 20px;
  border-radius: 3px;
  display: block;
  margin: 0 10px 10px auto;
  &:hover {
    background-color: blue;
    color: white;
  }
`;

const CommentForm = ({ memberId, boardId }) => {
  const textRef = useRef();
  const handleSize = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
  const url = `${process.env.REACT_APP_API_URL}`;
  const [comment, setComment] = useState("");
  const commentHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/comments`, {
        memberId: memberId,
        boardId: boardId,
        content: comment,
      })
      .then(() => {
        setComment("");
        window.location.reload();
      });
  };
  return (
    <Div>
      <form onSubmit={commentHandler}>
        <Textarea
          ref={textRef}
          onInput={handleSize}
          placeholder="댓글 입력"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Textarea>
        <Button type="submit">작성</Button>
      </form>
    </Div>
  );
};

export default CommentForm;
