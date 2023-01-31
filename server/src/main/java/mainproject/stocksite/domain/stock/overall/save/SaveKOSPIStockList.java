package mainproject.stocksite.domain.stock.overall.save;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.stock.overall.config.DateConfig;
import mainproject.stocksite.domain.stock.overall.entity.KOSPIStockList;
import mainproject.stocksite.domain.stock.overall.repository.KOSPIStockListRepository;
import mainproject.stocksite.global.config.OpenApiSecretInfo;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;

@RequiredArgsConstructor
@Service
public class SaveKOSPIStockList {

    private final OpenApiSecretInfo openApiSecretInfo;

    private final DateConfig dateConfig;

    private final KOSPIStockListRepository kospiStockListRepository;

    private final String STOCK_DEFAULT_URL = "http://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService";

    private final RestTemplate restTemplate;

    @PostConstruct
    @Scheduled(cron = "15 5 11 * * *", zone = "Asia/Seoul")  // 매일 오전 11시 5분 15초에 주식시세정보 데이터 불러옴
    public void getAndSaveKOSPIStockList() {

        String url = STOCK_DEFAULT_URL + "/getStockPriceInfo";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("serviceKey", openApiSecretInfo.getServiceKey())
                .queryParam("numOfRows", 1000)
                .queryParam("pageNo", 1)
                .queryParam("resultType", "json")
                .queryParam("beginBasDt", dateConfig.getFromFiveDaysAgoToNow())
                .queryParam("mrktCls", "KOSPI")
                .build();

        ResponseEntity<String> responseData = restTemplate.getForEntity(uriBuilder.toUriString(), String.class);

        String responseDataBody = responseData.getBody();

        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(responseDataBody);
            JSONObject response = (JSONObject) jsonObject.get("response");

            JSONObject body = (JSONObject) response.get("body");

            JSONObject items = (JSONObject) body.get("items");

            JSONArray item = (JSONArray) items.get("item");

            for (int i = 0; i < item.size(); i++) {
                JSONObject tmp = (JSONObject) item.get(i);
                KOSPIStockList infoObj = new KOSPIStockList(
                        i + (long) 1,
                        (String) tmp.get("basDt"),
                        (String) tmp.get("srtnCd"),
                        (String) tmp.get("isinCd"),
                        (String) tmp.get("itmsNm"),
                        (String) tmp.get("mrktCtg"),
                        (String) tmp.get("clpr"),
                        (String) tmp.get("vs"),
                        (String) tmp.get("fltRt"),
                        (String) tmp.get("mkp"),
                        (String) tmp.get("hipr"),
                        (String) tmp.get("lopr"),
                        (String) tmp.get("trqu"),
                        (String) tmp.get("trPrc"),
                        (String) tmp.get("lstgStCnt"),
                        (String) tmp.get("mrktTotAmt")
                );
                kospiStockListRepository.save(infoObj);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 매일 오전 11시 5분에 DB에 있는 주식시세정보 데이터 삭제
    @Scheduled(cron = "0 5 11 * * *", zone = "Asia/Seoul")
    public void deleteKOSPIStockList() {
        kospiStockListRepository.deleteAll();
    }
}
