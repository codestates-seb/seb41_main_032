package mainproject.stocksite.domain.member.entity;

import lombok.Data;
import mainproject.stocksite.domain.time.time;

import javax.persistence.*;


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

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;




}
