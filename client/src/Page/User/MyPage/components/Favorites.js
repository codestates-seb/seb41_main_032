import styled from 'styled-components';
import { useBookMarks } from '../../../../Components/API/ReactQueryContainer';
import Subtitle from '../../../../Components/Style/User/Subtitle';
import Favorite from './Favorite';

const Container = styled.div`
    width: 100%;
    padding-bottom: 30px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 15px;
`;

const Contents = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

// 즐겨찾기 영역
const Favorites = () => {
    //TODO 인자값으로 bookmarkId전달해주세요
    // const bookMarks = useBookMarks('2');
    // console.log('bookMarks',bookMarks) => [{북마크1}, {북마크2}]

    const favorites = [
        {
            name: '삼성전자',
            number: '005930',
        },
        {
            name: '카카오',
            number: '035720',
        },
        {
            name: 'NAVER',
            number: '035420',
        },
        {
            name: 'SK하이닉스',
            number: '000660',
        },
    ];

    return (
        <Container>
            <Subtitle>즐겨찾기</Subtitle>
            <Contents>
                {favorites.map((favorite) => (
                    <Favorite key={favorite.number} {...favorite} />
                ))}
            </Contents>
        </Container>
    );
};

export default Favorites;
