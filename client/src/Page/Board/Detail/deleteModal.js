import styled from "styled-components";

const Div = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-color: #dcdcdc;
  opacity: 0.8;
`;
const Box = styled.div`
  font-size: 0.6em;
  width: 300px;
  height: 120px;
  padding: 30px;
  border-radius: 10px;
  background-color: white;
`;
const Button = styled.button`
  width: 40px;
  height: 20px;
  margin: 15px;
  border-radius: 3px;
  &:hover {
    background-color: blue;
    color: white;
  }
`;
const DeleteModal = ({ forDelete, onClose }) => {
  return (
    <Div>
      <Box>
        <h1>정말 삭제하시겠습니까?</h1>
        <Button onClick={() => forDelete()}>삭제</Button>
        <Button onClick={() => onClose(false)}>취소</Button>
      </Box>
    </Div>
  );
};
export default DeleteModal;
