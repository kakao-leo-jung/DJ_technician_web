package com.example.devjk.djtechnician_auth.Entity;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;

public enum AuthProvider {

  NAVER {
    /*
    @Override
    public ClientRegistration.Builder getBuilder(String registrationId) {
      ClientRegistration.Builder builder = getBuilder(registrationId,
              ClientAuthenticationMethod.POST, DEFAULT_LOGIN_REDIRECT_URL);
      builder.scope("profile");
      builder.authorizationUri()
      builder.authorizationUri("https://kauth.kakao.com/oauth/authorize"); builder.tokenUri("https://kauth.kakao.com/oauth/token"); builder.userInfoUri("https://kapi.kakao.com/v2/user/me"); builder.userNameAttributeName("id"); builder.clientName("Kakao");

    }
    */
  },
  KAKAO {

  }

  private static final String DEFAULT_LOGIN_REDIRECT_URL = "{baseUrl}/user/oauth/{registrationId}";

}
