import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BlueButton from '../../../../Components/Style/User/BlueButton';
import InputField from './InputField';
import PasswordInputField from './PasswordInputField';

const Container = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
`;

// 회원가입 서식
const Form = () => {
    /** useNavigate()추가하였습니다 useState의 userid 값을 username로 바꿧습니다(서버와 키값을 일치시켜려고) - 이중원 */
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
        nickname: '',
        email: '',
    });
    const [isValidInput, setIsValidInput] = useState({
        username: null,
        password: null,
        nickname: null,
        email: null,
    });
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        requestSignUp();
    };

    const requestSignUp = () => {
        // 기본적인 api요청 구현했습니다 시간되시면 에러처리와 회원가입성공시 사용자에게 알려주는 로직을 만들어주세요
        axios
            .post(`${process.env.REACT_APP_API_URL}/members`, user)
            .then(() => {
                // 회원가입 성공
                navigate('/login');
            })
            .catch((error) => {
                // 회원가입 실패
                // TODO 백엔드와 각 상황별로 오류코드와 메세지를 상의하고 그에 따라 에러처리를 해야됩니다 ex)이미 존재하는 회원입니다*/
                console.error(error);
            });
    };

    const inputFieldProps = {
        user,
        isValidInput,
        setUser,
        setIsValidInput,
    };
    const passwordInputFieldProps = {
        user,
        isValidInput,
        passwordCheck,
        isValidPasswordCheck,
        setUser,
        setIsValidInput,
        setPasswordCheck,
        setIsValidPasswordCheck,
    };
    const shouldDisableButton = !(isValidInput.username && isValidInput.password && isValidInput.nickname && isValidInput.email && isValidPasswordCheck);

    return (
        <Container onSubmit={handleSubmit}>
            <InputField id="username" {...inputFieldProps} />
            <PasswordInputField {...passwordInputFieldProps} />
            <InputField id="nickname" {...inputFieldProps} />
            <InputField id="email" {...inputFieldProps} />
            <BlueButton type="submit" disabled={shouldDisableButton}>
                회원가입
            </BlueButton>
        </Container>
    );
};

export default Form;
