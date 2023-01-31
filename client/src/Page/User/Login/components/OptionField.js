import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 12px 0 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 14px;
  height: 14px;
  margin-left: 5px;
  cursor: pointer;
`;

const Label = styled.label`
  color: #616161;
  font-size: 14px;
  font-weight: 500;
`;

// 로그인 옵션 영역
const OptionField = ({ keepLogin, setKeepLogin }) => {
  const handleClick = () => setKeepLogin(!keepLogin);

  return (
    <Container>
      <Label htmlFor="keepLogin">로그인 유지</Label>
      <Checkbox type="checkbox" id="keepLogin" value={keepLogin} onClick={handleClick} />
    </Container>
  );
};

export default OptionField;
