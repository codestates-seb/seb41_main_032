import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-right: 20px;
    border: 1px solid #333;
    border-radius: 7px;
    width: 150px;
    height: 100px;
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
