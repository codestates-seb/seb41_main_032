import styled from 'styled-components';
import { useParams } from 'react-router';
import { RedTriangle, BlueTriangle, RedBox, BlueBox } from '../../../../../../Components/Style/Stock';
import commaGenerator from '../../../../../../Components/Function/commaGenerator';
import { useLocation } from 'react-router';
import DisableImg from '../../../../../../Components/Img/Favorites/white.png';
import ActivateImg from '../../../../../../Components/Img/Favorites/gold.png';
import numberToKR from '../../../../../../Components/Function/numberToKR';
import useInput from '../../../../../../Components/Hook/useInput';
import { useAddBookMarks, useBookMarks, useMember, useRemoveBookMarks, useTradeInfo, useTrade } from '../../../../../../Components/API/ReactQueryContainer';
import useStockTime from '../../../../../../Components/Hook/useStockTime';
import tradeCalculation from '../../../../../../Components/Function/tradeCalculation';

const Section = styled.section`
    display: flex;
`;

const PriceContainer = styled.div`
    color: #eee;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
`;
const Price = styled.span`
    font-size: 1.2em;
    font-weight: 700;
    margin-right: 10px;
`;

const RedPrice = styled.span`
    margin-right: 7px;
    font-size: 0.9em;
    color: #ff4747;
`;
const BluePrice = styled.span`
    margin-right: 7px;
    font-size: 0.9em;
    color: #3a74ff;
`;

const FavoritesImg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

const StockContainer = styled.section`
    margin: 10px;
    padding-right: 20px;
    border-right: 1px solid #333;
`;

const TradingContainer = styled.section`
    margin: 10px;
    padding-right: 20px;
    border-right: 1px solid #333;
    h2 {
        margin: 0 0 10px 0;
        font-size: 1em;
    }
`;

const ButtonContainer = styled.div`
    border: 1px solid #ddd;
    display: flex;
    font-size: 0.9em;
    width: auto;

    button {
        background-color: #212223;
        text-align: center;
        width: 30px;
        padding: 5px 0px;
        color: #eee;
        cursor: pointer;
        :hover {
            background-color: #567189;
        }
    }

    input {
        background-color: #212223;
        color: #eee;
        width: 80px;
        text-align: center;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        :focus {
            outline: 0;
        }
    }
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 200px;

    span {
        margin: 1px 0px;
        color: #999;
        font-size: 0.8em;
    }
`;

const TradingButton = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const OrderButton = styled.button`
    margin-left: 20px;
    padding: 5px;
    background-color: #f48225;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        transform: scale(1.1);
    }
    :disabled {
        background-color: gray;
    }
`;

const IsOpen = styled.div`
    font-size: 0.8em;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    &.isOpen {
        color: #44f028;
        div {
            background-color: #44f028;
        }
    }
    &.notOpen {
        color: #878787;
        div {
            background-color: #878787;
        }
    }
`;

const Circle = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 5px;
    margin-right: 5px;
