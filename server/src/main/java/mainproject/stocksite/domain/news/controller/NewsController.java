package mainproject.stocksite.domain.news.controller;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.news.dto.NewsResponseDto;
import mainproject.stocksite.domain.news.options.NewsOptions;
import mainproject.stocksite.domain.news.service.NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/stock-news")
public class NewsController {

    private final NewsService newsService;

    @GetMapping
    public ResponseEntity<NewsResponseDto> getStockNews(NewsOptions newsOptions) {
        NewsResponseDto response = newsService.searchStockNews(newsOptions);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
