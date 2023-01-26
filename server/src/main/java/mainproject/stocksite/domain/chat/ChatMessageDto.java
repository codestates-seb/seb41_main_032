package mainproject.stocksite.domain.chat;



import lombok.Getter;
import lombok.Setter;

import java.awt.*;

@Getter
@Setter
public class ChatMessageDto {
    public enum MessageType {
        ENTER, TALK
    }

        private MessageType type;
        private String roomId;
        private String sender;
        private String message;


}
