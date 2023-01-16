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
    @GetMapping("/quotations/{item-id}/day")
    public ResponseEntity getQuotationsByPeriod(
            @PathVariable("item-id") String itemId,
            @RequestParam("start") String startDay,
            @RequestParam("end") String endDay,
            @RequestParam("period-code") String periodCode,
            @RequestParam("code") String code) throws InterruptedException {

        ResponseEntity response = domesticStockService.findQuotationsByPeriod(itemId, startDay, endDay, periodCode, code);

        return response;
    }

    // 국내 휴장일 조회
    @GetMapping("holidays/{base-date}")
    public ResponseEntity getHolidays(@PathVariable("base-date") String baseDate) throws InterruptedException {
        ResponseEntity response = domesticStockService.findHolidays(baseDate);

        return response;
    }
}
