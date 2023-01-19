package mainproject.stocksite.domain.stock.detail.controller;

import mainproject.stocksite.domain.stock.accesstoken.service.AccessTokenService;
import mainproject.stocksite.domain.stock.detail.service.DetailedStockService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/domestic-stock")
public class DetailedStockController {

    private final DetailedStockService detailedStockService;

    public DetailedStockController(DetailedStockService detailedStockService) {
        this.detailedStockService = detailedStockService;
    }

    // 국내 주식 현재가 시세 조회
    @GetMapping("/quotations/{stock-code}")
    public ResponseEntity getPresentQuotations(@PathVariable("stock-code") String stockCode) throws InterruptedException {
        ResponseEntity response = detailedStockService.findPresentQuotations(stockCode);
        System.out.println("accessToken = " + AccessTokenService.accessToken);

        return response;
    }

    // 국내 주식 현재가 투자자
    @GetMapping("/investors/{stock-code}")
    public ResponseEntity getInvestors(@PathVariable("stock-code") String stockCode) throws InterruptedException {
        ResponseEntity response = detailedStockService.findInvestors(stockCode);

        return response;
    }

    // 국내 주식 기간별 시세 조회 (일/주/월/년)
    @GetMapping("/quotations/{stock-code}/day")
    public ResponseEntity getQuotationsByPeriod(
            @PathVariable("stock-code") String stockCode,
            @RequestParam("start") String startDay,
            @RequestParam("end") String endDay,
            @RequestParam("period-code") String periodCode,
            @RequestParam("code") String code) throws InterruptedException {

        ResponseEntity response = detailedStockService.findQuotationsByPeriod(stockCode, startDay, endDay, periodCode, code);

        return response;
    }

    // 국내 휴장일 조회
    @GetMapping("holidays/{base-date}")
    public ResponseEntity getHolidays(@PathVariable("base-date") String baseDate) throws InterruptedException {
        ResponseEntity response = detailedStockService.findHolidays(baseDate);

        return response;
    }
}
