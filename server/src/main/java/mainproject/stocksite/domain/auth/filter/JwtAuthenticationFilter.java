package mainproject.stocksite.domain.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import mainproject.stocksite.domain.auth.dto.LoginDto;
import mainproject.stocksite.domain.auth.jwt.JwtTokenizer;
import mainproject.stocksite.domain.member.entity.Member;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

// 클라이언트의 로그인 인증 정보를 수신하는 엔트리포인트
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // 로그인 인증 정보를 전달 받아 UserDetailsService 와 인터렉션 후 인증 여부 판단
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;


    // HttpServletRequest 에서 받은 로그인 정보를 인터셉트해서 AuthenticationManager 에게 넘겨준다.
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();    // 인증 정보를 DTO 클래스로 역직렬화하기 위한 인스턴스
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // request 를 LoginDto 로 역직렬화

        // Username과 Password 정보를 포함한 UsernamePasswordAuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);  // AuthenticationManager 에게 인증 처리 위임. authenticate() 가 실행되면 loadUserByUserName 메서드가 실행됨
    }

    // 클라이언트의 인증 정보가 인증에 성공할 경우 호출되어 토큰을 발급하는 메서드
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();  // Member 엔티티 클래스의 객체를 얻습니다.

        String accessToken = delegateAccessToken(member);   // Access Token 생성
        String refreshToken = delegateRefreshToken(member); // Refresh Token 생성
        long memberId = member.getMemberId(); // 헤더값에 포함할 memberId 생성

        // response header 에 토큰 값 담아주기 + memberId 값
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("MemberId", String.valueOf(memberId));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    // Access Token 생성 메서드
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getUsername());
        claims.put("roles", member.getRoles());

        String subject = member.getUsername();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // Refresh Token 생성 메서드
    private String delegateRefreshToken(Member member) {
        String subject = member.getUsername();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
