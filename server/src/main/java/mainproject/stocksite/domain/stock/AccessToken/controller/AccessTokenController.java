package mainproject.stocksite.domain.stock.AccessToken.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/stock")
@CrossOrigin(originPatterns = "https://openapi.koreainvestment.com")
public class AccessTokenController {

    private final String grantType = "client_credentials";

    @Value("${app-key}")
    private String appKey;

    @Value("${app-secret}")
    private String appSecret;

    // 증권사 API 접근 토큰 발급
    @PostMapping("access-token")
    public ResponseEntity getAccessToken() {

        Map<String, Object> result = new LinkedHashMap<>();

        Map<String, String> requestBody = new LinkedHashMap<>();
        requestBody.put("grant_type", grantType);
        requestBody.put("appkey", appKey);
        requestBody.put("appsecret", appSecret);

        HttpEntity<Object> requestMessage = new HttpEntity<>(requestBody);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response =
                restTemplate.exchange(
                        "https://openapi.koreainvestment.com:9443/oauth2/tokenP",
                        HttpMethod.POST,
                        requestMessage,
                        Object.class
                );

        result.put("responseBody", response.getBody());
        HttpStatus httpStatus = response.getStatusCode();

        if (httpStatus.is2xxSuccessful()) System.out.println("Access Token Issued Successfully!");

        return new ResponseEntity<>(result, httpStatus);
    }
}
