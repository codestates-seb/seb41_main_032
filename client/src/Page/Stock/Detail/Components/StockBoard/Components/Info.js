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
import tradeCalculation from '../../../../../../Components/Function/tradeCalculator';
import notify from '../../../../../../Components/Function/notify';
import Tooltip from '../../../../../../Components/Global/Tooltip';
import described from './tooltipText';
import QuestionMark from '../../../../../../Components/Style/QuestionMark';

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
        display: flex;
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
        transform: scale(1.2);
        transition: 0.5s ease-in-out;
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

const TradeNum = styled.span`
    letter-spacing: 1px;
`;

/** ????????? ??????,????????? ???????????? ????????????????????? */
const Info = ({ stockInfo }) => {
    const params = useParams();
    const { state } = useLocation();

    const [quantity, setQuantity, ChangeQuantity, submit] = useInput();

    const bookMarks = useBookMarks();
    const userInfo = useMember();
    const tradeInfo = useTradeInfo();
    const calculation = tradeCalculation(tradeInfo);
    const marketTime = useStockTime();

    const { mutate: addBookMarks } = useAddBookMarks();
    const { mutate: removeBookMarks } = useRemoveBookMarks();

    const success = () =>
        notify(
            `${state.name}\n?????????: ${numberToKR(stockInfo.stck_prpr)}???\n??????: ${Math.abs(quantity)}???\n??? ??????: ${numberToKR(
                stockInfo.stck_prpr * Math.abs(quantity),
            )}???\n${quantity > 0 ? '??????' : '??????'}??? ?????????????????????.`,
            'success',
        );
    const { mutate: trade } = useTrade(success);

    const handlerBookmark = () => {
        if (!userInfo) {
            notify('????????? ??? ??????????????????', 'warning');
            return;
        }

        const isActivate = bookMarks?.find((e) => e.stockCode === params.id);

        if (isActivate) {
            removeBookMarks(isActivate.bookmarkId);
        } else {
            const bookmark = {
                stockCode: params.id,
                stockName: state.name,
            };
            addBookMarks(bookmark);
        }
    };

    const handlerOrder = () => {
        if (quantity === '' || quantity === 0) return;

        if (!userInfo || userInfo.memberId === undefined) {
            notify('????????? ??? ??????????????????.', 'warning');
            return;
        }

        // ????????? ?????? ??????
        if (userInfo.money - quantity * stockInfo.stck_prpr < 0) {
            notify('????????? ???????????????.', 'warning');
            return;
        }
        // ????????? ????????? ???????????? ??????
        else if (quantity < 0 && Math.abs(quantity) > calculation.quantity(params.id)) {
            notify('?????? ?????? ????????? ???????????????.', 'warning');
            setQuantity('');
        }
        // ?????? ??????
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
            setQuantity('');
        }
    };
    return (
        <Section>
            <StockContainer>
                <p>{`???????????? ????????? #${stockInfo.bstp_kor_isnm}`}</p>
                <h2>
                    <FavoritesImg
                        src={bookMarks?.find((e) => e.stockCode === params.id) ? ActivateImg : DisableImg}
                        alt="Favorites"
                        onClick={handlerBookmark}
                    />
                    {state.name} <span>{params.id}</span>
                </h2>
                <IsOpen className={marketTime !== '?????????' ? 'isOpen' : 'notOpen'}>
                    <Circle className={marketTime !== '?????????' ? 'isOpen' : 'notOpen'} />
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
                <h2>??????</h2>
                <ItemContainer>
                    <span>?????? ??????</span>
                    <TradeNum>{`${calculation.quantity(params.id)}???`}</TradeNum>
                </ItemContainer>
                <ItemContainer>
                    <span>?????? ??????</span>
                    <TradeNum>{`${numberToKR(quantity * stockInfo.stck_prpr)}???`}</TradeNum>
                </ItemContainer>
                <ItemContainer>
                    <span>?????? ??????</span>
                    <TradeNum>{`${numberToKR(userInfo?.money)}???`}</TradeNum>
                </ItemContainer>
                <ItemContainer>
                    <span>?????? ??? ??????</span>
                    <TradeNum>{`${numberToKR(userInfo?.money - quantity * stockInfo.stck_prpr)}???`}</TradeNum>
                </ItemContainer>
                <TradingButton>
                    <ButtonContainer>
                        <button onClick={() => setQuantity((current) => Number(current) + 1)}>+</button>
                        <input type="number" placeholder="0" onChange={ChangeQuantity} value={quantity}></input>
                        <button
                            onClick={() =>
                                setQuantity((current) => {
                                    if (current <= 0 && Math.abs(current) >= calculation.quantity(params.id)) {
                                        return -calculation.quantity(params.id);
                                    }
                                    return Number(current) - 1;
                                })
                            }
                        >
                            -
                        </button>
                    </ButtonContainer>
                    <OrderButton onClick={handlerOrder}>??????</OrderButton>
                </TradingButton>
            </TradingContainer>
            <TradingContainer>
                <h2>??????</h2>
                <Tooltip text={described.holdingStockPrice}>
                    <ItemContainer>
                        <span>
                            ?????? ??????
                            <QuestionMark color={'white'} />
                        </span>

                        <TradeNum>{`${numberToKR(stockInfo.stck_prpr * calculation.quantity(params.id))}???`}</TradeNum>
                    </ItemContainer>
                </Tooltip>
                <Tooltip text={described.averageUnitPrice}>
                    <ItemContainer>
                        <span>
                            ?????????
                            <QuestionMark color={'white'} />
                        </span>
                        <TradeNum>{`${numberToKR(calculation.averageUnitPrice(params.id))}???`}</TradeNum>
                    </ItemContainer>
                </Tooltip>
                <Tooltip text={described.averageSellPrice}>
                    <ItemContainer>
                        <span>
                            ?????? ?????????
                            <QuestionMark color={'white'} />
                        </span>
                        <TradeNum>{`${numberToKR(calculation.averageSellPrice(params.id))}???`}</TradeNum>
                    </ItemContainer>
                </Tooltip>
                <Tooltip text={described.numberOfBuy}>
                    <ItemContainer>
                        <span>
                            ?????? ??????
                            <QuestionMark color={'white'} />
                        </span>
                        <TradeNum>{`${commaGenerator(calculation.numberOfBuy(params.id))}???`}</TradeNum>
                    </ItemContainer>
                </Tooltip>
                <Tooltip text={described.numberOfSell}>
                    <ItemContainer>
                        <span>
                            ?????? ??????
                            <QuestionMark color={'white'} />
                        </span>
                        <TradeNum>{`${commaGenerator(calculation.numberOfSell(params.id))}???`}</TradeNum>
                    </ItemContainer>
                </Tooltip>
                <Tooltip text={described.incomeStatement}>
                    <ItemContainer>
                        <span>
                            ??????
                            <QuestionMark color={'white'} />
                        </span>
                        <TradeNum>{`${
                            calculation.incomeStatement(params.id, stockInfo.stck_prpr) >= 0
                                ? numberToKR(calculation.incomeStatement(params.id, stockInfo.stck_prpr))
                                : `-${numberToKR(Math.abs(calculation.incomeStatement(params.id, stockInfo.stck_prpr)))}`
                        }???`}</TradeNum>
                    </ItemContainer>
                </Tooltip>
            </TradingContainer>
        </Section>
    );
};

export default Info;
