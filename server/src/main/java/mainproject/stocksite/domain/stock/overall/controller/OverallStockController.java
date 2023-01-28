package mainproject.stocksite.domain.stock.overall.controller;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.stock.overall.dto.StockIndexResponseDto;
import mainproject.stocksite.domain.stock.overall.dto.StockListResponseDto;
import mainproject.stocksite.domain.stock.overall.entity.KOSDAQStockIndex;
import mainproject.stocksite.domain.stock.overall.entity.KOSDAQStockList;
import mainproject.stocksite.domain.stock.overall.entity.KOSPIStockIndex;
import mainproject.stocksite.domain.stock.overall.entity.KOSPIStockList;
import mainproject.stocksite.domain.stock.overall.mapper.StockIndexMapper;
import mainproject.stocksite.domain.stock.overall.mapper.StockListMapper;
import mainproject.stocksite.domain.stock.overall.service.OverallStockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/stock")
public class OverallStockController {

    private final StockIndexMapper stockIndexMapper;
    private final StockListMapper stockListMapper;
    private final OverallStockService overallStockService;

    @GetMapping("/index/KOSPI")
    public ResponseEntity<List<StockIndexResponseDto>> getIndexOfKOSPI() {
        List<KOSPIStockIndex> kospiStockIndices = overallStockService.getKOSPIStockIndex();
        List<StockIndexResponseDto> response = stockIndexMapper.KOSPIStockIndicesToStockIndexResponseDtos(kospiStockIndices);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/index/KOSDAQ")
    public ResponseEntity<List<StockIndexResponseDto>> getIndexOfKOSDAQ() {
        List<KOSDAQStockIndex> kosdaqStockIndices = overallStockService.getKOSDAQStockIndex();
        List<StockIndexResponseDto> response = stockIndexMapper.KOSDAQStockIndicesToStockIndexResponseDtos(kosdaqStockIndices);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/list/KOSPI")
    public ResponseEntity<List<StockListResponseDto>> getListOfKOSPI() {
        List<KOSPIStockList> kospiStockList = overallStockService.getKOSPIStockList();
        List<StockListResponseDto> response = stockListMapper.KOSPIStockListsToStockListsResponseDtos(kospiStockList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/list/KOSDAQ")
    public ResponseEntity<List<StockListResponseDto>> getListOfKOSDAQ() {
        List<KOSDAQStockList> kosdaqStockList = overallStockService.getKOSDAQStockList();
        List<StockListResponseDto> response = stockListMapper.KOSDAQStockListsToStockListsResponseDtos(kosdaqStockList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
