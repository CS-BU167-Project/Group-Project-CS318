package com.personal.expense.service;

import com.personal.expense.model.SignUpRequest;
import com.personal.expense.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User signUp(SignUpRequest signUpRequest);
    UserDetailsService userDetailsService();
    User getCurrentUser();
    User updateProfile(com.personal.expense.model.UpdateProfileRequest request);
    String uploadProfilePicture(MultipartFile file);
}