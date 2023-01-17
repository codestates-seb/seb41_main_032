package mainproject.stocksite.domain.bookmark.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class BookmarkRequestDto {

    @Getter
    public static class Post {
        @NotBlank
        private String stockCode;

        @NotBlank
        private String stockName;
    }

    @Getter
    @Setter
    public static class Patch {
        private long bookmarkId;

        @NotBlank
        private String stockCode;

        @NotBlank
        private String stockName;


    }
}
