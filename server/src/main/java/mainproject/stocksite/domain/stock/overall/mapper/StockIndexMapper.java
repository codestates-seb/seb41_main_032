package mainproject.stocksite.domain.stock.overall.mapper;

import mainproject.stocksite.domain.stock.overall.dto.StockIndexResponseDto;
import mainproject.stocksite.domain.stock.overall.entity.KOSDAQStockIndex;
import mainproject.stocksite.domain.stock.overall.entity.KOSPIStockIndex;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StockIndexMapper {
    List<StockIndexResponseDto> KOSPIStockIndicesToStockIndexResponseDtos(List<KOSPIStockIndex> kospiStockIndices);
    List<StockIndexResponseDto> KOSDAQStockIndicesToStockIndexResponseDtos(List<KOSDAQStockIndex> kosdaqStockIndices);
}
