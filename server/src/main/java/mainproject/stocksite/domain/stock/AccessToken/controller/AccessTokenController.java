package mainproject.stocksite.domain.stock.AccessToken.controller;

import mainproject.stocksite.domain.stock.AccessToken.dto.AccessTokenRequestDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/stock")
@CrossOrigin(originPatterns = "https://openapi.koreainvestment.com")
public class AccessTokenController {

    // 증권사 API 접근 토큰 발급
    @PostMapping("access-token")
    public ResponseEntity getAccessToken(@RequestBody AccessTokenRequestDto accessTokenRequestDto) throws Exception {

        HashMap<String, Object> result = new HashMap<>();

        // 리팩토링 필요 - 일일이 넣어주는 부분
        Map<String, String> requestBody = new LinkedHashMap<>();
        requestBody.put("grant_type", accessTokenRequestDto.getGrantType());
        requestBody.put("appkey", accessTokenRequestDto.getAppKey());
        requestBody.put("appsecret", accessTokenRequestDto.getAppSecret());

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

        if (httpStatus.is2xxSuccessful()) System.out.println("Request Successfully!");

        return new ResponseEntity<>(result, httpStatus);
    }
}
