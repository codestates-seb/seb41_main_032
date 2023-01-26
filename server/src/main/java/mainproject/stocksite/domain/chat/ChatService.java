package mainproject.stocksite.domain.chat;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ObjectMapper objectMapper;
    private Map<String, ChatRoom> chatRooms;

    @PostConstruct  // 객체 생성 후에 실행
    private void init() {
        chatRooms = new LinkedHashMap<>();  // 채팅방을 저장할 Map 객체 생성
    }

    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());  // Map 객체에 저장된 모든 채팅방을 List로 반환
    }

    public ChatRoom findRoomById(String id) {
        return chatRooms.get(id);
    }

    public ChatRoom createChatRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(randomId)
                .name(name)
                .build();
        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }



}
