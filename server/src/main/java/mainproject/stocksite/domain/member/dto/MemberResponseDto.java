package mainproject.stocksite.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberResponseDto {

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Long memberId;
    private String userId;
    private String password;
    private String nickname;
    private String email;

}
