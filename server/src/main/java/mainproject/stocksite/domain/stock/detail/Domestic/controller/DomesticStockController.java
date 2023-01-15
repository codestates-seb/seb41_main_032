package mainproject.stocksite.domain.stock.detail.Domestic.controller;

import mainproject.stocksite.domain.exception.ExceptionCode;
import mainproject.stocksite.domain.stock.detail.Domestic.service.DomesticStockService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static mainproject.stocksite.domain.stock.detail.AccessToken.dto.AccessTokenRequestInfo.appKey;
import static mainproject.stocksite.domain.stock.detail.AccessToken.dto.AccessTokenRequestInfo.appSecret;
import static mainproject.stocksite.domain.stock.detail.AccessToken.service.AccessTokenService.accessToken;


@RestController
@RequestMapping("/domestic-stock")
public class DomesticStockController {

    private final DomesticStockService domesticStockService;

    public DomesticStockController(DomesticStockService domesticStockService) {
        this.domesticStockService = domesticStockService;
    }

    // 국내 주식 현재가 시세 조회
    @GetMapping("/quotations/{item-id}")
    public ResponseEntity getPresentQuotations(@PathVariable("item-id") String itemId) throws InterruptedException {
        ResponseEntity response = domesticStockService.findPresentQuotations(itemId);
        return response;
    }

    // 국내 주식 현재가 투자자
    @GetMapping("/investors/{item-id}")
    public ResponseEntity getInvestors(@PathVariable("item-id") String itemId) throws InterruptedException {
        ResponseEntity response = domesticStockService.findInvestors(itemId);
        return response;
    }

    // 국내 주식 기간별 시세 조회 (일/주/월/년)
//    @GetMapping("/quotations/{item-id}/period/{")
//    public ResponseEntity getQuotationsByPeriod(
//            @RequestParam("FID_INPUT_ISCD") String FID_INPUT_ISCD,
//            @RequestParam("FID_INPUT_DATE_1") String FID_INPUT_DATE_1,
//            @RequestParam("FID_INPUT_DATE_2") String FID_INPUT_DATE_2,
//            @RequestParam("FID_PERIOD_DIV_CODE") String FID_PERIOD_DIV_CODE,
//            @RequestParam("FID_ORG_ADJ_PRC") String FID_ORG_ADJ_PRC) throws InterruptedException {
//
//        HttpHeaders requestHeaders = new HttpHeaders();
//        requestHeaders.set("content-type", "application/json; charset=utf-8");
//        requestHeaders.set("authorization", "Bearer " + accessToken);
//        requestHeaders.set("appkey", appKey);
//        requestHeaders.set("appsecret", appSecret);
//        requestHeaders.set("tr_id", "FHKST03010100");
//        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);
//
//        String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";
//
//        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
//                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
//                .queryParam("FID_INPUT_ISCD", FID_INPUT_ISCD)
//                .queryParam("FID_INPUT_DATE_1", FID_INPUT_DATE_1)
//                .queryParam("FID_INPUT_DATE_2", FID_INPUT_DATE_2)
//                .queryParam("FID_PERIOD_DIV_CODE", FID_PERIOD_DIV_CODE)
//                .queryParam("FID_ORG_ADJ_PRC", FID_ORG_ADJ_PRC)
//                .build(true);
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        ResponseEntity<Object> response = null;
//
//        try {
//            response = restTemplate.exchange(
//                    uriBuilder.toString(),
//                    HttpMethod.GET,
//                    requestMessage,
//                    Object.class
//            );
//        } catch (Exception e) {
//            String[] errorMessage = e.getMessage().split("\"");
//
//            if (errorMessage[11].equals("초당 거래건수를 초과하였습니다.")) {
//                if (countOfRequest == 2) {
//                    countOfRequest = 0;
//                    return new ResponseEntity(ExceptionCode.UNABLE_TO_REQUEST_AGAIN.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
//                } else if (countOfRequest < 2) {
//                    Thread.sleep(1000);
//                    countOfRequest++;
//                    getDomesticStockQuotationsByPeriodInfo(FID_INPUT_ISCD, FID_INPUT_DATE_1, FID_INPUT_DATE_2, FID_PERIOD_DIV_CODE, FID_ORG_ADJ_PRC);
//                }
//            }
//        }
//
//        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
//    }

    // 국내 휴장일 조회
    @GetMapping("holidays/{base-date}")
    public ResponseEntity getHolidays(@PathVariable("base-date") String baseDate) throws InterruptedException {
        ResponseEntity response = domesticStockService.findHolidays(baseDate);
        return response;
    }
}
