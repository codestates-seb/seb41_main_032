import axios from 'axios';
import { useEffect, useState } from 'react';

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
                    if (res1.data.response) {
                        if (sort) setKOSPI(sort(res1.data.response.body.items.item, compare, length));
                        else setKOSPI(res1.data.response.body.items.item, compare, length);
                    } else return null;

                    if (res2.data.response) {
                        if (sort) setKOSDAQ(sort(res2.data.response.body.items.item, compare, length));
                        else setKOSDAQ(res2.data.response.body.items.item, compare, length);
                    } else return null;
                }),
            )
            .catch((el) => console.error(el));
    }, []);
    return [KOSPI, setKOSPI, KOSDAQ, setKOSDAQ];
};

export default useGetStockList;
