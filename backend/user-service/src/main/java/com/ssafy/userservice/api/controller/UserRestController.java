package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.request.UserInfoRequest;
import com.ssafy.userservice.api.service.OAuth2Service;
import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserRestController {
    private final UserService userService;
    private final OAuth2Service oAuth2Service;

    @GetMapping("/getuser")
    public ResponseEntity<User> getUser(@AuthenticationPrincipal UserDetails userDetails){
        log.info("userDetails : {}", userDetails);
        Auth auth = userService.getAuth(userDetails.getUsername()).getBody();
        User user = userService.getUser(auth.getId()).getBody();
        return ResponseEntity.ok(user);
    }

//    @GetMapping("/oauth2/authorization/kakao")
//    public RedirectView kakaoLogin() {
//        log.info("==========login controller 동작2345============");
//        RedirectView redirectView = new RedirectView();
//        redirectView.setUrl(oAuth2Service.getAuthorizationUrl("kakao"));
//        return redirectView;
//    }

    @PostMapping("/login/oauth/kakao")
    public ResponseEntity<String> handleKakaoCallback(@RequestParam("code") String code) {
        log.info("handleKakaoCallback 호출");
        String accessToken = oAuth2Service.kakaoCallBack(code);

        // 생성된 토큰을 리액트에 전달
        return ResponseEntity.ok(accessToken);
    }

//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletRequest request) {
//        authService.logout(request);
//        return ResponseEntity.ok().build();
//    }

    @GetMapping("/get")
    public User getTest() {
        User user = userService.getTest("1").get();
        return user; // 로그인 성공시 uuid 리턴
    }

    // User 탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        return userService.deleteUser(id);
    }

    // User 정보 조회
    @GetMapping("/profile/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id){
        return userService.getUser(id);
    }

    // User 정보 수정
    @PatchMapping("/profile/{id}")
    public ResponseEntity<?> patchUser(@PathVariable String id, @RequestBody UserInfoRequest userInfoRequest){
        return userService.patchUser(id, userInfoRequest);
    }
}
