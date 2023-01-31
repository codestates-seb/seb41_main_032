import styled from 'styled-components';
import commaGenerator from '../../../../../Components/Function/commaGenerator';
import Loading from '../../../../../Components/Style/Loading';
import { RedBox, BlueBox } from '../../../../../Components/Style/Stock';

const Item = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-right: 30px;
    min-width: 100px;
`;

const Name = styled.div`
    font-size: 1em;
`;

const Bold = styled.b`
    font-size: 1.3em;
`;

/**
 * 지수 정보 (코스피 ,코스닥) ItemBox
 */
const ItemBox = ({ data }) => {
    return (
        <Item>
            {data ? (
                <>
                    <Name>{data.idxNm}</Name>
                    <Bold>{commaGenerator(data.clpr)}</Bold>
                    {data.fltRt > 0 ? <RedBox>{Number(data.fltRt)}%</RedBox> : <BlueBox>{Number(data.fltRt)}%</BlueBox>}
                </>
            ) : (
                <Loading />
            )}
        </Item>
    );
};

export default ItemBox;
