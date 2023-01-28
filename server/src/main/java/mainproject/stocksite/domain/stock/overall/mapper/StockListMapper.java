package mainproject.stocksite.domain.stock.overall.mapper;

import mainproject.stocksite.domain.stock.overall.dto.StockListResponseDto;
import mainproject.stocksite.domain.stock.overall.entity.KOSDAQStockList;
import mainproject.stocksite.domain.stock.overall.entity.KOSPIStockList;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StockListMapper {
    List<StockListResponseDto> KOSPIStockListsToStockListsResponseDtos(List<KOSPIStockList> kospiStockLists);
    List<StockListResponseDto> KOSDAQStockListsToStockListsResponseDtos(List<KOSDAQStockList> kosdaqStockLists);
}
