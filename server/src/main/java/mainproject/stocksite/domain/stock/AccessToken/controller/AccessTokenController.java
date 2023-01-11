package mainproject.stocksite.domain.stock.AccessToken.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

import static mainproject.stocksite.domain.stock.AccessToken.dto.AccessTokenRequestDto.appKey;
import static mainproject.stocksite.domain.stock.AccessToken.dto.AccessTokenRequestDto.appSecret;

@RestController
public class AccessTokenController {

    public static String accessToken;

    // 증권사 API 접근 토큰 발급
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")    // 매일 자정
    public static void getAccessToken() {

        Map<String, String> requestBody = new LinkedHashMap<>();
        requestBody.put("grant_type", "client_credentials");
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

        accessToken = responseBody[3];
        System.out.println("메서드 요청 accessToken = " + accessToken);
    }
}
