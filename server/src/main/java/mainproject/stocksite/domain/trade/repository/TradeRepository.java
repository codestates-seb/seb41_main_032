package mainproject.stocksite.domain.trade.repository;

import mainproject.stocksite.domain.trade.entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAllByMember_MemberId(Long memberId);
    List<Trade> findAllByMember_MemberIdAndStockCode(Long memberId, String stockCode);
}
