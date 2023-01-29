import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteModal from "../Detail/deleteModal";
import Portal from "../../../Components/Function/Portal";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px gray;
  padding: 15px 0 15px 0;
  .user {
    display: flex;
    font-size: 0.9em;
    margin-bottom: 10px;
    justify-content: space-between;
  }
  .comment {
    white-space: pre-wrap;
  }
`;
const Li = styled.li`
  list-style: none;
`;

const Button = styled.button`
  width: 40px;
  height: 20px;
  border-radius: 3px;
  margin-left: 5px;
  &:hover {
    background-color: blue;
    color: white;
  }
`;

const Comment = ({ memberId, boardId }) => {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    axios.get(`${url}/comments?board=${boardId}`).then((res) => {
      setCommentData(res.data);
    });
  }, []);

  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const deleteHandler = (e) => {
    console.log("delete");
    axios.delete(`${url}/comments/${e}`).then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      {commentData.map((el, index) => (
        <Li key={index}>
          <Box>
            <div className="user">
              {el.username}
              {Number(memberId) === Number(el.memberId) ? (
                <>
                  <Portal>
                    {modalOn && (
                      <DeleteModal
                        forDelete={() => deleteHandler(el.commentId)}
                        onClose={handleModal}
                      />
                    )}
                  </Portal>
                  <Button onClick={() => handleModal()}>삭제</Button>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="comment">{el.content}</div>
          </Box>
        </Li>
      ))}
    </>
  );
};
export default Comment;
