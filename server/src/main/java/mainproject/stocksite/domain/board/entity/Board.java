package mainproject.stocksite.domain.board.entity;

import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.time.time;
import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity(name = "BOARD")
public class Board extends time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Comment> commentList  = new ArrayList<>();

}
