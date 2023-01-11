package mainproject.stocksite.domain.stock.Domestic.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static mainproject.stocksite.domain.stock.AccessToken.controller.AccessTokenController.accessToken;
import static mainproject.stocksite.domain.stock.AccessToken.dto.AccessTokenRequestDto.appKey;
import static mainproject.stocksite.domain.stock.AccessToken.dto.AccessTokenRequestDto.appSecret;

@RestController
@RequestMapping("/stock")
public class DomesticStockController {

    // 국내 주식 현재가 시세 조회
    @GetMapping("domestic/present-quotations")
    public ResponseEntity getPresentDomesticStockQuotationsInfo(@RequestParam("FID_INPUT_ISCD") String FID_INPUT_ISCD) {

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
        requestHeaders.set("tr_id", "FHKST01010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", FID_INPUT_ISCD)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response =
                restTemplate.exchange(
                        uriBuilder.toString(),
                        HttpMethod.GET,
                        requestMessage,
                        Object.class
                );

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    // 국내 주식 기간별 시세 조회 (일/주/월/년)
    @GetMapping("domestic/quotations-by-period")
    public ResponseEntity getDomesticStockQuotationsByPeriodInfo(
            @RequestParam("FID_INPUT_ISCD") String FID_INPUT_ISCD,
            @RequestParam("FID_INPUT_DATE_1") String FID_INPUT_DATE_1,
            @RequestParam("FID_INPUT_DATE_2") String FID_INPUT_DATE_2,
            @RequestParam("FID_PERIOD_DIV_CODE") String FID_PERIOD_DIV_CODE,
            @RequestParam("FID_ORG_ADJ_PRC") String FID_ORG_ADJ_PRC) {

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("authorization", "Bearer " + accessToken);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
        requestHeaders.set("tr_id", "FHKST01010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", FID_INPUT_ISCD)
                .queryParam("FID_INPUT_DATE_1", FID_INPUT_DATE_1)
                .queryParam("FID_INPUT_DATE_2", FID_INPUT_DATE_2)
                .queryParam("FID_PERIOD_DIV_CODE", FID_PERIOD_DIV_CODE)
                .queryParam("FID_ORG_ADJ_PRC", FID_ORG_ADJ_PRC)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response =
                restTemplate.exchange(
                        uriBuilder.toString(),
                        HttpMethod.GET,
                        requestMessage,
                        Object.class
                );

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }

    // 국내 휴장일 조회
    @GetMapping("domestic/holiday-status")
    public ResponseEntity checkHolidayOfDomesticStock(@RequestParam("BASS_DT") String BASS_DT) {

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
                .queryParam("BASS_DT", BASS_DT)
                .queryParam("CTX_AREA_NK", (Object) null)
                .queryParam("CTX_AREA_FK", (Object) null)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response =
                restTemplate.exchange(
                        uriBuilder.toString(),
                        HttpMethod.GET,
                        requestMessage,
                        Object.class
                );

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }
}
