package mainproject.stocksite.domain.stock.overall.service;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.stock.overall.entity.KOSDAQStockIndex;
import mainproject.stocksite.domain.stock.overall.entity.KOSDAQStockList;
import mainproject.stocksite.domain.stock.overall.entity.KOSPIStockIndex;
import mainproject.stocksite.domain.stock.overall.entity.KOSPIStockList;
import mainproject.stocksite.domain.stock.overall.repository.KOSDAQStockIndexRepository;
import mainproject.stocksite.domain.stock.overall.repository.KOSDAQStockListRepository;
import mainproject.stocksite.domain.stock.overall.repository.KOSPIStockIndexRepository;
import mainproject.stocksite.domain.stock.overall.repository.KOSPIStockListRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class OverallStockService {

    private final KOSPIStockIndexRepository kospiStockIndexRepository;
    private final KOSDAQStockIndexRepository kosdaqStockIndexRepository;

    private final KOSPIStockListRepository kospiStockListRepository;
    private final KOSDAQStockListRepository kosdaqStockListRepository;

    public List<KOSPIStockIndex> getKOSPIStockIndex() {
        return kospiStockIndexRepository.findAll();
    }

    public List<KOSDAQStockIndex> getKOSDAQStockIndex() {
        return kosdaqStockIndexRepository.findAll();
    }

    public List<KOSPIStockList> getKOSPIStockList() {
        return kospiStockListRepository.findAll();
    }

    public List<KOSDAQStockList> getKOSDAQStockList() {
        return kosdaqStockListRepository.findAll();
    }
}
