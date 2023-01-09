import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * 주식현재가 시세 정보를 가져오는 API 입니다
 * @param {string} Parameters query parameter를 넣어주세요
 * @type { string }
 * @return 1차원 배열안에 다수의 객체를 리턴합니다
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations#L_07802512-4f49-4486-91b4-1050b6f5dc9d
 */
export const useStockDetails = (Parameters) => {
    const [data, setData] = useState();
    const BaseUrl = `http://localhost:5000/api`;
    useEffect(() => {
        axios.get(`${BaseUrl}${Parameters}`).then((res) => {
            setData(res.data.output ? res.data.output : null);
        });
    }, []);
    return [data, setData];
};

/**
 * 국내주식기간별(1일 단위) 시세 정보를 가져오는 API 입니다
 * @param {string} Parameters query parameter를 넣어주세요
 * @type { string }
 * @return1차원 배열안에 다수의 객체를 리턴합니다
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations#L_a08c3421-e50f-4f24-b1fe-64c12f723c77
 */
export const useStockDayList = (Parameters) => {
    const [data, setData] = useState();
    const BaseUrl = `http://localhost:5000/api/day`;
    useEffect(() => {
        axios.get(`${BaseUrl}${Parameters}`).then((res) => {
            setData(res.data.output2 ? res.data.output2 : null);
        });
    }, []);
    return [data, setData];
};

/**
 * 주식의 투자자 (개인,외국인,기업의 매수,매도) 정보를 가져오는 API 입니다
 * @param {string} Parameters query parameter를 넣어주세요
 * @type { string }
 * @return 1차원 배열안에 다수의 객체를 리턴합니다
 * @see https://apiportal.koreainvestment.com/apiservice/apiservice-domestic-stock-quotations#L_a08c3421-e50f-4f24-b1fe-64c12f723c77
 */
export const useStockInvestor = (Parameters) => {
    const [data, setData] = useState();
    const BaseUrl = `http://localhost:5000/api/investor`;
    useEffect(() => {
        axios.get(`${BaseUrl}${Parameters}`).then((res) => {
            setData(res.data.output ? res.data.output : null);
        });
    }, []);
    return [data, setData];
};
