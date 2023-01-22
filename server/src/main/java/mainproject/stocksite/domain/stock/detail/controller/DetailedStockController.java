package mainproject.stocksite.domain.stock.detail.controller;

import mainproject.stocksite.domain.stock.detail.options.DetailedStockOptions;
import mainproject.stocksite.domain.stock.detail.service.DetailedStockService;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/domestic-stock")
public class DetailedStockController {

    private final DetailedStockService detailedStockService;

    public DetailedStockController(DetailedStockService detailedStockService) {
        this.detailedStockService = detailedStockService;
    }

    // 국내 주식 현재가 시세 조회
    @GetMapping("/quotations/{stock-code}")
    public ResponseEntity getPresentQuotations(@PathVariable("stock-code") String stockCode) throws InterruptedException, ParseException {
        String result = detailedStockService.findPresentQuotations(stockCode);

        return new ResponseEntity<>(stringToJsonObject(result), HttpStatus.OK);
    }

    // 국내 주식 현재가 투자자
    @GetMapping("/investors/{stock-code}")
    public ResponseEntity getInvestors(@PathVariable("stock-code") String stockCode) throws InterruptedException, ParseException {
        String result = detailedStockService.findInvestors(stockCode);

        return new ResponseEntity<>(stringToJsonObject(result), HttpStatus.OK);
    }

    // 국내 주식 기간별 시세 조회 (일/주/월/년)
    @GetMapping("/quotations/{stock-code}/day")
    public ResponseEntity getQuotationsByPeriod(@PathVariable("stock-code") String stockCode, DetailedStockOptions detailedStockOptions) throws InterruptedException, ParseException {
        String result = detailedStockService.findQuotationsByPeriod(stockCode, detailedStockOptions);

        return new ResponseEntity<>(stringToJsonObject(result), HttpStatus.OK);
    }

    // 국내 휴장일 조회
    @GetMapping("holidays/{base-date}")
    public ResponseEntity getHolidays(@PathVariable("base-date") String baseDate) throws InterruptedException, ParseException {
        String result = detailedStockService.findHolidays(baseDate);

        return new ResponseEntity<>(stringToJsonObject(result), HttpStatus.OK);
    }

    private JSONObject stringToJsonObject(String str) throws ParseException {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        return jsonObject;
    }
}
