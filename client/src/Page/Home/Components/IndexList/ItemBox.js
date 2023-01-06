import styled from 'styled-components';
import BlueBox from '../../../../Components/Style/BlueBox';
import RedBox from '../../../../Components/Style/RedBox';
import CommaGenerator from '../../../../Components/Function/CommaGenerator';

const Item = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    text-decoration-line: none;
    color: black;
    margin-right: 30px;
`;

const Name = styled.div`
    font-size: 1em;
`;

const Bold = styled.b`
    font-size: 1.3em;
`;

const ItemBox = ({ data }) => {
    return (
        <Item>
            <Name>{data.idxNm ? data.idxNm : data.itmsNm}</Name>
            <Bold>{CommaGenerator(data.clpr)}</Bold>
            {data.fltRt > 0 ? <RedBox>{Number(data.fltRt)}%</RedBox> : <BlueBox>{Number(data.fltRt)}%</BlueBox>}
        </Item>
    );
};

export default ItemBox;