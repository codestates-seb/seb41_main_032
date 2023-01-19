import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * 네이버뉴스 검색API 입니다
 * @author 이중원
 * @param {string} Parameters1 query parameter를 넣어주세요
 * @returns [news, setNews]
 * @see https://developers.naver.com/docs/serviceapi/search/news/news.md#http-%EB%A9%94%EC%84%9C%EB%93%9C
 */
const useGetSearchNews = (Parameters) => {
    const [data, setData] = useState();
    const BaseUrl = `http://localhost:5000/api/search/news`;
    useEffect(() => {
        axios
            .get(`${BaseUrl}${Parameters}`)
            .then((res) => {
                setData(res.data.items);
            })
            .catch((e) => console.error(e));
    }, [BaseUrl, Parameters]);
    return [data, setData];
};

export default useGetSearchNews;
