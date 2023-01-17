package mainproject.stocksite.domain.bookmark.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookmarkResponseDto {
    private long bookmarkId;
    private String stockCode;
    private String stockName;
}
