package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.oauth2.userinfo.KakaoUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.NaverUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.OAuth2UserInfo;
import com.ssafy.userservice.db.entity.*;
import com.ssafy.userservice.api.request.UserInfoRequest;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService extends DefaultOAuth2UserService {
    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;
    private final AuthRepository authRepository;

    public Optional<User> getTest(String id){
        return userRepository.findById(id);
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        OAuth2UserInfo userInfo = null;
        System.out.println(oAuth2User.getAttributes());
        System.out.println(userRequest.getClientRegistration().getRegistrationId());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        System.out.println("registrationId = " + registrationId);
        if (registrationId.equals("naver")) {
            userInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
        } else if (registrationId.equals("kakao")) {
            userInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else {
            System.out.println("로그인 실패");
        }
        System.out.println("userInfo : \n" + userInfo);

        String provider = userInfo.getProvider();
        String providerId = userInfo.getProviderId();
        UUID uuid = UUID.nameUUIDFromBytes(provider.getBytes());
        String id = uuid.toString();
        String username = userInfo.getName();
        String email = userInfo.getEmail();
        String profileUrl = userInfo.getProfileUrl();
        String gender = userInfo.getGender();
        int ageRange = userInfo.getAgeRange();
        String nickname = userInfo.getNickName();

//        System.out.println(oAuth2User.getAttributes());
        Optional<Auth> findAuth = authRepository.findById(id);
        User user = null;
        Auth auth = null;
        if (findAuth.isEmpty()) { //찾지 못했다면
            user = User.builder()
                    .id(id)
                    .nickname(nickname)
                    .gender(gender)
                    .ageRange(ageRange)
                    .profile_url(profileUrl)
                    .build();
            userRepository.save(user);
            auth = Auth.builder()
                    .id(id)
                    .email(email)
                    .name(username)
                    .provider(provider)
                    .providerId(providerId)
                    .authority(Authority.USER)
                    .build();
            authRepository.save(auth);
        }
        else{
            auth =findAuth.get();
        }
        return new PrincipalDetails(auth, oAuth2User.getAttributes());
    }

    // User 탈퇴
    public ResponseEntity<?> deleteUser(String id){
        Optional<User> findUser = userRepository.findById(id);
        if (findUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error during deletion");
        }
        else{
            userRepository.deleteById(id);
            return ResponseEntity.ok().body("Delete successfully");
        }
    }

    // User 정보 조회
    public ResponseEntity<User> getUser(String id){
        Optional<User> findUser = userRepository.findById(id);
        User user = findUser.get();
        return ResponseEntity.ok().body(user);
    }

    public ResponseEntity<Auth> getAuth(String id){
        Optional<Auth> findAuth = authRepository.findById(id);
        Auth auth = findAuth.get();
        return ResponseEntity.ok().body(auth);
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
            user = User.builder()
                    .id(id)
                    .nickname(userInfoRequest.getNickname())
                    .gender(userInfoRequest.getGender())
                    .ageRange(userInfoRequest.getAgeRange())
                    .profile_url(userInfoRequest.getProfile_url())
                    .build();
            userRepository.save(user);
            return ResponseEntity.ok().body("UserInfo modify successfully");
        }
    }
}
