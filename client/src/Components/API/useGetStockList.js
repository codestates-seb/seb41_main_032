import axios from 'axios';
import { useEffect, useState } from 'react';

// 레거시 코드 => reactQuery로 전환

/**
 * 주식 리스트 정보를 가져오는 API 입니다
 *
 * 인자로 sort, compare, length를 넣어주면 정렬된 데이터를 리턴합니다
 * @author 이중원
 * @param {string} Parameters1 KOSPI query parameter를 넣어주세요
 * @param {string} Parameters2 KOSDAQ query parameter를 넣어주세요
 * @param {Function} sort 정렬를 위한 함수를 넣어주세요 (필수 X )
 * @param {string} compare 정렬할때 사용할 기준을 넣어주세요 (필수 X )
 * @param {number} length 정렬후 length길이만큼만 배열을 생성합니다 (필수 X )
 * @returns [ KOSPI, setKOSPI, KOSDAQ, setKOSDAQ ]
 * @see https://www.data.go.kr/data/15094808/openapi.do
 */
const useGetStockList = (Parameters1, Parameters2, sort, compare, length) => {
    const BaseUrl = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo`;
    const ServiceKey = `BxKAHdz8i5/txBemh6MnIja9Y88GL/pcu7GIF7sX/dLRu60mOvs8S03wHbx/M2TDI5HhMZ9q5z1fkku1Ax5UEg==`;
    const [KOSPI, setKOSPI] = useState();
    const [KOSDAQ, setKOSDAQ] = useState();
    useEffect(() => {
        axios
            .all([axios.get(`${BaseUrl}?serviceKey=${ServiceKey}${Parameters1}`), axios.get(`${BaseUrl}?serviceKey=${ServiceKey}${Parameters2}`)])
            .then(
                axios.spread((res1, res2) => {
                    if (res1.data.response.body.items) {
                        const pivot = res1.data.response.body.items.item[0].basDt; //가장 최신 데이터의 날짜
                        const data = res1.data.response.body.items.item.filter((el) => el.basDt === pivot);
                        if (sort) setKOSPI(sort(data, compare, length));
                        else setKOSPI(data);
                    } else return null;

                    if (res2.data.response.body.items) {
                        const pivot = res2.data.response.body.items.item[0].basDt; //가장 최신 데이터의 날짜
                        const data = res2.data.response.body.items.item.filter((el) => el.basDt === pivot);
                        if (sort) setKOSDAQ(sort(data, compare, length));
                        else setKOSDAQ(data);
                    } else return null;
                }),
            )
            .catch((el) => console.error(el));
    }, []);
    return [KOSPI, setKOSPI, KOSDAQ, setKOSDAQ];
};

export default useGetStockList;
