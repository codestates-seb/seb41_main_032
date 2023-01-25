package mainproject.stocksite.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import mainproject.stocksite.domain.time.Time;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class BoardPostDto {

    @NotNull
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
