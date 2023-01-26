package mainproject.stocksite.domain.trade.controller;

import mainproject.stocksite.domain.trade.dto.TradePostDto;
import mainproject.stocksite.domain.trade.dto.TradeResponseDto;
import mainproject.stocksite.domain.trade.entity.Trade;
import mainproject.stocksite.domain.trade.mapper.TradeMapper;
import mainproject.stocksite.domain.trade.service.TradeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/trade")
@Validated
public class TradeController {
    private final TradeService tradeService;
    private final TradeMapper tradeMapper;

    public TradeController(TradeService tradeService, TradeMapper tradeMapper) {
        this.tradeService = tradeService;
        this.tradeMapper = tradeMapper;
    }

    @PostMapping
    public ResponseEntity<TradeResponseDto.TradePost> postTrade(@Valid @RequestBody TradePostDto tradePostDto) {
        Trade trade = tradeService.createTrade(tradeMapper.tradePostDtoToTrade(tradePostDto));
        TradeResponseDto.TradePost response = tradeMapper.tradeToTradePostResponseDto(trade);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/info/{member-id}")
    public ResponseEntity<List<TradeResponseDto.TradesGet>> getTradesInfo(@PathVariable("member-id") @Positive long memberId) {
        List<Trade> tradesList = tradeService.getTradesList(memberId);
        List<TradeResponseDto.TradesGet> response = tradeMapper.tradesToTradeResponses(tradesList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/info/{member-id}/stock/{stock-code}")
    public ResponseEntity<List<TradeResponseDto.TradesGet>> getTradeInfo(@PathVariable("member-id") @Positive long memberId,
                                       @PathVariable("stock-code") String stockCode) {
        List<Trade> tradeList = tradeService.getTradeList(memberId, stockCode);
        List<TradeResponseDto.TradesGet> response = tradeMapper.tradesToTradeResponses(tradeList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