`;

/** 주식의 이름,가격을 표시하는 컴포넌트입니다 */
const Info = ({ stockInfo }) => {
    const params = useParams();
    const { state } = useLocation();

    const [quantity, setQuantity, ChangeQuantity, submit] = useInput();

    //TODO 백엔드에서 memberID 보내주면 해당 id로 교체
    const bookMarks = useBookMarks();
    const userInfo = useMember();
    const tradeInfo = useTradeInfo();
    const calculation = tradeCalculation(tradeInfo);
    const marketTime = useStockTime();
    const { mutate: addBookMarks } = useAddBookMarks();
    const { mutate: removeBookMarks } = useRemoveBookMarks();
    const { mutate: trade } = useTrade();
    const handlerBookmark = () => {
        const isActivate = bookMarks?.find((e) => e.stockCode === params.id);

        if (isActivate) {
            removeBookMarks(isActivate.bookmarkId);
        } else {
            const bookmark = {
                stockCode: params.id,
                stockName: state.name,
                memberId: '2',
            };
            addBookMarks(bookmark);
        }
    };

    const handlerOrder = () => {
        // 매매 수량이 없을때 early return
        if (quantity === '' || quantity === 0) return;

        // 매수시 잔액 부족
        if (userInfo.money - quantity * stockInfo.stck_prpr < 0) {
            console.log('잔액이 부족합니다');
        }
        // 매도시 보유한 주식수량 부족
        else if (quantity < 0 && Math.abs(quantity) > calculation.getQuantity(params.id)) {
            console.log('주식보유량이 부족합니다');
            setQuantity('');
        }
        // 거래 체결
        else {
            const order = {
                memberId: userInfo.memberId,
                stockName: state.name,
                stockCode: params.id,
                quantity: quantity,
                price: stockInfo.stck_prpr,
            };

            if (quantity > 0) {
                order.tradeType = 'BUY';
                order.quantity = Math.abs(quantity);
            } else {
                order.tradeType = 'SELL';
                order.quantity = Math.abs(quantity);
            }
            trade(order);
            console.log('거래가 채결되었습니다', order);
            setQuantity('');
        }
    };

    return (
        <Section>
            <StockContainer>
                <p>{`한국증권 거래소 #${stockInfo.bstp_kor_isnm}`}</p>
                <h2>
                    <FavoritesImg
                        src={bookMarks?.find((e) => e.stockCode === params.id) ? ActivateImg : DisableImg}
                        alt="Favorites"
                        onClick={handlerBookmark}
                    />
                    {state.name} <span>{params.id}</span>
                </h2>
                <IsOpen className={marketTime !== '장마감' ? 'isOpen' : 'notOpen'}>
                    <Circle className={marketTime !== '장마감' ? 'isOpen' : 'notOpen'} />
                    {marketTime}
                </IsOpen>
                <PriceContainer>
                    {stockInfo.prdy_vrss > 0 ? (
                        <>
                            <Price>{commaGenerator(stockInfo.stck_prpr)}</Price>
                            <RedTriangle />
                            <RedPrice>{`${stockInfo.prdy_vrss}`}</RedPrice>
                            <RedBox>{`${stockInfo.prdy_ctrt}%`}</RedBox>
                        </>
                    ) : (
                        <>
                            <Price>{commaGenerator(stockInfo.stck_prpr)}</Price>
                            <BlueTriangle />
                            <BluePrice>{`${stockInfo.prdy_vrss}`}</BluePrice>
                            <BlueBox>{`${stockInfo.prdy_ctrt}%`}</BlueBox>
                        </>
                    )}
                </PriceContainer>
            </StockContainer>
            <TradingContainer>
                <h2>매매</h2>
                <ItemContainer>
                    <span>보유 수량</span>
                    <span>{`${calculation.getQuantity(params.id)} 주`}</span>
                </ItemContainer>
                <ItemContainer>
                    <span>주문 금액</span>
                    <span>{`${numberToKR(quantity * stockInfo.stck_prpr)} 원`}</span>
                </ItemContainer>
                <ItemContainer>
                    <span>나의 잔고</span>
                    <span>{`${numberToKR(userInfo?.money)} 원`}</span>
                </ItemContainer>
                <ItemContainer>
                    <span>거래 후 잔고</span>
                    <span>{`${numberToKR(userInfo?.money - quantity * stockInfo.stck_prpr)} 원`}</span>
                </ItemContainer>
                <TradingButton>
                    <ButtonContainer>
                        <button onClick={() => setQuantity((current) => Number(current) + 1)}>+</button>
                        <input type="number" placeholder="0" onChange={ChangeQuantity} value={quantity}></input>
                        <button
                            onClick={() =>
                                setQuantity((current) => {
                                    if (current <= 0 && Math.abs(current) >= calculation.getQuantity(params.id)) {
                                        return -calculation.getQuantity(params.id);
                                    }
                                    return Number(current) - 1;
                                })
                            }
                        >
                            -
                        </button>
                    </ButtonContainer>
                    <OrderButton disabled={marketTime !== '장마감' ? 'disabled' : null} value="비활성화" onClick={handlerOrder}>
                        주문
                    </OrderButton>
                </TradingButton>
            </TradingContainer>
            <TradingContainer>
                <h2>기록</h2>
                <ItemContainer>
                    <span>평단가</span>
                    <span>{`${commaGenerator(calculation.getAverageBuyPrice(params.id))} 원`}</span>
                </ItemContainer>
                <ItemContainer>
                    <span>매도 평균가</span>
                    <span>{`${commaGenerator(calculation.getAverageSellPrice(params.id))} 원`}</span>
                </ItemContainer>
                <ItemContainer>
                    <span>매수 수량</span>
                    <span>{`${commaGenerator(calculation.getNumberOfBuy(params.id))} 주`}</span>
                </ItemContainer>
                <ItemContainer>
                    <span>매도 수량</span>
                    <span>{`${commaGenerator(calculation.getNumberOfSell(params.id))} 주`}</span>
                </ItemContainer>
                <ItemContainer>
                    <span>손익</span>
                    <span>{`${calculation.IncomeStatement(params.id, stockInfo.stck_prpr)} 원`}</span>
                </ItemContainer>
            </TradingContainer>
        </Section>
    );
};

export default Info;
