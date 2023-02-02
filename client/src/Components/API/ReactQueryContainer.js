import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import notify from '../Function/notify';
import { userInfo } from '../Function/userInfo';

/**
 * React-Query에 사용될 api, 함수, useQuery 입니다
 * 문제있으면 연락주세요
 * @author 이중원
 */

/** <------------------ 공통적으로 사용되는 전역 변수,함수 ------------------>  */

// 서버 리스트(로드밸런서를 위한)
const API_URL_LIST = [process.env.REACT_APP_API_URL, process.env.REACT_APP_API_URL2];

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
const useAPI = () => {
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const getIndexKOSPI = () => {
        return axios.get(`${API_URL_LIST[pointer]}/stock/index/KOSPI`);
    };

    const getIndexKOSDAQ = () => {
        return axios.get(`${API_URL_LIST[pointer]}/stock/index/KOSDAQ`);
    };

    const getKOSPIList = () => {
        return axios.get(`${API_URL_LIST[pointer]}/stock/list/KOSPI`);
    };

    const getKOSDAQList = () => {
        return axios.get(`${API_URL_LIST[pointer]}/stock/list/KOSDAQ`);
    };

    const getStockDetails = (stockCode) => {
        if (!stockCode) return;
        return axios.get(`${API_URL_LIST[pointer]}/domestic-stock/quotations/${stockCode}`);
    };

    const getStockInvestor = (stockCode) => {
        if (!stockCode) return;
        return axios.get(`${API_URL_LIST[pointer]}/domestic-stock/investors/${stockCode}`);
    };

    const getStockDayList = (stockCode) => {
        if (!stockCode) return;
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
        if (!searchWord) return;
        return axios.get(`${API_URL_LIST[pointer]}/stock-news?search=${searchWord}&count=100&start=1&sort=date`);
    };

    const getBookMarks = () => {
        if (!memberId) return;
        return axios.get(`${API_URL_LIST[pointer]}/bookmarks/member/${memberId}`);
    };

    const addBookMarks = (data) => {
        if (!data) return;
        data.memberId = memberId;
        return axios.post(`${API_URL_LIST[pointer]}/bookmarks`, data);
    };

    const removeBookMarks = (bookmarkId) => {
        if (!bookmarkId) return;
        return axios.delete(`${API_URL_LIST[pointer]}/bookmarks/${bookmarkId}`);
    };

    const postLogin = (user) => {
        if (!user) return;
        return axios.post(`${API_URL_LIST[pointer]}/user/login`, user);
    };

    const getMember = () => {
        if (!memberId) return;
        return axios.get(`${API_URL_LIST[pointer]}/members/${memberId}`);
    };

    const getIsOpen = () => {
        let date = new Date();
        date.setDate(date.getDate());
        const toDay = `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
        return axios.get(`${API_URL_LIST[pointer]}/domestic-stock/holidays/${toDay}`);
    };

    const getTradeInfo = () => {
        if (!memberId) return;
        return axios.get(`${API_URL_LIST[pointer]}/trade/info/${memberId}`);
    };

    const postTrade = (order) => {
        if (!order) return;
        return axios.post(`${API_URL_LIST[pointer]}/trade`, order);
    };

    const getBoards = () => {
        return axios.get(`${API_URL_LIST[pointer]}/boards`);
    };
    const getComment = (boardId) => {
        return axios.get(`${API_URL_LIST[pointer]}/comments?board=${boardId}`);
    };

    const list = {
        getIndexKOSPI,
        getIndexKOSDAQ,
        getKOSPIList,
        getKOSDAQList,
        getStockDetails,
        getStockInvestor,
        getStockDayList,
        getSearchNews,
        getBookMarks,
        addBookMarks,
        removeBookMarks,
        postLogin,
        getMember,
        getIsOpen,
        getTradeInfo,
        postTrade,
        getBoards,
        getComment,
    };

    return list;
};

/** <------------------- useQuery ------------------->  */

export const useIndexKOSPI = () => {
    const API = useAPI();
    const { data, refetch } = useQuery(['KOSPI'], () => API.getIndexKOSPI(), {
        retry: 0, // 재요청 횟수 지정 => 0으로 지정한 이유는 에러발생시 바로 balancer(refetch)로 다른 서버에 요청하기 위함 => 에러가 발생한 서버는 문제&트레픽 과부하가 있다고 가정
        staleTime: Infinity, // fresh 상태 무한대로 유지 => 캐시에 항상 남아있음
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data[0],
    });
    return data;
};

export const useIndexKOSDAQ = () => {
    const API = useAPI();
    const { data, refetch } = useQuery(['KOSDAQ'], () => API.getIndexKOSDAQ(), {
        retry: 0,
        staleTime: Infinity,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data[0],
    });
    return data;
};

export const useKOSPIList = () => {
    const API = useAPI();

    const { data, refetch } = useQuery(['KOSPI-List'], () => API.getKOSPIList(), {
        retry: 0,
        staleTime: Infinity,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => {
            const map = new Map();
            const pivot = data.data[0].basDt; //가장 최신 데이터의 날짜
            data.data.map((el) => {
                if (el.basDt === pivot) {
                    map.set(el.srtnCd, el);
                }
            });
            let arr = Array.from(map.values());
            // const latestDateData = data.data.filter((el) => el.basDt === pivot);
            return arr;
        },
    });
    return data;
};

export const useKOSDAQList = () => {
    const API = useAPI();
    const { data, refetch } = useQuery(['KOSDAQ-List'], () => API.getKOSDAQList(), {
        retry: 0,
        staleTime: Infinity,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => {
            const map = new Map();
            const pivot = data.data[0].basDt; //가장 최신 데이터의 날짜
            data.data.map((el) => {
                if (el.basDt === pivot) {
                    map.set(el.srtnCd, el);
                }
            });
            let arr = Array.from(map.values());

            // const pivot = data.data[0].basDt; //가장 최신 데이터의 날짜
            // const latestDateData = data.data.filter((el) => el.basDt === pivot);
            // return latestDateData;
            return arr;
        },
    });
    return data;
};

export const useStockInfo = (stockCode) => {
    const API = useAPI();
    const { data, refetch } = useQuery(['stockInfo', stockCode], () => API.getStockDetails(stockCode), {
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
    const API = useAPI();
    const { data, refetch } = useQuery(['stockInvestor', stockCode], () => API.getStockInvestor(stockCode), {
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
    const API = useAPI();
    const { data, refetch } = useQuery(['StockDayList', stockCode], () => API.getStockDayList(stockCode), {
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
    const API = useAPI();
    const [keyword, setKeyword] = useState(searchWord);
    const { data: news, refetch } = useQuery(['News', keyword], () => API.getSearchNews(keyword), {
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

export const useBookMarks = () => {
    const API = useAPI();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const { data, refetch } = useQuery(['BookMarks', memberId], () => API.getBookMarks(), {
        staleTime: Infinity,
        retry: 0,
        notifyOnChangeProps: 'tracked',
        enabled: !!memberId,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data,
    });
    return data;
};
export const useAddBookMarks = () => {
    const API = useAPI();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const queryClient = useQueryClient();
    return useMutation(API.addBookMarks, {
        onSuccess: () => queryClient.invalidateQueries(['BookMarks', memberId]),
    });
};

export const useRemoveBookMarks = () => {
    const API = useAPI();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const queryClient = useQueryClient();
    return useMutation(API.removeBookMarks, {
        onSuccess: () => queryClient.invalidateQueries(['BookMarks', memberId]),
    });
};

export const useLogin = (user, keepLogin, success, error) => {
    const API = useAPI();
    const queryClient = useQueryClient();
    // Recoil 설정 useState와 사용법이 동일
    const [memberId, setMemberId] = useRecoilState(userInfo);
    return useMutation(() => API.postLogin(user), {
        onSuccess: (data) => {
            setMemberId(data.headers.memberid);
            if (keepLogin) {
                localStorage.setItem('memberId', data.headers.memberid);
                localStorage.setItem('username', user.username);
                localStorage.setItem('authorization', data.headers.authorization);
                localStorage.setItem('refresh', data.headers.refresh);
            } else {
                sessionStorage.setItem('memberId', data.headers.memberid);
                sessionStorage.setItem('username', user.username);
                sessionStorage.setItem('authorization', data.headers.authorization);
                sessionStorage.setItem('refresh', data.headers.refresh);
            }
            queryClient.invalidateQueries(['Member', memberId]);
            success(data);
            notify('Welcome to STOCK BOX', 'info');
        },
        onError: (data) => {
            error(data);
        },
    });
};

export const useMember = () => {
    const API = useAPI();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const { data, refetch } = useQuery(['Member', memberId], () => API.getMember(), {
        retry: 0,
        staleTime: Infinity,
        notifyOnChangeProps: 'tracked',
        enabled: !!memberId,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data,
    });
    return data;
};

export const useIsOpen = () => {
    const API = useAPI();
    const { data, refetch } = useQuery(['isOpen'], () => API.getIsOpen(), {
        retry: 0,
        staleTime: Infinity,
        notifyOnChangeProps: 'tracked',
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => (data.data.output[0].bzdy_yn === 'Y' ? true : false),
    });
    return data;
};

export const useTradeInfo = () => {
    const API = useAPI();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    const { data, refetch } = useQuery(['TradeInfo', memberId], () => API.getTradeInfo(), {
        retry: 0,
        staleTime: Infinity,
        notifyOnChangeProps: 'tracked',
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data,
    });
    return data;
};

export const useTrade = (success) => {
    const API = useAPI();
    const queryClient = useQueryClient();
    const [memberId, setMemberId] = useRecoilState(userInfo);
    return useMutation(API.postTrade, {
        onSuccess: () => {
            queryClient.invalidateQueries(['TradeInfo', memberId]);
            queryClient.invalidateQueries(['Member', memberId]);
            success();
        },
        onError: () => {
            notify('주문에 실패했습니다.', 'error');
        },
    });
};

export const useBoards = () => {
    const API = useAPI();
    const { data, refetch } = useQuery(['Boards'], () => API.getBoards(), {
        refetchInterval: 10000, //10초마다 업데이트
        retry: 0,
        notifyOnChangeProps: 'tracked', //랜더링 최적화 (data값이 변경안되면 랜더링 X)
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data,
    });
    return data;
};

export const useComment = (boardId) => {
    const API = useAPI();
    const { data, refetch } = useQuery(['Comment', boardId], () => API.getComment(boardId), {
        refetchInterval: 5000, //5초마다 업데이트
        retry: 0,
        onError: () => balancer(refetch),
        onSuccess: () => (count = 0),
        select: (data) => data.data,
    });
    return data;
};
