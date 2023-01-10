package mainproject.stocksite.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

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

}

