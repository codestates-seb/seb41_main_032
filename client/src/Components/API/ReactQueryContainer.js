import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { userInfo } from '../Function/userInfo';

/**
 * React-Query에 사용될 api, 함수, useQuery 입니다
 * 문제있으면 연락주세요
 * @author 이중원
 */

/** <------------------ 공통적으로 사용되는 전역 변수,함수 ------------------>  */

// 7일전 날짜 => 정부 api 정보업데이트가 느림 => 7일전부터 오늘날짜까지의 데이터 요청용
let date = new Date();
date.setDate(date.getDate() - 7);
const day = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;

// 서버 리스트(로드밸런서를 위한)
const API_URL_LIST = [process.env.REACT_APP_API_URL, process.env.REACT_APP_API_URL];

// 서버를 가리키는 포인터
let pointer = Math.floor(Math.random() * API_URL_LIST.length);

// 재요청 무한루프에 빠지는것을 막아줄 변수
let count = 0;

// 가리키고있는 서버를 바꾸는 함수
const handlerPointer = () => {
    if (pointer === API_URL_LIST.length - 1) pointer = 0;
    pointer++;
};

// 에러시 서버를 바꿔서 재요청
const balancer = (refetch) => {
    if (count >= API_URL_LIST.length) return null;
    count++;
    handlerPointer();
    refetch();
};

/** <------------------- API ------------------->  */

const getIndexKOSPI = () => {
    return axios.get(
        `${process.env.REACT_APP_INDEX_API_URL}?serviceKey=${process.env.REACT_APP_INDEX_API_KEY}&numOfRows=5&pageNo=1&resultType=json&beginBasDt=${day}&idxNm=코스피`,
    );
};

const getIndexKOSDAQ = () => {
    return axios.get(
        `${process.env.REACT_APP_INDEX_API_URL}?serviceKey=${process.env.REACT_APP_INDEX_API_KEY}&numOfRows=5&pageNo=1&resultType=json&beginBasDt=${day}&idxNm=코스닥`,
    );
};

const getKOSPIList = () => {
    return axios.get(
        `${process.env.REACT_APP_STOCK_LIST_API_URL}?serviceKey=${process.env.REACT_APP_STOCK_LIST_API_KEY}&numOfRows=1000&pageNo=1&resultType=json&beginBasDt=${day}&mrktCls=KOSPI`,
    );
};

const getKOSDAQList = () => {
    return axios.get(
        `${process.env.REACT_APP_STOCK_LIST_API_URL}?serviceKey=${process.env.REACT_APP_STOCK_LIST_API_KEY}&numOfRows=2000&pageNo=1&resultType=json&beginBasDt=${day}&mrktCls=KOSDAQ`,
    );
};

const getStockDetails = (stockCode) => {
    return axios.get(`${API_URL_LIST[pointer]}/domestic-stock/quotations/${stockCode}`);
};

const getStockInvestor = (stockCode) => {
    return axios.get(`${API_URL_LIST[pointer]}/domestic-stock/investors/${stockCode}`);
};

const getStockDayList = (stockCode) => {
    // 오늘부터 100일전까지의 주식정보 데이터를 가져옴
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 100);
    const Start = `${startDate.getFullYear()}${('0' + (startDate.getMonth() + 1)).slice(-2)}${('0' + startDate.getDate()).slice(-2)}`;

    let endDate = new Date();
    endDate.setDate(endDate.getDate());
    const EndDate = `${endDate.getFullYear()}${('0' + (endDate.getMonth() + 1)).slice(-2)}${('0' + endDate.getDate()).slice(-2)}`;

    return axios.get(`${API_URL_LIST[pointer]}/domestic-stock/quotations/${stockCode}/day?start=${Start}&end=${EndDate}&period-code=D&code=0`);
};

const getSearchNews = (searchWord) => {
    return axios.get(`${API_URL_LIST[pointer]}/stock-news?search=${searchWord}&count=100&start=1&sort=date`);
};

const getBookMarks = (memberId) => {
    return axios.get(`${API_URL_LIST[pointer]}/bookmarks/member/${memberId}`);
};

const addBookMarks = (data) => {
    return axios.post(`${API_URL_LIST[pointer]}/bookmarks`, data);
};

const removeBookMarks = (bookmarkId) => {
    return axios.delete(`${API_URL_LIST[pointer]}/bookmarks/${bookmarkId}`);
};

const postLogin = (user) => {
    return axios.post(`${API_URL_LIST[pointer]}/user/login`, user);
};

const getMember = (memberId) => {
    return axios.get(`${API_URL_LIST[pointer]}/members/${memberId}`);
};

/** <------------------- useQuery ------------------->  */

export const useIndexKOSPI = () => {
    const { data, refetch } = useQuery(['KOSPI'], () => getIndexKOSPI(), {
        retry: 0, // 재요청 횟수 지정 => 0으로 지정한 이유는 에러발생시 바로 balancer(refetch)로 다른 서버에 요청하기 위함 => 에러가 발생한 서버는 문제&트레픽 과부하가 있다고 가정
        staleTime: Infinity, // fresh 상태 무한대로 유지 => 캐시에 항상 남아있음
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data.response.body.items.item[0],
    });
    return data;
};

