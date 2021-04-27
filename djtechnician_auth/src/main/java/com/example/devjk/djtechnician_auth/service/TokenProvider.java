package com.example.devjk.djtechnician_auth.service;

import com.example.devjk.djtechnician_auth.Entity.UserPrincipal;
import com.example.devjk.djtechnician_auth.config.AppProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Arrays;
import java.util.Date;

@Service
public class TokenProvider {

  private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
  private final AppProperties appProperties;
  private final SecretKey secretKey;

  @Autowired
  public TokenProvider(AppProperties appProperties) {
    this.appProperties = appProperties;
    this.secretKey = Keys.hmacShaKeyFor(appProperties.getAuth().getTokenSecret().getBytes());
  }

  public String createToken(Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());
    return Jwts.builder()
            .setSubject(Long.toString(userPrincipal.getId()))
            .setIssuedAt(new Date())
            .setExpiration(expiryDate)
            .signWith(secretKey, SignatureAlgorithm.HS512)
            .compact();
  }

  public Long getUserIdFromToken(String token) {
    Claims claims = Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody();
    return Long.parseLong(claims.getSubject());
  }

  public boolean validateToken(String authToken) {
    try{
      Jwts.parserBuilder()
              .setSigningKey(secretKey)
              .build()
              .parseClaimsJws(authToken);
      return true;
    }catch(Exception e) {
      if(logger.isDebugEnabled()) {
        logger.debug(Arrays.toString(e.getStackTrace()));
      }
    }
    return false;
  }

}
