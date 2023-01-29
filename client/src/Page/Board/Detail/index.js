import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userInfo } from "../../../Components/Function/userInfo";
import { useRecoilState } from "recoil";
import DeleteModal from "./deleteModal";
import Portal from "../../../Components/Function/Portal";
import notify from "../../../Components/Function/notify";
const Div = styled.div`
  display: flex;

  flex-direction: column;
  margin: 30px 50px;
  padding: 50px 50px;
  border-radius: 10px;
  border: solid 3px #eff5f5;
  .title {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .writer {
    color: #7c7c7c;
    font-size: 0.9em;
    border-bottom: solid 1px black;
    padding-bottom: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
  }
  .body {
    height: 100%;
    min-height: 300px;
    white-space: pre-wrap;
  }
`;
const Box = styled.div`
  width: 100%;
  display: flex;
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

const Article = () => {
  const [memberId, setMemberId] = useRecoilState(userInfo);
  const navigate = useNavigate();
  const params = useParams();
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };
  const [data, setData] = useState({});
  const url = `${process.env.REACT_APP_API_URL}`;
  useEffect(() => {
    axios.get(`${url}/boards/${params.num}`).then((res) => {
      setData(res.data);
    });
  }, []);
  const deleteHandler = () => {
    console.log("delete");
    axios.delete(`${url}/boards/${params.num}`).then(() => {
      navigate("/board");
      notify("삭제되었습니다", "success");
    });
  };
  return (
    <Div>
      <Box className="title">{data.title}</Box>
      <Box className="writer">
        <div>
          {data.nickname}
          &nbsp;
          {new Date(data.createdAt).toLocaleString()}
        </div>
        {Number(memberId) === data.memberId ? (
          <div>
            <Button onClick={() => navigate(`/board/edit/${params.num}`)}>
              수정
            </Button>
            <Portal>
              {modalOn && (
                <DeleteModal forDelete={deleteHandler} onClose={handleModal} />
              )}
            </Portal>
            <Button
              onClick={() => {
                handleModal();
              }}
            >
              삭제
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Box>
      <Box className="body">{data.content}</Box>
    </Div>
  );
};

export default Article;
