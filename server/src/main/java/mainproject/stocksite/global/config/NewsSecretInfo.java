package mainproject.stocksite.global.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class NewsSecretInfo {

    @Value("${naver-id}")
    private String newsClientId;

    @Value("${naver-secret}")
    private String newsClientSecret;
}
