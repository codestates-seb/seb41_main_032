package mainproject.stocksite.domain.stock.accesstoken.service;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.global.config.AccessTokenRequestInfo;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AccessTokenService {

    public static String accessToken;

    private final AccessTokenRequestInfo accessTokenRequestInfo;

    // 매일 자정에 증권사 API 접근 토큰 자동 발급
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    public void getAccessToken() {

        Map<String, String> requestBody = new LinkedHashMap<>();
        requestBody.put("grant_type", "client_credentials");
        requestBody.put("appkey", accessTokenRequestInfo.getAppKey());
        requestBody.put("appsecret", accessTokenRequestInfo.getAppSecret());

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

        accessToken = responseBody[3];
    }
}
