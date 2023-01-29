import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userInfo } from "../../../Components/Function/userInfo";
import { useRecoilState } from "recoil";
import DeleteModal from "./deleteModal";
import Portal from "../../../Components/Function/Portal";

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
  //TODO : 백엔드 작업에 따라 get 경로 변경
  //const url =`${process.env.REACT_APP_API_URL}`
  const url = `https://jsonplaceholder.typicode.com/posts`;
  useEffect(() => {
    axios.get(`${url}/${params.num}`).then((res) => {
      setData(res.data);
    });
  }, []);

  const deleteHandler = () => {
    console.log("delete");
    axios.delete(`${url}/${params.num}`).then((res) => console.log(res));
  };
  return (
    <Div>
      <Box className="title">{data.title}</Box>
      <Box className="writer">
        <div>Writer {data.userId}</div>
        {Number(memberId) === data.userId ? (
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
                console.log("삭제");
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
      <Box className="body">{data.body}</Box>
    </Div>
  );
};

export default Article;
