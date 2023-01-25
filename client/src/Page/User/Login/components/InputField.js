import { useEffect, useState } from 'react';
import validateInput from '../../../../Components/Function/validateInput';
import Input from '../../../../Components/Style/User/Input';
import Warning from '../../../../Components/Style/User/Warning';

// 로그인 아이디, 비밀번호 인풋 영역
const InputField = ({ user, isValidInput, setUser, setIsValidInput }) => {
    const [lastEntered, setLastEntered] = useState(null);

    useEffect(() => {
        if (!lastEntered) return;
        setIsValidInput({ ...isValidInput, [lastEntered]: validateInput(lastEntered, user[lastEntered]) });
    }, [user.username, user.password]);

    const handleChange = ({ target }) => {
        setLastEntered(target.id);
        setUser({ ...user, [target.id]: target.value });
    };

    return (
        <>
            <Input type="text" id="username" placeholder="아이디를 입력해주세요." value={user.username} onChange={handleChange} />
            {isValidInput.username === false && <Warning>5~16글자 사이 영문이나 숫자를 입력해주세요.</Warning>}
            <Input type="password" id="password" placeholder="비밀번호를 입력해주세요." autoComplete="on" value={user.password} onChange={handleChange} />
            {isValidInput.password === false && <Warning>8~20글자 사이 영문이나 숫자를 입력해주세요.</Warning>}
        </>
    );
};

export default InputField;
