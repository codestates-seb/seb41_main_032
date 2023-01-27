package mainproject.stocksite.domain.chat;


import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
public class ChatRoom {
    private String roomId;
    private String name;
    private List<WebSocketSession> sessions = new ArrayList<>();

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public void handleActions(WebSocketSession session, ChatMessageDto chatMessage, ChatService chatService) {
        if (chatMessage.getType() == ChatMessageDto.MessageType.ENTER) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장하셨습니다.");
        }
        sendMessage(chatMessage, chatService);
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));  // parallelStream()을 사용하여 멀티쓰레드로 처리
    }
}

