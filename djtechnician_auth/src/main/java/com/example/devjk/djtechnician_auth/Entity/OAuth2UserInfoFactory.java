package com.example.devjk.djtechnician_auth.Entity;

import com.example.devjk.djtechnician_auth.exception.OAuth2AuthenticationProcessingException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;

import java.util.Map;

public class OAuth2UserInfoFactory {

  public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
    if(AuthProvider.NAVER.toString().equalsIgnoreCase(registrationId)) {
      return new NaverOAuth2UserInfo(attributes);
    }else if(AuthProvider.KAKAO.toString().equalsIgnoreCase(registrationId)) {
      return new KakaoOAuth2UserInfo(attributes);
    }else {
      throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
    }
  }

}
