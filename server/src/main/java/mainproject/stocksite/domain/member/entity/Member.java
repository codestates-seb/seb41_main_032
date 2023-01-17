package mainproject.stocksite.domain.member.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject.stocksite.domain.comment.entity.Comment;
import mainproject.stocksite.domain.time.time;
import mainproject.stocksite.domain.board.entity.Board;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "MEMBERS")
public class Member extends time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;


    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Comment> commentList  = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Board> boardList = new ArrayList<>();


    public void addBoardList(Board board) {
        this.boardList.add(board);
        if (board.getMember() != this) {
            board.setMember(this);
        }
    }

    public Member(String email) {
        this.email = email;

    }

    // 사용자의 권한을 등록하기 위한 권한 테이블을 생성
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


}
