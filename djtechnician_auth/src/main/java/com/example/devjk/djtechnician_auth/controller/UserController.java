package com.example.devjk.djtechnician_auth.controller;

import com.example.devjk.djtechnician_auth.Entity.User;
import com.example.devjk.djtechnician_auth.Entity.UserPrincipal;
import com.example.devjk.djtechnician_auth.Entity.UserRepository;
import com.example.devjk.djtechnician_auth.annotation.CurrentUser;
import com.example.devjk.djtechnician_auth.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  private final UserRepository userRepository;

  @Autowired
  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/user/me")
  @PreAuthorize("hasRole('USER')")
  public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
    return userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
  }

}
