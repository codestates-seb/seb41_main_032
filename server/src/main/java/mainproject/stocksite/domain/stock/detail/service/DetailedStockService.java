package mainproject.stocksite.domain.stock.detail.service;

import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.stock.accesstoken.service.AccessTokenService;
import mainproject.stocksite.global.config.AccessTokenRequestInfo;
import mainproject.stocksite.global.exception.BusinessLogicException;
import mainproject.stocksite.global.exception.ExceptionCode;
import mainproject.stocksite.domain.stock.detail.dto.response.HolidaysDto;
import mainproject.stocksite.domain.stock.detail.dto.response.InvestorsDto;
import mainproject.stocksite.domain.stock.detail.dto.response.PresentQuotationsDto;
import mainproject.stocksite.domain.stock.detail.dto.response.QuotationsByPeriodDto;
import mainproject.stocksite.domain.stock.detail.options.DetailedStockOptions;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static mainproject.stocksite.domain.stock.accesstoken.service.AccessTokenService.accessToken;

@RequiredArgsConstructor
@Service
public class DetailedStockService {

    private final AccessTokenService accessTokenService;
    private final AccessTokenRequestInfo accessTokenRequestInfo;

    private final String STOCK_DEFAULT_URL = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/";

    private final RestTemplate restTemplate;

    private HttpHeaders baseHeaders() {
        if (accessToken == null) accessTokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("authorization", "Bearer " + accessToken);
        headers.set("appkey", accessTokenRequestInfo.getAppKey());
        headers.set("appsecret", accessTokenRequestInfo.getAppSecret());
        return headers;
    }

    @Transactional(readOnly = true)
    public PresentQuotationsDto findPresentQuotations(String stockCode) {

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("tr_id", "FHKST01010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "inquire-price";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .build();

        ResponseEntity<PresentQuotationsDto> response;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    PresentQuotationsDto.class
            );

            return response.getBody();

        } catch (Exception e) {
            handleErrors(e);
        }

        return null;
    }

    @Transactional(readOnly = true)
    public InvestorsDto findInvestors(String stockCode) {

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("tr_id", "FHKST01010900");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "inquire-investor";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .build();

        ResponseEntity<InvestorsDto> response;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    InvestorsDto.class
            );

            return response.getBody();

        } catch (Exception e) {
            handleErrors(e);
        }

        return null;
    }

    @Transactional(readOnly = true)
    public QuotationsByPeriodDto findQuotationsByPeriod(String stockCode,
                                                        DetailedStockOptions detailedStockOptions) {

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("tr_id", "FHKST03010100");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "inquire-daily-itemchartprice";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                .queryParam("FID_INPUT_ISCD", stockCode)
                .queryParam("FID_INPUT_DATE_1", detailedStockOptions.getStart())
                .queryParam("FID_INPUT_DATE_2", detailedStockOptions.getEnd())
                .queryParam("FID_PERIOD_DIV_CODE", detailedStockOptions.getPeriodcode())
                .queryParam("FID_ORG_ADJ_PRC", detailedStockOptions.getCode())
                .build();

        ResponseEntity<QuotationsByPeriodDto> response;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    QuotationsByPeriodDto.class
            );

            return response.getBody();

        } catch (Exception e) {
            handleErrors(e);
        }

        return null;
    }

    @Transactional(readOnly = true)
    public HolidaysDto findHolidays(String baseDate) {

        HttpHeaders requestHeaders = baseHeaders();
        requestHeaders.set("content-type", "application/json; charset=utf-8");
        requestHeaders.set("tr_id", "CTCA0903R");
        requestHeaders.set("custtype", "P");
        HttpEntity<String> requestMessage = new HttpEntity<>(requestHeaders);

        String url = STOCK_DEFAULT_URL + "chk-holiday";

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("BASS_DT", baseDate)
                .queryParam("CTX_AREA_NK", (Object) null)
                .queryParam("CTX_AREA_FK", (Object) null)
                .build();

        ResponseEntity<HolidaysDto> response;

        try {
            response = restTemplate.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    requestMessage,
                    HolidaysDto.class
            );

            return response.getBody();

        } catch (Exception e) {
            handleErrors(e);
        }

        return null;
    }

    private void handleErrors(Exception e) {
        String[] errorMessage = e.getMessage().split("\"");
        String errorCode = errorMessage[8];

        switch (errorCode) {
            case "EGW00001":    // 일시적인 오류
                throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
            case "EGW00002":    // 서버 에러
                throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            case "EGW00121":    // 유효하지 않은 토큰
                throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
            case "EGW00201":    // 초당 거래건수 초과
                throw new BusinessLogicException(ExceptionCode.UNABLE_TO_REQUEST_AGAIN);
        }
    }
}
