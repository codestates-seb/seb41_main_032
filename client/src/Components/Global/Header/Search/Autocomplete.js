import styled from 'styled-components';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ul = styled.ul`
    display: block;
    border-radius: 3px;
    z-index: 100;
    background-color: white;
    border: solid 1.5px #495464;
    border-top: none;
    width: 500px;
    list-style-type: none;
`;
const List = styled.li`
    font-size: 0.8em;
    padding: 5px 9px;
    background-color: ${(props) => props.color};
`;
const Autocomplete = ({ data, setWord, setKeyword }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('white');

    return (
        <Ul>
            {data?.map((el) => (
                <List
                    key={el.srtnCd}
                    onClick={() => {
                        navigate(`/stock/${el.srtnCd} `, {
                            state: { name: `${el.itmsNm}` },
                        });
                        setKeyword('');
                        setWord(null);
                    }}
                    onMouseOver={() => setSelected(el.srtnCd)}
                    color={selected === el.srtnCd ? '#f7f7f7' : 'white'}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {el.itmsNm} ⇨
                </List>
            ))}
        </Ul>
    );
};

export default Autocomplete;
