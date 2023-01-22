/**
 * cors를 해결하기 위한 임시로 만든 프록시 서버입니다
 * 문제가 있으시면 연락주세요
 * @author 이중원
 */

const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// 환경 변수
const API_BASE_URL = process.env.API_BASE_URL;
const APP_KEY = process.env.APP_KEY;
const API_APP_SECRET = process.env.API_APP_SECRET;

// 캐시
let cache = apicache.middleware;

const tokenBody = {
    grant_type: 'client_credentials',
    appkey: APP_KEY,
    appsecret: API_APP_SECRET,
};

router.get('/', cache('1 minutes'), async (req, res, next) => {
    try {
        const token = await needle('post', `${API_BASE_URL}/oauth2/tokenP`, tokenBody, { json: true });
        const stockHeaders = {
            headers: {
                authorization: `Bearer ${token.body.access_token}`,
                appkey: APP_KEY,
                appsecret: API_APP_SECRET,
                tr_id: 'FHKST01010100',
            },
        };

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
        });
        const apiRes = await needle('get', `${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price?${params}`, null, stockHeaders);
        const data = apiRes.body;

        // API에 대한 요청 기록
        if (process.env.NODE_ENV !== 'production') {
            // console.log(`REQUEST: ${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price?${params}`);
        }
        res.status(503).json('Your requests are exceeded');
    } catch (error) {
        next(error);
    }
});

// 국내주식기간별시세(일/주/월/년)[v1_국내주식-016]
router.get('/day', cache('1 minutes'), async (req, res, next) => {
    try {
        const token = await needle('post', `${API_BASE_URL}/oauth2/tokenP`, tokenBody, { json: true });
        const stockHeaders = {
            headers: {
                authorization: `Bearer ${token.body.access_token}`,
                appkey: APP_KEY,
                appsecret: API_APP_SECRET,
                tr_id: 'FHKST03010100',
                custtype: 'P',
            },
        };

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
        });
        const apiRes = await needle('get', `${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?${params}`, null, stockHeaders);
        const data = apiRes.body;

        // API에 대한 요청 기록
        if (process.env.NODE_ENV !== 'production') {
            // console.log(`REQUEST: ${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice?${params}`);
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// 주식 현재가 투자자
router.get('/investor', cache('1 minutes'), async (req, res, next) => {
    try {
        const token = await needle('post', `${API_BASE_URL}/oauth2/tokenP`, tokenBody, { json: true });
        const stockHeaders = {
            headers: {
                authorization: `Bearer ${token.body.access_token}`,
                appkey: APP_KEY,
                appsecret: API_APP_SECRET,
                tr_id: 'FHKST01010900',
                custtype: 'P',
            },
        };

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
        });
        const apiRes = await needle('get', `${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-investor?${params}`, null, stockHeaders);
        const data = apiRes.body;

        // API에 대한 요청 기록
        if (process.env.NODE_ENV !== 'production') {
            // console.log(`REQUEST: ${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-investor?${params}`);
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// 네이버 뉴스 검색 api
router.get('/search/news', cache('1 minutes'), async (req, res, next) => {
    try {
        const newsHeaders = {
            headers: {
                'Content-Type': 'application/json',
                'X-Naver-Client-Id': 'DOzP6QlCZ1sB1weHWoqa',
                'X-Naver-Client-Secret': 'hkRLPnoHV3',
            },
        };

        const params = new URLSearchParams({
            ...url.parse(req.url, true).query,
        });
        const apiRes = await needle('get', `https://openapi.naver.com/v1/search/news?${params}`, null, newsHeaders);
        const data = apiRes.body;

        // API에 대한 요청 기록
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: https://openapi.naver.com/v1/search/news?${params}`);
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