export const useIndexKOSDAQ = () => {
    const { data, refetch } = useQuery(['KOSDAQ'], () => getIndexKOSDAQ(), {
        retry: 0,
        staleTime: Infinity,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data.response.body.items.item[0],
    });
    return data;
};

export const useKOSPIList = () => {
    const { data, refetch } = useQuery(['KOSPI-List'], () => getKOSPIList(), {
        retry: 0,
        staleTime: Infinity,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => {
            const pivot = data.data.response.body.items.item[0].basDt; //가장 최신 데이터의 날짜
            const latestDateData = data.data.response.body.items.item.filter((el) => el.basDt === pivot);
            return latestDateData;
        },
    });
    return data;
};

export const useKOSDAQList = () => {
    const { data, refetch } = useQuery(['KOSDAQ-List'], () => getKOSDAQList(), {
        retry: 0,
        staleTime: Infinity,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => {
            const pivot = data.data.response.body.items.item[0].basDt;
            const latestDateData = data.data.response.body.items.item.filter((el) => el.basDt === pivot);
            return latestDateData;
        },
    });

    return data;
};

export const useStockInfo = (stockCode) => {
    const { data, refetch } = useQuery(['stockInfo', stockCode], () => getStockDetails(stockCode), {
        refetchInterval: 10000, //10초마다 업데이트
        retry: 0,
        notifyOnChangeProps: 'tracked', //랜더링 최적화 (data값이 변경안되면 랜더링 X)
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data.output,
    });

    return data;
};

export const useStockInvestor = (stockCode) => {
    const { data, refetch } = useQuery(['stockInvestor', stockCode], () => getStockInvestor(stockCode), {
        staleTime: 600000, // fresh 상태 10분동안 유지
        retry: 0,
        notifyOnChangeProps: 'tracked',
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data.output,
    });
    return data;
};

export const useStockDayList = (stockCode) => {
    const { data, refetch } = useQuery(['StockDayList', stockCode], () => getStockDayList(stockCode), {
        staleTime: 600000, // fresh 상태 10분동안 유지
        retry: 0,
        notifyOnChangeProps: 'tracked',
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => {
            return data.data.output2;
        },
    });
    return data;
};

export const useSearchNews = (searchWord) => {
    const [keyword, setKeyword] = useState(searchWord);
    const { data: news, refetch } = useQuery(['News', keyword], () => getSearchNews(keyword), {
        refetchInterval: 30000, //30초마다 업데이트
        retry: 0,
        notifyOnChangeProps: 'tracked',
        keepPreviousData: true, //새로운 데이터가 들어올때까지 이전데이터를 보여줌(검색시 깜빡임 방지)
        enabled: !!keyword,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data.items,
    });
    return { news, keyword, setKeyword };
};

export const useBookMarks = (memberId) => {
    const { data, refetch } = useQuery('BookMarks', () => getBookMarks(memberId), {
        staleTime: Infinity,
        retry: 0,
        notifyOnChangeProps: 'tracked',
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data,
    });
    return data;
};
export const useAddBookMarks = () => {
    const queryClient = useQueryClient();
    return useMutation(addBookMarks, {
        onSuccess: () => queryClient.invalidateQueries('BookMarks'),
    });
};

export const useRemoveBookMarks = () => {
    const queryClient = useQueryClient();
    return useMutation(removeBookMarks, {
        onSuccess: () => queryClient.invalidateQueries('BookMarks'),
    });
};

export const useLogin = (user, keepLogin, success, error) => {
    const queryClient = useQueryClient();
    // Recoil 설정 useState와 사용법이 동일
    const [memberId, setMemberId] = useRecoilState(userInfo);
    return useMutation(() => postLogin(user), {
        onSuccess: (data) => {
            setMemberId(2);
            if (keepLogin) {
                localStorage.setItem('memberId', '2'); // FIXME: 임시 저장
                localStorage.setItem('username', user.username);
                localStorage.setItem('authorization', data.headers.authorization);
                localStorage.setItem('refresh', data.headers.refresh);
            } else {
                sessionStorage.setItem('memberId', '2'); // FIXME: 임시 저장
                sessionStorage.setItem('username', user.username);
                sessionStorage.setItem('authorization', data.headers.authorization);
                sessionStorage.setItem('refresh', data.headers.refresh);
            }
            queryClient.invalidateQueries('member');
            success(data);
        },
        onError: (data) => {
            error(data);
        },
    });
};

export const useMember = (memberId) => {
    const { data, refetch } = useQuery(['member'], () => getMember(memberId), {
        retry: 0,
        staleTime: Infinity,
        notifyOnChangeProps: 'tracked',
        enabled: !!memberId,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data,
    });
    return data;
};
