package mainproject.stocksite.domain.board.dto;
import mainproject.stocksite.domain.time.time;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseDto extends time {

    private Long boardId;
    private Long memberId;
    private String title;
    private String content;
    private String username;
    private String nickname;
}
