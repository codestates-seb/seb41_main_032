package mainproject.stocksite.domain.trade.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TradeResponseDto {
    @Data
    public static class TradePost {
        private Long memberId;
        private String tradeType;
        private String stockCode;
        private String stockName;
        private BigDecimal price;
        private Long quantity;
        private double totalPrice;
    }

    @Data
    public static class TradesGet {
        private String tradeType;
        private String stockCode;
        private String stockName;
        private BigDecimal price;
        private Long quantity;
        private Long totalStockHoldings;
        private LocalDateTime createdAt;
    }
}
