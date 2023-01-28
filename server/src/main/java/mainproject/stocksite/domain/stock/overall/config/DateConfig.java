package mainproject.stocksite.domain.stock.overall.config;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Component
public class DateConfig {
    LocalDate now = LocalDate.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    String formattedNow = now.format(formatter);

    String fromFiveDaysAgoToNow = String.valueOf(Integer.parseInt(formattedNow) - 5);
}
