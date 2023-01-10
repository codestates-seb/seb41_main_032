package mainproject.stocksite.domain.board.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class BoardPatchDto {

    @NotNull
    private long boardId;

    @NotNull
    private String title;

    @NotNull
    private String content;
}

