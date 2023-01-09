package mainproject.stocksite.domain.stock.AccessToken.dto;

import lombok.Getter;

@Getter
public class AccessTokenRequestDto {
    private String grantType;
    private String appKey;
    private String appSecret;
}
