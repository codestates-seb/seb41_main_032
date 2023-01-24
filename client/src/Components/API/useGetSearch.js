import axios from 'axios';
import { useEffect, useState } from 'react';

// 레거시 코드 => reactQuery로 전환

/**
 * 네이버뉴스 검색API 입니다
 * @author 이중원
 * @param {string} Parameters1 query parameter를 넣어주세요
 * @returns [news, setNews]
 * @see https://developers.naver.com/docs/serviceapi/search/news/news.md#http-%EB%A9%94%EC%84%9C%EB%93%9C
 */
const useGetSearchNews = (searchWord) => {
    const [data, setData] = useState();
    const [keyword, setKeyword] = useState(searchWord);

    const BaseUrl = `http://localhost:5000/api/search/news`;
    const parameters = `?query=${keyword}&display=100&start=1&sort=date`;
    useEffect(() => {
        axios
            .get(`${BaseUrl}${parameters}`)
            .then((res) => {
                setData(res.data.items);
            })
            .catch((e) => console.error(e));
    }, [keyword]);
    return [data, setData, keyword, setKeyword];
};

export default useGetSearchNews;
