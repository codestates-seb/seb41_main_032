// 헤더 검색창 기능 구현
// 코드 srtnCd, 이름 itmsNm

import Autocomplete from './Autocomplete';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useStockSearch from '../../../Hook/useStockSearch';
import Delete from '../../../Img/delete.png';
import { Navigate, useNavigate } from 'react-router-dom';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    > .box {
        display: flex;
        flex-direction: row;
        display: flex;
        width: 500px;
        height: 30px;
        border: solid 1.5px #495464;
        border-radius: 3px;
        margin: 15px 10px 0 0;
        padding-left: 9px;
        button {
        }
    }
    & button {
        background-color: white;
        &:hover {
            color: blue;
        }
    }
`;

const Input = styled.input`
    width: 450px;
    &:focus {
        outline: none;
    }
`;

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [focus, setFocus] = useState(false);

    const [data, setWord] = useStockSearch();
    useEffect(() => {
        setWord(keyword);
    }, [keyword]);

    const Submit = (e) => {
        if (!keyword || keyword.length === 0) return;
        if (e.key === 'Enter') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].itmsNm === keyword.toLocaleUpperCase()) {
                    navigate(`/stock/${data[i].srtnCd}`, { state: { name: data[i].itmsNm } });
                    setKeyword('');
                    setWord(null);
                    return;
                }
            }

            navigate('/stock/List', { state: { name: keyword } });
            setKeyword('');
            setWord(null);
            return;
        }
        return;
    };
    return (
        <Div
            onFocus={() => {
                setFocus(true);
            }}
            onBlur={() => {
                setFocus(false);
            }}
        >
            <div className="box">
                <Input
                    placeholder="어떤 종목이 궁금하세요?"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={Submit}
                ></Input>
                <button onClick={() => setKeyword('')}>
                    <img src={Delete} alt="delete" />
                </button>
            </div>
            {keyword.length && focus ? <Autocomplete data={data} setWord={setWord} setKeyword={setKeyword} /> : null}
        </Div>
    );
};
export default Search;
