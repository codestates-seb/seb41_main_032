package mainproject.stocksite.domain.stock.detail.service;

import mainproject.stocksite.domain.config.AccessTokenRequestInfo;
import mainproject.stocksite.domain.exception.BusinessLogicException;
import mainproject.stocksite.domain.exception.ExceptionCode;
import mainproject.stocksite.domain.stock.detail.count.CountingRequest;
import mainproject.stocksite.domain.stock.detail.options.DetailedStockOptions;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.concurrent.atomic.AtomicInteger;

import static mainproject.stocksite.domain.stock.accesstoken.service.AccessTokenService.accessToken;

@Service
public class DetailedStockService {

    private final AccessTokenRequestInfo accessTokenRequestInfo;
    private final CountingRequest countingRequest;
    private final String STOCK_DEFAULT_URL = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/";

    public DetailedStockService(AccessTokenRequestInfo accessTokenRequestInfo, CountingRequest countingRequest) {
        this.accessTokenRequestInfo = accessTokenRequestInfo;
        this.countingRequest = countingRequest;
    }

    public HttpHeaders baseHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("authorization", "Bearer " + accessToken);
        headers.set("appkey", accessTokenRequestInfo.getAppKey());
        headers.set("appsecret", accessTokenRequestInfo.getAppSecret());
        return headers;
    }

    public String findPresentQuotations(String stockCode) throws InterruptedException {
        AtomicInteger count = countingRequest.getCountOfRequest();

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("tr_id", "FHKST01010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "inquire-price";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .build();

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response;

        try {
            count.getAndIncrement();

            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    String.class
            );

            return response.getBody();

        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");
            String errorCode = errorMessage[8];

            switch (errorCode) {
                case "EGW00001":    // 일시적인 오류
                    throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
                case "EGW00002":    // 서버 에러
                    throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
                case "EGW00121":    // 유효하지 않은 토큰
                    throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
                case "EGW00201":    // 초당 거래건수 초과
                    if (countingRequest.checkCountOfRequest(count)) {
                        Thread.sleep(1000);
                        findPresentQuotations(stockCode);
                    } else {
                        count.set(0);
                        throw new BusinessLogicException(ExceptionCode.UNABLE_TO_REQUEST_AGAIN);
                    }
                    break;
            }
        }

        return null;
    }

    public String findInvestors(String stockCode) throws InterruptedException {
        AtomicInteger count = countingRequest.getCountOfRequest();

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("tr_id", "FHKST01010900");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "inquire-investor";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .build();

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response;

        try {
            count.getAndIncrement();

            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    String.class
            );

            return response.getBody();

        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");
            String errorCode = errorMessage[8];

            switch (errorCode) {
                case "EGW00001":    // 일시적인 오류
                    throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
                case "EGW00002":    // 서버 에러
                    throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
                case "EGW00121":    // 유효하지 않은 토큰
                    throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
                case "EGW00201":    // 초당 거래건수 초과
                    if (countingRequest.checkCountOfRequest(count)) {
                        Thread.sleep(1000);
                        findInvestors(stockCode);
                    } else {
                        count.set(0);
                        throw new BusinessLogicException(ExceptionCode.UNABLE_TO_REQUEST_AGAIN);
                    }
                    break;
            }
        }

        return null;
    }

    public String findQuotationsByPeriod(String stockCode, DetailedStockOptions detailedStockOptions) throws InterruptedException {
        AtomicInteger count = countingRequest.getCountOfRequest();

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("tr_id", "FHKST03010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "inquire-daily-itemchartprice";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .queryParam("FID_INPUT_DATE_1", detailedStockOptions.getStartDay())
                .queryParam("FID_INPUT_DATE_2", detailedStockOptions.getEndDay())
                .queryParam("FID_PERIOD_DIV_CODE", detailedStockOptions.getPeriodCode())
                .queryParam("FID_ORG_ADJ_PRC", detailedStockOptions.getCode())
                .build();

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response;

        try {
            count.getAndIncrement();

            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    String.class
            );

            return response.getBody();

        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");
            String errorCode = errorMessage[8];

            switch (errorCode) {
                case "EGW00001":    // 일시적인 오류
                    throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
                case "EGW00002":    // 서버 에러
                    throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
                case "EGW00121":    // 유효하지 않은 토큰
                    throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
                case "EGW00201":    // 초당 거래건수 초과
                    if (countingRequest.checkCountOfRequest(count)) {
                        Thread.sleep(1000);
                        findQuotationsByPeriod(stockCode, detailedStockOptions);
                    } else {
                        count.set(0);
                        throw new BusinessLogicException(ExceptionCode.UNABLE_TO_REQUEST_AGAIN);
                    }
                    break;
            }
        }

        return null;
    }

    public String findHolidays(String baseDate) throws InterruptedException {
        AtomicInteger count = countingRequest.getCountOfRequest();

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("tr_id", "CTCA0903R");
        requestHeaders.set("custtype", "P");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "chk-holiday";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("BASS_DT", baseDate)
                .queryParam("CTX_AREA_NK", (Object) null)
                .queryParam("CTX_AREA_FK", (Object) null)
                .build();

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response;

        try {
            count.getAndIncrement();

            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    String.class
            );

            return response.getBody();

        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");
            String errorCode = errorMessage[8];

            switch (errorCode) {
                case "EGW00001":    // 일시적인 오류
                    throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
                case "EGW00002":    // 서버 에러
                    throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
                case "EGW00121":    // 유효하지 않은 토큰
                    throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
                case "EGW00201":    // 초당 거래건수 초과
                    if (countingRequest.checkCountOfRequest(count)) {
                        Thread.sleep(1000);
                        findHolidays(baseDate);
                    } else {
                        count.set(0);
                        throw new BusinessLogicException(ExceptionCode.UNABLE_TO_REQUEST_AGAIN);
                    }
                    break;
            }
        }

        return null;
    }
}
