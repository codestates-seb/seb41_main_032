package mainproject.stocksite.domain.auth.filter;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import mainproject.stocksite.domain.auth.jwt.JwtTokenizer;
import mainproject.stocksite.domain.auth.utils.CustomAuthorityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

// JWT에 대해 검증 작업을 수행하는 코드 (한번만 실행)
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    // 특정 조건에 부합하면 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛰도록 하는 코드
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");  // null or Bearer 시작 값이 아니라면 동작X
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
