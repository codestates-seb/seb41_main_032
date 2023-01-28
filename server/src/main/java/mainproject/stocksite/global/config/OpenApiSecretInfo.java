package mainproject.stocksite.global.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "open-api")
public class OpenApiSecretInfo {

    // 한국투자증권 API 요청 관련 키
    private String appKey;
    private String appSecret;

    // 누리집 API 요청 관련 키
    private String serviceKey;

    // 네이버 검색 API 요청 관련 키
    private String naverClientId;
    private String naverClientSecret;
}
