package mainproject.stocksite.domain.trade.dto;

import lombok.Getter;
import lombok.Setter;
import mainproject.stocksite.domain.member.entity.Member;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@Getter
@Setter
public class TradePostDto {
    @Positive
    private Long memberId;

    @NotBlank
    private String stockCode;

    @NotBlank
    private String stockName;

    @NotNull
    private BigDecimal price;

    @Positive
    private Long quantity;

    @NotBlank
    @Pattern(regexp = "^BUY$|^SELL$", message = "매도는 BUY, 매수는 SELL을 입력해야 합니다.")
    private String tradeType;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);

        return member;
    }
}
