package mainproject.stocksite.domain.stock.overall.repository;

import mainproject.stocksite.domain.stock.overall.entity.KOSDAQStockIndex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KOSDAQStockIndexRepository extends JpaRepository<KOSDAQStockIndex, Long> {

    // TODO Refactoring : 성능 개선을 위한 Querydsl의 exists으로 변경 필요
    @Query("SELECT COUNT(s.id) > 0 " +
            "FROM KOSDAQ_STOCK_INDEX s " +
            "WHERE s.basDt =:basDt")
    boolean exists(@Param("basDt") String basDt);
}
