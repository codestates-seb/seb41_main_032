package mainproject.stocksite.domain.stock.detail.Domestic.service;

import mainproject.stocksite.domain.exception.ExceptionCode;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static mainproject.stocksite.domain.stock.detail.AccessToken.dto.AccessTokenRequestInfo.appKey;
import static mainproject.stocksite.domain.stock.detail.AccessToken.dto.AccessTokenRequestInfo.appSecret;
import static mainproject.stocksite.domain.stock.detail.AccessToken.service.AccessTokenService.accessToken;

// try-catch문 리팩토링
@Service
public class DomesticStockService {

    private static int countOfRequest;

    public ResponseEntity<Object> findPresentQuotations(String itemId) throws InterruptedException {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
        requestHeaders.set("tr_id", "FHKST01010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", itemId)
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
                    findPresentQuotations(itemId);
                }
            }
        }
        assert response != null;

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    public ResponseEntity<Object> findInvestors(String itemId) throws InterruptedException {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
        requestHeaders.set("tr_id", "FHKST01010900");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-investor";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", itemId)
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
                    findInvestors(itemId);
                }
            }
        }
        assert response != null;

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    // 수정 사항
    public ResponseEntity<Object> findQuotationsByPeriod() {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    public ResponseEntity<Object> findHolidays(String baseDate) throws InterruptedException {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
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
