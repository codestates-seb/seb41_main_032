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
import mainproject.stocksite.global.exception.BusinessLogicException;
import mainproject.stocksite.global.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OverallStockService {

    private final KOSPIStockIndexRepository kospiStockIndexRepository;
    private final KOSDAQStockIndexRepository kosdaqStockIndexRepository;

    private final KOSPIStockListRepository kospiStockListRepository;
    private final KOSDAQStockListRepository kosdaqStockListRepository;

    public List<KOSPIStockIndex> getKOSPIStockIndex() {
        List<KOSPIStockIndex> foundIndices = kospiStockIndexRepository.findAll();
        verifyExistsData(foundIndices);

        return foundIndices;
    }

    public List<KOSDAQStockIndex> getKOSDAQStockIndex() {
        List<KOSDAQStockIndex> foundIndices = kosdaqStockIndexRepository.findAll();
        verifyExistsData(foundIndices);

        return foundIndices;
    }

    public List<KOSPIStockList> getKOSPIStockList() {
        List<KOSPIStockList> foundLists = kospiStockListRepository.findAll();
        verifyExistsData(foundLists);

        return foundLists;
    }

    public List<KOSDAQStockList> getKOSDAQStockList() {
        List<KOSDAQStockList> foundLists = kosdaqStockListRepository.findAll();
        verifyExistsData(foundLists);

        return foundLists;
    }

    private void verifyExistsData(List<?> data) {
        if (data.isEmpty()) throw new BusinessLogicException(ExceptionCode.CANNOT_FOUND_STOCK_DATA);
    }
}
