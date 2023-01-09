package mainproject.stocksite.domain.stock.Domestic.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/stock")
@CrossOrigin(originPatterns = "https://openapi.koreainvestment.com")
public class DomesticStockController {

    // 국내 주식 현재가 시세 조회
    @GetMapping("domestic/present-quotations")
    public ResponseEntity getPresentDomesticStockQuotationsInfo(
            @RequestHeader(value = "authorization") String authorization,
            @RequestHeader(value = "appkey") String appKey,
            @RequestHeader(value = "appsecret") String appSecret,
            @RequestHeader(value = "tr_id") String trId,
            @RequestParam("FID_COND_MRKT_DIV_CODE") String FID_COND_MRKT_DIV_CODE,
            @RequestParam("FID_INPUT_ISCD") String FID_INPUT_ISCD) {

        Map<String, Object> result = new LinkedHashMap<>();

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("authorization", authorization);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
        requestHeaders.set("tr_id", trId);
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", FID_COND_MRKT_DIV_CODE)
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

        result.put("responseBody", response.getBody());
        HttpStatus httpStatus = response.getStatusCode();

        if (httpStatus.is2xxSuccessful()) System.out.println("Request Successfully!");

        return new ResponseEntity<>(result, httpStatus);
    }

    // 국내 주식 기간별 시세 조회 (일/주/월/년)
    @GetMapping("domestic/quotations-by-period")
    public ResponseEntity getDomesticStockQuotationsByPeriodInfo(
            @RequestHeader(value = "content-type") String contentType,
            @RequestHeader(value = "authorization") String authorization,
            @RequestHeader(value = "appkey") String appKey,
            @RequestHeader(value = "appsecret") String appSecret,
            @RequestHeader(value = "tr_id") String trId,
            @RequestParam("FID_COND_MRKT_DIV_CODE") String FID_COND_MRKT_DIV_CODE,
            @RequestParam("FID_INPUT_ISCD") String FID_INPUT_ISCD,
            @RequestParam("FID_INPUT_DATE_1") String FID_INPUT_DATE_1,
            @RequestParam("FID_INPUT_DATE_2") String FID_INPUT_DATE_2,
            @RequestParam("FID_PERIOD_DIV_CODE") String FID_PERIOD_DIV_CODE,
            @RequestParam("FID_ORG_ADJ_PRC") String FID_ORG_ADJ_PRC) {

        Map<String, Object> result = new LinkedHashMap<>();

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("content-type", contentType);
        requestHeaders.set("authorization", authorization);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
        requestHeaders.set("tr_id", trId);
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", FID_COND_MRKT_DIV_CODE)
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

        result.put("responseBody", response.getBody());
        HttpStatus httpStatus = response.getStatusCode();

        if (httpStatus.is2xxSuccessful()) System.out.println("Request Successfully!");

        return new ResponseEntity<>(result, httpStatus);
    }

    // 국내 휴장일 조회
    @GetMapping("domestic/holiday-status")
    public ResponseEntity checkHolidayOfDomesticStock(
            @RequestHeader(value = "content-type") String contentType,
            @RequestHeader(value = "authorization") String authorization,
            @RequestHeader(value = "appkey") String appKey,
            @RequestHeader(value = "appsecret") String appSecret,
            @RequestHeader(value = "tr_id") String trId,
            @RequestHeader(value = "custtype") String custType,
            @RequestParam("BASS_DT") String BASS_DT,
            @RequestParam("CTX_AREA_NK") String CTX_AREA_NK,
            @RequestParam("CTX_AREA_FK") String CTX_AREA_FK) {

        Map<String, Object> result = new LinkedHashMap<>();

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("content-type", contentType);
        requestHeaders.set("authorization", authorization);
        requestHeaders.set("appkey", appKey);
        requestHeaders.set("appsecret", appSecret);
        requestHeaders.set("tr_id", trId);
        requestHeaders.set("custtype", custType);
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/chk-holiday";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("BASS_DT", BASS_DT)
                .queryParam("CTX_AREA_NK", CTX_AREA_NK)
                .queryParam("CTX_AREA_FK", CTX_AREA_FK)
                .build(true);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response =
                restTemplate.exchange(
                        uriBuilder.toString(),
                        HttpMethod.GET,
                        requestMessage,
                        Object.class
                );

        result.put("responseBody", response.getBody());
        HttpStatus httpStatus = response.getStatusCode();

        if (httpStatus.is2xxSuccessful()) System.out.println("Request Successfully!");

        return new ResponseEntity<>(result, httpStatus);
    }
}
