import styled from 'styled-components';
import useGetSearchNews from '../../../Components/API/useGetSearch';
import useInput from '../../../Components/Hook/useInput';
import { Title } from '../../../Components/Style/Stock';
import NewsList from './NewsList';

const Section = styled.section`
    width: 100%;
    min-height: 500px;
    margin-bottom: 100px;
    padding: 20px;
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

/** 네이버 api를 사용하여 뉴스 정보를 검색하는 기능입니다
 * @author 이중원
 * @param {string} searchWord 검색하고자 하는 키워드
 * @return 검색된 뉴스리스트를 출력하는 컴포넌트를 리턴합니다
 */
const News = ({ searchWord }) => {
    const [news, , keyword, setKeyword] = useGetSearchNews(searchWord);
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
            <SearchInput type="text" placeholder="검색" onChange={ChangeValue} value={value} onKeyPress={Submit} />
            {news ? <NewsList news={news}></NewsList> : null}
        </Section>
    );
};

export default News;
