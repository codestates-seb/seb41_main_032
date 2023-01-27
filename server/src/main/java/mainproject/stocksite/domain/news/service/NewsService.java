package mainproject.stocksite.domain.news.service;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.news.dto.NewsResponseDto;
import mainproject.stocksite.domain.news.options.NewsOptions;
import mainproject.stocksite.global.config.OpenApiSecretInfo;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Service
public class NewsService {

    private final OpenApiSecretInfo openApiSecretInfo;

    private final String NAVER_DEFAULT_URL = "https://openapi.naver.com/v1/search/";

    private final RestTemplate restTemplate;

    private HttpHeaders baseHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", openApiSecretInfo.getNaverClientId());
        headers.set("X-Naver-Client-Secret", openApiSecretInfo.getNaverClientSecret());
        return headers;
    }

    public NewsResponseDto searchStockNews(NewsOptions newsOptions) {
        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("Content-Type", "application/json");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = NAVER_DEFAULT_URL + "news";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("query", newsOptions.getSearch())
                .queryParam("display", newsOptions.getCount())
                .queryParam("start", newsOptions.getStart())
                .queryParam("sort", newsOptions.getSort())
                .build();

        ResponseEntity<NewsResponseDto> response = restTemplate.exchange(
                uriBuilder.toString(),
                HttpMethod.GET,
                requestMessage,
                NewsResponseDto.class
        );

        return response.getBody();
    }
}
