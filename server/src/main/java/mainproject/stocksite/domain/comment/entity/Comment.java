package mainproject.stocksite.domain.comment.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.time.Time;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Comment extends Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
