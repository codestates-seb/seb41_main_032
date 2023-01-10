package mainproject.stocksite.domain.auth.handler;


import lombok.extern.slf4j.Slf4j;
import mainproject.stocksite.domain.auth.utils.ErrorResponder;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 요청한 리소스에 대해 적절한 권한이 없을 경우 호출되는 핸들러
// AccessDeniedException이 발생하면 ErrorResponse를 생성해서 클라이언트에게 전송
@Slf4j
@Component
public class MemberAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}