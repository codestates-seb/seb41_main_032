// 아이디, 비밀번호, 닉네임, 이메일의 유효성을 검사하는 함수
const validateInput = (label, value) => {
  let regex;
  if (label === "비밀번호") {
    regex = /^[a-zA-Z0-9]{8,20}$/;
  } else if (label === "이메일") {
    regex = /^[a-zA-Z0-9.\-_]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]/;
  } else {
    regex = /^[a-zA-Z0-9]{5,16}$/;
  }
  return regex.test(value);
};

export default validateInput;
