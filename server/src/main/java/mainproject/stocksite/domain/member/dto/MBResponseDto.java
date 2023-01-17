package mainproject.stocksite.domain.member.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MBResponseDto {

    private Long boardId;
    private String title;
    private String content;
}
