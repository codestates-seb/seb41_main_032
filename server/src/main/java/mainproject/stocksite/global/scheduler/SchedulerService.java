//package mainproject.stocksite.global;
//
//import mainproject.stocksite.domain.stock.AccessToken.controller.AccessTokenController;
//import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//@Service
//public class SchedulerService {
//
//    @Scheduled(cron = "0 * * * * *")	// 1분마다
////    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")    // 매일 자정
//     public void run() {
//        AccessTokenController accessTokenController = new AccessTokenController();
//        accessTokenController.setAppKey(accessTokenController.getAppKey());
//        accessTokenController.setAppSecret(accessTokenController.getAppSecret());
//        System.out.println(accessTokenController.getGrantType());
//        System.out.println(accessTokenController.getAppKey());
//        System.out.println(accessTokenController.getAppSecret());
//        ResponseEntity result = accessTokenController.getAccessToken();
//        System.out.println("access-token = " + result.getBody());
//    }
//}
