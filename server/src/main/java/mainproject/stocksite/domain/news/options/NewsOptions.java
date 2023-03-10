package mainproject.stocksite.domain.news.options;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsOptions {
    private String search;
    private Integer count;
    private Integer start;
    private String sort;
}
