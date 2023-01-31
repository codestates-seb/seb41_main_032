package mainproject.stocksite.domain.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.global.time.Time;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommentPostDto {
    @Positive
    private Long memberId;

    @Positive
    private Long boardId;

    @NotBlank
    private String content;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);

        return member;
    }

    public Board getBoard() {
        Board board = new Board();
        board.setBoardId(boardId);

        return board;
    }

    @Data
    public static class ResponseDto extends Time {
        private Long commentId;
        private Long memberId;
        private Long boardId;
        private String content;
    }
}
