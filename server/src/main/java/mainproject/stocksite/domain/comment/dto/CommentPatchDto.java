package mainproject.stocksite.domain.comment.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor

public class CommentPatchDto {

    private Long commentId;
    private String content;
}
