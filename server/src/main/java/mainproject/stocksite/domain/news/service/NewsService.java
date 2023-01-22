package mainproject.stocksite.domain.news.service;

import mainproject.stocksite.domain.config.NewsSecretInfo;
import mainproject.stocksite.domain.news.options.NewsOptions;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class NewsService {

    private final NewsSecretInfo newsSecretInfo;

    public NewsService(NewsSecretInfo newsSecretInfo) {
        this.newsSecretInfo = newsSecretInfo;
    }

    public ResponseEntity<Object> searchStockNews(NewsOptions newsOptions) {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.set("Content-Type", "application/json");
        requestHeaders.set("X-Naver-Client-Id", newsSecretInfo.getNewsClientId());
        requestHeaders.set("X-Naver-Client-Secret", newsSecretInfo.getNewsClientSecret());
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = "https://openapi.naver.com/v1/search/news";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("query", newsOptions.getSearch())
                .queryParam("display", newsOptions.getCount())
                .queryParam("start", newsOptions.getStart())
                .queryParam("sort", newsOptions.getSort())
                .build();

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<Object> response = restTemplate.exchange(
                uriBuilder.toString(),
                HttpMethod.GET,
                requestMessage,
                Object.class
        );

        return new ResponseEntity<>(response.getBody(), response.getStatusCode());
    }
}
