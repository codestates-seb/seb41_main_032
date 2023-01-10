package mainproject.stocksite.domain.member.entity;

import lombok.Data;
import mainproject.stocksite.domain.time.time;
import mainproject.stocksite.domain.board.entity.Board;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity(name = "MEMBERS")
public class Member extends time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Board> boardList = new ArrayList<>();


    public void addBoardList(Board board) {
        this.boardList.add(board);
        if (board.getMember() != this) {
            board.setMember(this);
        }
    }



}
