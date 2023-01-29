import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useAddBookMarks, useRemoveBookMarks } from '../../../../Components/API/ReactQueryContainer';
import notify from '../../../../Components/Function/notify';
import { userInfo } from '../../../../Components/Function/userInfo';
import DisableImg from '../../../../Components/Img/Favorites/black.png';
import ActivateImg from '../../../../Components/Img/Favorites/gold.png';
const ItemList = styled.ul`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    list-style: none;
    margin-top: 20px;
`;

const ItemBox = styled.li`
    height: 80px;
    border-bottom: 1px solid rgb(193, 195, 197);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 5px;
    padding: 0px 10px;
    h3 {
        font-size: 1.2em;
        font-weight: 600;
    }
    p {
        font-size: 0.8em;
        margin-top: 10px;
        span {
            margin-left: 5px;
            color: #878787;
        }
    }

    button {
        background-color: transparent;
        cursor: pointer;
        width: 50px;
        height: 50px;
        img {
            width: 20px;
            height: 20px;
        }
    }
`;

const StockList = ({ data, bookMarks, select }) => {
    const { mutate: addBookMarks } = useAddBookMarks();
    const { mutate: removeBookMarks } = useRemoveBookMarks();
    const [memberId, setMemberId] = useRecoilState(userInfo);

    const handlerBookmark = (stockCode, stockName) => {
        if (!memberId) {
            notify('로그인 후 이용해주세요', 'warning');
            return;
        }
        const isActivate = bookMarks?.find((e) => e.stockCode === stockCode);
        if (isActivate) {
            removeBookMarks(isActivate.bookmarkId);
        } else {
            const bookmark = {
                stockCode,
                stockName,
            };
            addBookMarks(bookmark);
        }
    };
    return (
        <>
            {select === 'stock' ? (
                <ItemList>
                    {data?.map((el) => (
                        <ItemBox key={el.srtnCd}>
                            <div>
                                <h3>{el.itmsNm}</h3>
                                <p>
                                    {el.srtnCd}
                                    <span>{el.mrktCtg}</span>
                                </p>
                            </div>
                            <button onClick={() => handlerBookmark(el.srtnCd, el.itmsNm)}>
                                <img src={bookMarks?.find((e) => e.stockCode === el.srtnCd) ? ActivateImg : DisableImg} alt="bookmark" />
                            </button>
                        </ItemBox>
                    ))}
                </ItemList>
            ) : (
                <ItemList>
                    {data?.map((el, index) => (
                        <ItemBox key={index}>
                            <div>
                                <h3>{el.stockName}</h3>
                                <p>{el.stockCode}</p>
                            </div>
                            <button>
                                <img src={ActivateImg} alt="bookmark" onClick={() => handlerBookmark(el.stockCode, el.stockName)} />
                            </button>
                        </ItemBox>
                    ))}
                </ItemList>
            )}
        </>
    );
};

export default StockList;
