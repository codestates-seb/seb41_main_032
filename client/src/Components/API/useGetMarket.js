import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetMarket = (Parameters) => {
    const BaseUrl = `https://apis.data.go.kr/1160100/service/GetMarketIndexInfoService/getStockMarketIndex`;
    const ServiceKey = `BxKAHdz8i5/txBemh6MnIja9Y88GL/pcu7GIF7sX/dLRu60mOvs8S03wHbx/M2TDI5HhMZ9q5z1fkku1Ax5UEg==`;
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`${BaseUrl}?serviceKey=${ServiceKey}${Parameters}`).then((res) => {
            setData(res.data.response.body.items.item);
        });
    }, []);
    return [data, setData];
};

export default useGetMarket;
