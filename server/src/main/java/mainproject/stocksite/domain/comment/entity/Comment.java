package mainproject.stocksite.domain.comment.entity;

import lombok.NoArgsConstructor;
import mainproject.stocksite.domain.board.entity.Board;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.time.time;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Comment extends time{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
