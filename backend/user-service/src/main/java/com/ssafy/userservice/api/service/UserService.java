package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.messanger.EventProducer;
import com.ssafy.userservice.api.oauth2.exception.AuthNotFoundException;
import com.ssafy.userservice.api.oauth2.exception.UserNotFoundException;
import com.ssafy.userservice.api.oauth2.userinfo.KakaoUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.NaverUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.OAuth2UserInfo;
import com.ssafy.userservice.api.request.UserDeleteRequest;
import com.ssafy.userservice.db.entity.*;
import com.ssafy.userservice.api.request.UserInfoRequest;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.db.repository.RoleRepository;
import com.ssafy.userservice.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;

    private final EventProducer eventProducer;

    // User 탈퇴
    public ResponseEntity<?> deleteUser(String id){
        Optional<User> findUser = userRepository.findById(id);
        if (findUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error during deletion");
        }
        else{
            userRepository.deleteById(id);

            eventProducer.request("user-delete",
                    UserDeleteRequest.builder()
                            .userId(UUID.fromString(id)).build()
            );
            return ResponseEntity.ok().body("Delete successfully");
        }
    }

    // User 정보 조회
    public ResponseEntity<User> getUser(String id){
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(UserNotFoundException::new);
            return ResponseEntity.ok().body(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<Auth> getAuth(String id){
        try {
            Auth auth = authRepository.findById(id)
                    .orElseThrow(AuthNotFoundException::new);
            return ResponseEntity.ok().body(auth);
        } catch (AuthNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // User 정보 수정
    public ResponseEntity<?> patchUser(String id, UserInfoRequest userInfoRequest){
        Optional<User> findUser = userRepository.findById(id);
        User user = null;
        // user를 찾지 못했다면
        if (findUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error during modification");
        }
        else{
            List<Role> userRoles = new ArrayList<>();
            List<String> userInfoRoles = userInfoRequest.getUserRoles();
            for(String roleName : userInfoRoles){
                Role role = roleRepository.findByRoleName(roleName);
                if(role == null){
                    role = new Role(roleName);
                    roleRepository.save(role);
                }
                userRoles.add(role);
            }

            user = User.builder()
                    .id(id)
                    .nickname(userInfoRequest.getNickname())
                    .gender(userInfoRequest.getGender())
                    .ageRange(userInfoRequest.getAgeRange())
                    .profile_url(userInfoRequest.getProfile_url())
                    .userRoles(userRoles)
                    .build();
            userRepository.save(user);
            return ResponseEntity.ok().body("UserInfo modify successfully");
        }
    }
}
