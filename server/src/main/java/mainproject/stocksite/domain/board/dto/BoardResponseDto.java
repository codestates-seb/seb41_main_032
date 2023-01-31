package mainproject.stocksite.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject.stocksite.global.time.Time;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseDto extends Time {
    private Long boardId;
    private Long memberId;
    private String title;
    private String content;
    private String username;
    private String nickname;
}
