package mainproject.stocksite.domain.stock.detail.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class QuotationsByPeriodDto {
    private Output1 output1;
    private List<Output2> output2 = null;

    @Data
    public static class Output1 {
        private String prdy_vrss;
        private String prdy_vrss_sign;
        private String prdy_ctrt;
        private String stck_prdy_clpr;
        private String acml_vol;
        private String acml_tr_pbmn;
        private String hts_kor_isnm;
        private String stck_prpr;
        private String stck_shrn_iscd;
        private String prdy_vol;
        private String stck_mxpr;
        private String stck_llam;
        private String stck_oprc;
        private String stck_hgpr;
        private String stck_lwpr;
        private String stck_prdy_oprc;
        private String stck_prdy_hgpr;
        private String stck_prdy_lwpr;
        private String askp;
        private String bidp;
        private String prdy_vrss_vol;
        private String vol_tnrt;
        private String stck_fcam;
        private String lstn_stcn;
        private String cpfn;
        private String hts_avls;
        private String per;
        private String eps;
        private String pbr;
        private String itewhol_loan_rmnd_ratem_name;
    }

    @Data
    public static class Output2 {
        private String stck_bsop_date;
        private String stck_clpr;
        private String stck_oprc;
        private String stck_hgpr;
        private String stck_lwpr;
        private String acml_vol;
        private String acml_tr_pbmn;
        private String flng_cls_code;
        private String prtt_rate;
        private String mod_yn;
        private String prdy_vrss_sign;
        private String prdy_vrss;
        private String revl_issu_reas;
    }
}
