package mainproject.stocksite.domain.trade.mapper;

import mainproject.stocksite.domain.trade.dto.TradePostDto;
import mainproject.stocksite.domain.trade.dto.TradeResponseDto;
import mainproject.stocksite.domain.trade.entity.Trade;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TradeMapper {
    Trade tradePostDtoToTrade(TradePostDto tradePostDto);
    TradeResponseDto.TradePost tradeToTradePostResponseDto(Trade trade);
    List<TradeResponseDto.TradesGet> tradesToTradeResponses(List<Trade> trades);
}
