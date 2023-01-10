package mainproject.stocksite.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberResponseDto {

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Long memberId;
    private String username;
    private String password;
    private String nickname;
    private String email;

}
