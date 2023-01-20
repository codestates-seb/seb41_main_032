package mainproject.stocksite.domain.news.controller;

import mainproject.stocksite.domain.news.service.NewsService;
import mainproject.stocksite.domain.news.dto.NewsOptions;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/stock-news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public ResponseEntity<Object> getStockNews(NewsOptions newsOptions) {

        return newsService.searchStockNews(newsOptions);
    }
}
