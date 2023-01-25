package mainproject.stocksite.domain.stock.detail.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class HolidaysDto {
    private String ctx_area_nk;
    private String ctx_area_fk;
    private List<Output> output = null;

    @Data
    public static class Output {
        private String bass_dt;
        private String wday_dvsn_cd;
        private String bzdy_yn;
        private String tr_day_yn;
        private String opnd_yn;
        private String sttl_day_yn;
    }
}
