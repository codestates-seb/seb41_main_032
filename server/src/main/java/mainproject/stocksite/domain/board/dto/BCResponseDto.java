package mainproject.stocksite.domain.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BCResponseDto {

    private Long commentId;
    private String content;
}

