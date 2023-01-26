package mainproject.stocksite.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class CommentPatchDto {
    private Long commentId;

    @NotBlank
    private String content;
}
