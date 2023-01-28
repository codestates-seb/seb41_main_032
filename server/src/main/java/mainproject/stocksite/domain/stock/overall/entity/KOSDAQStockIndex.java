package mainproject.stocksite.domain.stock.overall.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "KOSDAQ_STOCK_INDEX")
public class KOSDAQStockIndex {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String basDt;
    private String idxNm;
    private String idxCsf;
    private String epyItmsCnt;
    private String clpr;
    private String vs;
    private String fltRt;
    private String mkp;
    private String hipr;
    private String lopr;
    private String trqu;
    private String trPrc;
    private String lstgMrktTotAmt;
    private String lsYrEdVsFltRg;
    private String lsYrEdVsFltRt;
    private String yrWRcrdHgst;
    private String yrWRcrdHgstDt;
    private String yrWRcrdLwst;
    private String yrWRcrdLwstDt;
    private String basPntm;
    private String basIdx;
}
