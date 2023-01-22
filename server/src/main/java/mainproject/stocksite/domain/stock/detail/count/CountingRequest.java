package mainproject.stocksite.domain.stock.detail.count;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

@Getter
@Component
public class CountingRequest {
    AtomicInteger countOfRequest = new AtomicInteger();

    public boolean checkCountOfRequest(AtomicInteger countOfRequest) {
        return countOfRequest.get() < 3;
    }
}
