package mainproject.stocksite.domain.trade.service;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.exception.BusinessLogicException;
import mainproject.stocksite.domain.exception.ExceptionCode;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.member.service.MemberService;
import mainproject.stocksite.domain.trade.entity.Trade;
import mainproject.stocksite.domain.trade.entity.enums.TransactionType;
import mainproject.stocksite.domain.trade.repository.TradeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;


@RequiredArgsConstructor
@Transactional
@Service
public class TradeService {

    private final TradeRepository tradeRepository;
    private final MemberService memberService;

    public Trade createTrade(Trade trade) {

        memberService.verifyExistsMember(trade.getMemberId());
        Member findMember = memberService.findById(trade.getMemberId());

        BigDecimal currentMoney = findMember.getMoney();
        BigDecimal updateMoney;

        Long memberId = trade.getMemberId();

        String stockCode = trade.getStockCode();

        BigDecimal price = trade.getPrice();
        BigDecimal quantity = new BigDecimal(trade.getQuantity());
        BigDecimal totalPrice = (price.multiply(quantity));

        List<Trade> tradeList = tradeRepository.findAllByMember_MemberIdAndStockCode(memberId, stockCode);

        Long lastTotalStockHoldings;


        if (trade.getTradeType().equals(TransactionType.BUY.getType())) {
            trade.setTotalPrice(totalPrice);

            int compareResult = currentMoney.compareTo(totalPrice);

            if (compareResult < 0)
                throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_MONEY);
            else {
                updateMoney = currentMoney.subtract(totalPrice);
                findMember.setMoney(updateMoney);

                if (tradeList.isEmpty()) trade.setTotalStockHoldings(quantity.longValue());
                else {
                    lastTotalStockHoldings = tradeList.get(tradeList.size() - 1).getTotalStockHoldings();
                    trade.setTotalStockHoldings(lastTotalStockHoldings + quantity.longValue());
                }
            }
        }

        if (trade.getTradeType().equals(TransactionType.SELL.getType())) {
            if (tradeList.isEmpty()) throw new BusinessLogicException(ExceptionCode.HAVE_NO_STOCK);

            trade.setTotalPrice(totalPrice);

            lastTotalStockHoldings = tradeList.get(tradeList.size() - 1).getTotalStockHoldings();

            if (lastTotalStockHoldings < quantity.longValue()) throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_STOCK);
            else {
                updateMoney = currentMoney.add(totalPrice);
                findMember.setMoney(updateMoney);

                trade.setTotalStockHoldings(lastTotalStockHoldings - quantity.longValue());
            }
        }
        return tradeRepository.save(trade);
    }

    @Transactional(readOnly = true)
    public List<Trade> getTradesList(long memberId) {
        memberService.verifyExistsMember(memberId);

        return tradeRepository.findAllByMember_MemberId(memberId);
    }

    @Transactional(readOnly = true)
    public List<Trade> getTradeList(long memberId, String stockCode) {
        memberService.verifyExistsMember(memberId);

        return tradeRepository.findAllByMember_MemberIdAndStockCode(memberId, stockCode);
    }
}
