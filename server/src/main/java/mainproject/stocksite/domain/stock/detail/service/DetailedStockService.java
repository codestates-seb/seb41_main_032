package mainproject.stocksite.domain.stock.detail.service;

import mainproject.stocksite.domain.exception.ExceptionCode;
import mainproject.stocksite.domain.stock.accesstoken.dto.AccessTokenRequestInfo;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static mainproject.stocksite.domain.stock.accesstoken.service.AccessTokenService.accessToken;

// try-catch문 리팩토링 필요
@Service
public class DetailedStockService {

    private static int countOfRequest;

    private final AccessTokenRequestInfo accessTokenRequestInfo;

    public DetailedStockService(AccessTokenRequestInfo accessTokenRequestInfo) {
        this.accessTokenRequestInfo = accessTokenRequestInfo;
    }

    public ResponseEntity<Object> findPresentQuotations(String stockCode) throws InterruptedException {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", accessTokenRequestInfo.getAppKey());
        requestHeaders.set("appsecret", accessTokenRequestInfo.getAppSecret());
        requestHeaders.set("tr_id", "FHKST01010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response = null;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    Object.class
            );
        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");

            if (errorMessage[11].equals("초당 거래건수를 초과하였습니다.")) {
                if (countOfRequest == 2) {
                    countOfRequest = 0;
                    return new ResponseEntity<>(ExceptionCode.UNABLE_TO_REQUEST_AGAIN.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
                } else if (countOfRequest < 2) {
                    Thread.sleep(1000);
                    countOfRequest++;
                    findPresentQuotations(stockCode);
                }
            }
        }
        assert response != null;

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    public ResponseEntity<Object> findInvestors(String stockCode) throws InterruptedException {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", accessTokenRequestInfo.getAppKey());
        requestHeaders.set("appsecret", accessTokenRequestInfo.getAppSecret());
        requestHeaders.set("tr_id", "FHKST01010900");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-investor";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response = null;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    Object.class
            );
        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");

            if (errorMessage[11].equals("초당 거래건수를 초과하였습니다.")) {
                if (countOfRequest == 2) {
                    countOfRequest = 0;
                    return new ResponseEntity<>(ExceptionCode.UNABLE_TO_REQUEST_AGAIN.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
                } else if (countOfRequest < 2) {
                    Thread.sleep(1000);
                    countOfRequest++;
                    findInvestors(stockCode);
                }
            }
        }
        assert response != null;

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    // 수정 사항
    public ResponseEntity<Object> findQuotationsByPeriod(String stockCode, String startDay, String endDay, String periodCode, String code) throws InterruptedException {

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", accessTokenRequestInfo.getAppKey());
        requestHeaders.set("appsecret", accessTokenRequestInfo.getAppSecret());
        requestHeaders.set("tr_id", "FHKST03010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .queryParam("FID_INPUT_DATE_1", startDay)
                .queryParam("FID_INPUT_DATE_2", endDay)
                .queryParam("FID_PERIOD_DIV_CODE", periodCode)
                .queryParam("FID_ORG_ADJ_PRC", code)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response = null;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    Object.class
            );
        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");

            if (errorMessage[11].equals("초당 거래건수를 초과하였습니다.")) {
                if (countOfRequest == 2) {
                    countOfRequest = 0;
                    return new ResponseEntity<>(ExceptionCode.UNABLE_TO_REQUEST_AGAIN.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
                } else if (countOfRequest < 2) {
                    Thread.sleep(1000);
                    countOfRequest++;
                    findQuotationsByPeriod(stockCode, startDay, endDay, periodCode, code);
                }
            }
        }
        assert response != null;

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    public ResponseEntity<Object> findHolidays(String baseDate) throws InterruptedException {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", accessTokenRequestInfo.getAppKey());
        requestHeaders.set("appsecret", accessTokenRequestInfo.getAppSecret());
        requestHeaders.set("tr_id", "CTCA0903R");
        requestHeaders.set("custtype", "P");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/chk-holiday";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("BASS_DT", baseDate)
                .queryParam("CTX_AREA_NK", (Object) null)
                .queryParam("CTX_AREA_FK", (Object) null)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response = null;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    Object.class
            );
        } catch (Exception e) {
            String[] errorMessage = e.getMessage().split("\"");

            if (errorMessage[11].equals("초당 거래건수를 초과하였습니다.")) {
                if (countOfRequest == 2) {
                    countOfRequest = 0;
                    return new ResponseEntity<>(ExceptionCode.UNABLE_TO_REQUEST_AGAIN.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
                } else if (countOfRequest < 2) {
                    Thread.sleep(1000);
                    countOfRequest++;
                    findHolidays(baseDate);
                }
            }
        }
        assert response != null;

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }
}
