package mainproject.stocksite.domain.bookmark.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class BookmarkRequestDto {

    @Getter
    public static class Post {
        @NotBlank
        private String stockCode;

        @NotBlank
        private String stockName;

        @Positive
        private long memberId;
    }

    @Getter
    public static class Patch {
        private long bookmarkId;

        @NotBlank
        private String stockCode;

        @NotBlank
        private String stockName;

        public void setBookmarkId(long bookmarkId) {
            this.bookmarkId = bookmarkId;
        }
    }
}
