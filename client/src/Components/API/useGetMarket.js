import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * 주식 지수 정보를 가져오는 API 입니다
 * @author 이중원
 * @param {string} Parameters1 KOSPI query parameter를 넣어주세요
 * @param {string} Parameters2 KOSDAQ query parameter를 넣어주세요
 * @type { string }
 * @returns 일자별 정보중에 최신날짜의 정보를 리턴합니다
 * @see https://www.data.go.kr/data/15094807/openapi.do
 */
const useGetMarket = (Parameters1, Parameters2) => {
    const BaseUrl = `https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex`;
    const ServiceKey = `BxKAHdz8i5/txBemh6MnIja9Y88GL/pcu7GIF7sX/dLRu60mOvs8S03wHbx/M2TDI5HhMZ9q5z1fkku1Ax5UEg==`;
    const [KOSPI, setKOSPI] = useState();
    const [KOSDAQ, setKOSDAQ] = useState();
    useEffect(() => {
        axios
            .all([axios.get(`${BaseUrl}?serviceKey=${ServiceKey}${Parameters1}`), axios.get(`${BaseUrl}?serviceKey=${ServiceKey}${Parameters2}`)])
            .then(
                axios.spread((res1, res2) => {
                    if (res1.data.response.body.items) {
                        // 배열안의 객체중에 가장 최신 데이터를 추출
                        const latestData = res1.data.response.body.items.item.reduce((prev, value) => {
                            return prev.basDt > value.basDt ? prev : value;
                        });
                        setKOSPI(latestData);
                    }
                    if (res2.data.response.body.items) {
                        // 배열안의 객체중에 가장 최신 데이터를 추출
                        const latestData = res2.data.response.body.items.item.reduce((prev, value) => {
                            return prev.basDt > value.basDt ? prev : value;
                        });
                        setKOSDAQ(latestData);
                    }
                }),
            )
            .catch((e) => console.error(e));
    }, [BaseUrl, ServiceKey, Parameters1, Parameters2]);
    return [KOSPI, setKOSPI, KOSDAQ, setKOSDAQ];
};

export default useGetMarket;
