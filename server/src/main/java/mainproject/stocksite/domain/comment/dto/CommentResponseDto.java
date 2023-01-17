package mainproject.stocksite.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentResponseDto {

        private Long commentId;
        private String content;
        private String username;
        private Long memberId;
}
