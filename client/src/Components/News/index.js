import styled from 'styled-components';
import useGetSearchNews from '../API/useGetSearch';
import useInput from '../Hook/useInput';
import { Title } from '../Style/Stock';
import NewsList from './NewsList';

const Section = styled.section`
    width: 100%;
    min-height: 500px;
    margin-bottom: 100px;
`;

const SearchInput = styled.input`
    height: 30px;
    width: 200px;
    color: #70727b;
    border-radius: 3px;
    border: 1px solid rgb(186 191 196);
    margin-top: 20px;
    padding-left: 5px;
`;

const News = ({ keyword }) => {
    const [news, , , setKeyword] = useGetSearchNews(keyword);
    const [value, setValue, ChangeValue] = useInput();
    const Submit = (e) => {
        if (e.key === 'Enter') {
            if (value) {
                setKeyword(value);
            }
        }
    };
    return (
        <Section>
            <header>
                <Title>{keyword} 뉴스</Title>
            </header>
            <SearchInput type="text" placeholder="검색" onChange={ChangeValue} Value={value} setValue={setValue} onKeyPress={Submit} />
            {news ? <NewsList news={news}></NewsList> : null}
        </Section>
    );
};

export default News;
