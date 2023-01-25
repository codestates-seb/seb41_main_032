package mainproject.stocksite.domain.news.dto;

import lombok.Data;

import java.util.List;

@Data
public class NewsResponseDto {
    private String lastBuildDate;
    private Integer total;
    private Integer start;
    private Integer display;
    private List<Item> items = null;

    @Data
    public static class Item {
        private String title;
        private String originallink;
        private String link;
        private String description;
        private String pubDate;
    }
}
