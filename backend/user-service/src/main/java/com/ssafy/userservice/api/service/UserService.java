package com.ssafy.userservice.api.service;

import com.ssafy.userservice.api.oauth2.userinfo.KakaoUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.NaverUserInfo;
import com.ssafy.userservice.api.oauth2.userinfo.OAuth2UserInfo;
import com.ssafy.userservice.db.entity.Auth;
import com.ssafy.userservice.db.entity.PrincipalDetails;
import com.ssafy.userservice.db.entity.User;
import com.ssafy.userservice.db.repository.AuthRepository;
import com.ssafy.userservice.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
        String role = "ROLE_USER"; //일반 유저
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
                    .role(role)
                    .build();
            authRepository.save(auth);
        }
        else{
            auth =findAuth.get();
        }
        return new PrincipalDetails(auth, oAuth2User.getAttributes());
    }
}
