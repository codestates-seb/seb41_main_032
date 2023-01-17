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
    private long bookmarkId;

    @Column(nullable = false, unique = true)
    private String stockCode;

    @Column(nullable = false, unique = true)
    private String stockName;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
