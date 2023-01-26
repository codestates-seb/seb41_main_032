package mainproject.stocksite.domain.chat;



import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@RequiredArgsConstructor
@Configuration  // 스프링 빈으로 등록
@EnableWebSocket  // 웹소켓을 사용하기 위한 어노테이션
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/chat")  // 웹소켓 핸들러를 "/ws/chat"으로 매핑
                .setAllowedOrigins("*");  // 모든 도메인에서 접근 가능하도록 설정
    }
}
