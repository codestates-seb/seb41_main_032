package mainproject.stocksite.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentPatchDto {
    private Long commentId;
    private String content;
}
