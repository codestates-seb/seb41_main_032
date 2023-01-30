import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import clearStorage from "../../../../Components/Function/clearStorage";

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
const DeleteButton = ({ memberId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const answer = window.confirm("정말 탈퇴하시겠습니까?");
    if (answer) requestDelete();
  };

  const requestDelete = () => {
    const url = `${process.env.REACT_APP_API_URL}/members/${memberId}`;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          clearStorage();
          alert("탈퇴를 완료했습니다.");
          navigate("/");
        } else {
          throw response;
        }
      })
      .catch((error) => alert(`회원탈퇴 실패 (error code: ${error.status})`));
  };

  return <Button onClick={handleClick}>회원탈퇴</Button>;
};

export default DeleteButton;
