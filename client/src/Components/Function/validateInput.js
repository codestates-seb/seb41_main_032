// 아이디, 비밀번호, 닉네임, 이메일의 유효성을 검사하는 함수
const validateInput = (id, value) => {
    if (id === 'password') return /^[a-zA-Z0-9]{8,20}$/.test(value);
    if (id === 'email') return /^[a-zA-Z0-9.\-_]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]/.test(value);
    if (id === 'nickname') return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,6}$/.test(value);
    return /^[a-zA-Z0-9]{5,16}$/.test(value);
};

export default validateInput;
