package mainproject.stocksite.domain.stock.detail.controller;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.stock.detail.dto.response.HolidaysDto;
import mainproject.stocksite.domain.stock.detail.dto.response.InvestorsDto;
import mainproject.stocksite.domain.stock.detail.dto.response.PresentQuotationsDto;
import mainproject.stocksite.domain.stock.detail.dto.response.QuotationsByPeriodDto;
import mainproject.stocksite.domain.stock.detail.options.DetailedStockOptions;
import mainproject.stocksite.domain.stock.detail.service.DetailedStockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/domestic-stock")
public class DetailedStockController {

    private final DetailedStockService detailedStockService;

    // 국내 주식 현재가 시세 조회
    @GetMapping("/quotations/{stock-code}")
    public ResponseEntity<PresentQuotationsDto> getPresentQuotations(@PathVariable("stock-code") String stockCode) throws InterruptedException {
        PresentQuotationsDto response = detailedStockService.findPresentQuotations(stockCode);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 국내 주식 현재가 투자자
    @GetMapping("/investors/{stock-code}")
    public ResponseEntity<InvestorsDto> getInvestors(@PathVariable("stock-code") String stockCode) throws InterruptedException {
        InvestorsDto response = detailedStockService.findInvestors(stockCode);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 국내 주식 기간별 시세 조회 (일/주/월/년)
    @GetMapping("/quotations/{stock-code}/day")
    public ResponseEntity<QuotationsByPeriodDto> getQuotationsByPeriod(@PathVariable("stock-code") String stockCode, DetailedStockOptions detailedStockOptions) throws InterruptedException {
        QuotationsByPeriodDto response = detailedStockService.findQuotationsByPeriod(stockCode, detailedStockOptions);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 국내 휴장일 조회
    @GetMapping("holidays/{base-date}")
    public ResponseEntity<HolidaysDto> getHolidays(@PathVariable("base-date") String baseDate) throws InterruptedException {
        HolidaysDto response = detailedStockService.findHolidays(baseDate);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
