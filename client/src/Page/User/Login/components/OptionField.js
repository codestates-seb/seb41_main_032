import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 12px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KeepLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 14px;
  height: 14px;
  margin: 0 8px 2px 0;
  cursor: pointer;
`;

const Label = styled.label`
  color: #616161;
  font-size: 14px;
  font-weight: 500;
`;

// 로그인 옵션 영역
const OptionField = ({ user, setUser }) => {
  // TODO: 비밀번호 찾기 라우팅 수정
  const handleClick = () => setUser({ ...user, keepLogin: !user.keepLogin });

  return (
    <Container>
      <KeepLogin>
        <Checkbox type="checkbox" id="keepLogin" value={user.keepLogin} onClick={handleClick} />
        <Label htmlFor="keepLogin">로그인 유지</Label>
      </KeepLogin>
      <Link to="/">비밀번호 찾기</Link>
    </Container>
  );
};

export default OptionField;
