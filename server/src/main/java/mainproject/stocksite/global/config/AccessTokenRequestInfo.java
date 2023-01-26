package mainproject.stocksite.global.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class AccessTokenRequestInfo {

    @Value("${app-key}")
    private String appKey;

    @Value("${app-secret}")
    private String appSecret;
}
