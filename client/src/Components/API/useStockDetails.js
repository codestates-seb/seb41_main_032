import axios from 'axios';
import { useEffect, useState } from 'react';

const useStockDetails = (Parameters) => {
    const [data, setData] = useState();
    const BaseUrl = `http://localhost:5000/api/`;
    useEffect(() => {
        axios.get(`${BaseUrl}${Parameters}`).then((res) => {
            setData(res.data.output ? res.data.output : null);
        });
    }, []);
    return [data, setData];
};

export default useStockDetails;
