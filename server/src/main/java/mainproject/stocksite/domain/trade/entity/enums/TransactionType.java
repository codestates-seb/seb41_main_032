package mainproject.stocksite.domain.trade.entity.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum TransactionType {
    SELL("SELL"),
    BUY("BUY");

    @Getter
    private final String type;
}
