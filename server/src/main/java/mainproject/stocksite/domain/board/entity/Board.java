package mainproject.stocksite.domain.board.entity;

import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.global.time.Time;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "BOARD")
public class Board extends Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Comment> commentList  = new ArrayList<>();

}
