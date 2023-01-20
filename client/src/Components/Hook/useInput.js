import { useState } from 'react';

/**  커스텀 인풋입니다
 * @author 이중원
 * @param {string} initialValue 초기값
 * @param {string} onSubmit  버튼눌렀을때 동작하는 이벤트 함수
 * @return [inputValue, setInputValue, handleChange, handleSubmit]
 * */
const useInput = (initialValue = '', onSubmit) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSubmit = () => {
        setInputValue('');
        onSubmit();
    };
    return [inputValue, setInputValue, handleChange, handleSubmit];
};

export default useInput;
