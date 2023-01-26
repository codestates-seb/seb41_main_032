package mainproject.stocksite.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import mainproject.stocksite.global.time.Time;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@AllArgsConstructor
public class BoardPostDto {

    @Positive
    private Long memberId;
    @NotNull
    private String title;
    @NotNull
    private String content;

    @Data
    public static class ResponseDto extends Time {
        private Long boardId;
        private Long memberId;
        private String title;
        private String content;
    }
}
