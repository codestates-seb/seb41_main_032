package mainproject.stocksite.domain.stock.overall.config;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Getter
@Component
public class DateConfig {

    public String getFromFiveDaysAgoToNow() {
        Calendar cal = Calendar.getInstance();

        SimpleDateFormat sdformat = new SimpleDateFormat("yyyyMMdd");

        cal.add(Calendar.DATE, -5);

        String fromFiveDaysAgoToNow = sdformat.format(cal.getTime());

        return fromFiveDaysAgoToNow;
    }
}
