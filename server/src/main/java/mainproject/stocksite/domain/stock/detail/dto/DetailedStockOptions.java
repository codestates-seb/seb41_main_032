package mainproject.stocksite.domain.stock.detail.dto;

import lombok.Getter;

@Getter
public class DetailedStockOptions {
    private String startDay;
    private String endDay;
    private String periodCode;
    private String code;
}
