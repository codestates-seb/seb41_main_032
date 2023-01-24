import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BlueButton from '../../../../Components/Style/User/BlueButton';
import InputField from './InputField';
import OptionField from './OptionField';

const Container = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2px;
`;

// 로그인 서식
const Form = () => {
    /** useNavigate()추가하였습니다 useState의 userid 값을 username로 바꿧습니다(서버와 키값을 일치시켜려고) - 이중원 */
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
        // keepLogin: false,
    });
    const [isValidInput, setIsValidInput] = useState({
        username: null,
        password: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        requestLogin();
    };

    const requestLogin = () => {
        // 기본적인 api요청 구현했습니다 시간되시면 에러처리 부탁드립니다
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/login`, user)
            .then((res) => {
                // 회원가입 성공
                // TODO 백엔드와 소통을해서 로그인 성공시 memberId값을 클라이언트에 저장을 해야됩니다 memberId이 거래기능,마이페이지,게시판기능 필수값입니다 */
                console.log('로그인 성공', res); // data = ""
                navigate('/stock/top');
            })
            .catch((error) => {
                // 회원가입 실패
                console.error(error);
            });
    };

    const inputFieldProps = { user, isValidInput, setUser, setIsValidInput };
    const optionFieldProps = { user, setUser };
    const shouldDisableButton = !isValidInput.username || !isValidInput.password;

    return (
        <Container onSubmit={handleSubmit}>
            <InputField {...inputFieldProps} />
            <BlueButton type="submit" disabled={shouldDisableButton}>
                로그인
            </BlueButton>
            <OptionField {...optionFieldProps} />
        </Container>
    );
};

export default Form;
