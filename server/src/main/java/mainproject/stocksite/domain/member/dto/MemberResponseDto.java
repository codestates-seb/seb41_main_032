package mainproject.stocksite.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private BigDecimal money;
    private List<MBResponseDto> boardList = new ArrayList<>();
}
