package mainproject.stocksite.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class MemberPostDto {

    @NotBlank
    private String userId;

    @NotBlank
    private String password;

    @NotBlank
    private String nickname;

    @NotBlank
    @Email
    private String email;
}
