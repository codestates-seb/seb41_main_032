package mainproject.stocksite.domain.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatController {

        private final ChatService chatService;

        @PostMapping
        public ChatRoom createRoom(@RequestBody String name) {
        return chatService.createChatRoom(name);
    }

        @GetMapping
        public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }
}
