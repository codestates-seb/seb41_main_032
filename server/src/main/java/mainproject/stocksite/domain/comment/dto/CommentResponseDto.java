package mainproject.stocksite.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.mapstruct.Mapping;

@Getter
@Setter
@AllArgsConstructor
public class CommentResponseDto {

        private Long commentId;
        private String content;
        private String username;
        private Long memberId;
        private Long boardId;
}
