package mainproject.stocksite.domain.stock.AccessToken.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

// 추후 멤버 변수, requestBody에 대한 리팩토링 필요
@RestController
@CrossOrigin(originPatterns = "https://openapi.koreainvestment.com")
public class AccessTokenController {

    private final String grantType = "client_credentials";

    @Value("${app-key}")
    private String appKey;

    @Value("${app-secret}")
    private String appSecret;

    // 증권사 API 접근 토큰 발급
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")    // 매일 자정
    public String getAccessToken() {

        Map<String, String> requestBody = new LinkedHashMap<>();
        requestBody.put("grant_type", grantType);
        requestBody.put("appkey", appKey);
        requestBody.put("appsecret", appSecret);

        HttpEntity<Object> requestMessage = new HttpEntity<>(requestBody);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response =
                restTemplate.exchange(
                        "https://openapi.koreainvestment.com:9443/oauth2/tokenP",
                        HttpMethod.POST,
                        requestMessage,
                        String.class
                );

        String[] responseBody = response.getBody().split("\"");
        String accessToken = responseBody[3];

        return accessToken;
    }
}
