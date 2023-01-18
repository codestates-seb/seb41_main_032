package mainproject.stocksite.domain.bookmark.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mainproject.stocksite.domain.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;

    @Column(nullable = false)
    private String stockCode;

    @Column(nullable = false)
    private String stockName;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
        if (!this.member.getBookmarks().contains(this)) {
            this.member.getBookmarks().add(this);
        }
    }
}
