package mainproject.stocksite.domain.chat;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@RequiredArgsConstructor  // final 필드를 가진 생성자를 만들어줌
@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {  // 클라이언트로부터 메시지가 도착했을 때 실행
        String payload = message.getPayload();  // 메시지의 내용
        log.info("payload: {}", payload);  // 메시지의 내용을 로그로 출력
        ChatMessageDto chatMessage = objectMapper.readValue(payload, ChatMessageDto.class);  // 메시지의 내용을 ChatMessageDto 객체로 변환

        ChatRoom room = chatService.findRoomById(chatMessage.getRoomId());
        room.handleActions(session, chatMessage, chatService);  // ChatRoom 객체의 handleActions() 메소드를 호출하여 메시지를 처리
    }
}
