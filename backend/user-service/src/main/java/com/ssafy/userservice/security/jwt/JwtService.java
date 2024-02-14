package com.ssafy.userservice.security.jwt;


//import com.example.logincomplete.domain.auth.exception.AuthNotFoundException;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ssafy.userservice.db.repository.AuthRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    /**
     * JWT의 Subject와 Claim으로 id 사용 -> 클레임의 name을 "id"으로 설정
     * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
     */
    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String ID_CLAIM = "id";
    private static final String BEARER = "Bearer ";

    private final AuthRepository authRepository;

    /**
     * AccessToken 생성 메소드
     */
    public String createAccessToken(String id) {
        log.info("createAccessToken() 호출");
        Date now = new Date();
        return JWT.create() // JWT 토큰을 생성하는 빌더 반환
                .withSubject(ACCESS_TOKEN_SUBJECT) // JWT의 Subject 지정 -> AccessToken이므로 AccessToken
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료 시간 설정

                //클레임으로는 저희는 id 하나만 사용합니다.
                //추가적으로 식별자나, 이름 등의 정보를 더 추가하셔도 됩니다.
                //추가하실 경우 .withClaim(클래임 이름, 클래임 값) 으로 설정해주시면 됩니다
                .withClaim(ID_CLAIM, id)
                .sign(Algorithm.HMAC512(secretKey)); // HMAC512 알고리즘 사용, application-jwt.yml에서 지정한 secret 키로 암호화
    }

    /**
     * RefreshToken 생성
     * RefreshToken은 Claim에 id도 넣지 않으므로 withClaim() X
     */
    public String createRefreshToken() {
        log.info("createRefreshToken() 호출");
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }

    /**
     * AccessToken 헤더에 실어서 보내기
     */
    public void sendAccessToken(HttpServletResponse response, String accessToken) {

        log.info("sendAccessToken() 호출");
        response.setHeader(accessHeader, BEARER + accessToken);
        log.info("Access Token sent in header");
    }
//    public void sendAccessToken(HttpServletResponse response, String accessToken) {
//        log.info("sendAccessToken() 호출");
//        response.setStatus(HttpServletResponse.SC_OK);
////        response.setHeader(accessHeader, accessToken);
//        try {
//            response.getWriter().write("{\"access_token\": \"" + accessToken + "\"}");
//            response.getWriter().flush();
//            response.getWriter().close();
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        log.info("재발급된 Access Token : {}", accessToken);
//    }
    public void sendRefreshToken(HttpServletResponse response, String refreshToken) {
        log.info("sendRefreshToken() 호출");
        response.setHeader(refreshHeader, BEARER + refreshToken);
        log.info("Refresh Token sent in header");
    }

    /**
     * AccessToken + RefreshToken 헤더에 실어서 보내기
     */
    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        log.info("sendAccessAndRefreshToken() 호출");
        response.setStatus(HttpServletResponse.SC_OK);

        sendAccessToken(response, accessToken);
        sendRefreshToken(response, refreshToken);
        log.info("Access Token, Refresh Token 헤더 설정 완료");
    }

    /**
     * 헤더에서 AccessToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        log.info("extractAccessToken() 호출");
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(accessToken -> accessToken != null && accessToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * 헤더에서 RefreshToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        log.info("extractRefreshToken() 호출");
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken != null && refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * AccessToken에서 Id 추출
     * 추출 전에 JWT.require()로 검증기 생성
     * verify로 AceessToken 검증 후
     * 유효하다면 getClaim()으로 이메일 추출
     * 유효하지 않다면 빈 Optional 객체 반환
     */
    public Optional<String> extractId(String accessToken) {
        log.info("extractId() 호출");
        try {
            // 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build() // 반환된 빌더로 JWT verifier 생성
                    .verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
                    .getClaim(ID_CLAIM) // claim(id) 가져오기
                    .asString());
        } catch (Exception e) {
            log.error("액세스 토큰이 유효하지 않습니다. {}", e.getMessage());
            return Optional.empty();
        }
    }

    /**
     * AccessToken 헤더 설정
     */
//    public void setAccessTokenHeader(HttpServletResponse response, String accessToken)  {
//        log.info("setAccessTokenHeader() 호출");
////        response.setHeader(accessHeader, accessToken);
//        try {
//            response.getWriter().write("{\"access_token\": \"" + accessToken + "\"}");
//            response.getWriter().flush();
//            response.getWriter().close();
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        log.info("재발급된 Access Token : {}", accessToken);
//    }
//
//    /**
//     * RefreshToken 헤더 설정
//     */
//    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
//        log.info("setRefreshTokenHeader() 호출");
////        response.setHeader(refreshHeader, refreshToken);
//        try {
//            response.getWriter().write("{\"refresh_token\": \"" + refreshToken + "\"}");
//            response.getWriter().flush();
//            response.getWriter().close();
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//    }

    /**
     * RefreshToken DB 저장(업데이트)
     */
    public void updateRefreshToken(String id, String refreshToken) {
        log.info("updateRefreshToken() 호출");
        authRepository.findById(id)
                .ifPresentOrElse(
                        auth -> auth.updateRefreshToken(refreshToken),
                        () -> new Exception("일치하는 회원이 없습니다.")
                );
    }

    public boolean isTokenValid(String token) {
        log.info("isTokenValid() 호출");
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }
}