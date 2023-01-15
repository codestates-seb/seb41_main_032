package mainproject.stocksite.domain.stock.detail.AccessToken.dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class AccessTokenRequestInfo {

    public static String appKey;
    public static String appSecret;

    @Value("${app-key}")
    private String privateAppKey;

    @Value("${app-secret}")
    private String privateAppSecret;

    @PostConstruct
    public void init() {
        appKey = privateAppKey;
        appSecret = privateAppSecret;
    }
}
