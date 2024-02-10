package com.ssafy.userservice.api.controller;

import com.ssafy.userservice.api.request.UserInfoRequest;
import com.ssafy.userservice.api.service.OAuth2Service;
import com.ssafy.userservice.api.service.UserService;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/login/oauth/{provider}")
    public ResponseEntity<User> handleKakaoCallback(@PathVariable String provider, @RequestParam("code") String code, HttpServletResponse response) {
        log.info("handle {} Callback 호출", provider);
        User user = oAuth2Service.oauth2Login(provider, code, response);

        // 생성된 토큰을 리액트에 전달
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        oAuth2Service.logout(request);
        return ResponseEntity.ok().build();
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
