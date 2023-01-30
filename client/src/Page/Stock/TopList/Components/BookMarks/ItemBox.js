import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Item = styled.li`
    cursor: pointer;
    height: 70px;
    border: 1px solid rgb(193, 195, 197);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 0px 10px;
    border-radius: 10px;

    :hover {
        transform: scale(1.1);
        transition: 0.5s ease-in-out;
    }
`;

const StockName = styled.div`
    font-size: 1em;
    font-weight: bold;
`;

const StockCode = styled.div`
    margin-top: 5px;
    font-size: 0.8em;
    color: #70727b;
`;

/**
 * 지수 정보 (코스피 ,코스닥) ItemBox
 */
const ItemBox = ({ data }) => {
    const navigate = useNavigate();

    return (
        <Item onClick={() => navigate(`/stock/${data.stockCode}`, { state: { name: data.stockName } })}>
            <StockName>{data.stockName}</StockName>
            <StockCode>{data.stockCode}</StockCode>
        </Item>
    );
};

export default ItemBox;
