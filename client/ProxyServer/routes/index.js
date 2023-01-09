const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const APP_KEY = process.env.APP_KEY;
const API_APP_SECRET = process.env.API_APP_SECRET;

// Init cache
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

        // Log the request to the public API
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-price?${params}`);
            console.log(stockHeaders);
        }

        res.status(200).json(data);
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

        // Log the request to the public API
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

        // Log the request to the public API
        if (process.env.NODE_ENV !== 'production') {
            // console.log(`REQUEST: ${API_BASE_URL}/uapi/domestic-stock/v1/quotations/inquire-investor?${params}`);
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
