package mainproject.stocksite.domain.trade.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.time.time;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Trade extends time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tradeId;

    @Column(nullable = false)
    private String stockCode;

    @Column(nullable = false)
    private String stockName;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private String tradeType;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @Column(nullable = false)
    private Long totalStockHoldings;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public long getMemberId() {
        return member.getMemberId();
    }
}
