import styled from "styled-components";

const Button = styled.button`
  padding: 2px;
  color: #6d7991;
  background-color: #ffffff;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

// 회원탈퇴 버튼
const DeleteButton = () => {
  const handleClick = () => {
    const answer = window.confirm("탈퇴하시겠습니까?");
    if (!answer) return;
    requestDelete();
  };

  const requestDelete = () => {
    // TODO: 계정 삭제 로직
  };

  return <Button onClick={handleClick}>회원탈퇴</Button>;
};

export default DeleteButton;
