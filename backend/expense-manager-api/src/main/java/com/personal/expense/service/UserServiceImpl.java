package com.personal.expense.service;

import com.personal.expense.model.SignUpRequest;
import com.personal.expense.model.UpdateProfileRequest;
import com.personal.expense.model.User;
import com.personal.expense.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User signUp(SignUpRequest signUpRequest) {
        User user = User.builder()
                .firstname(signUpRequest.getFirstname())
                .lastname(signUpRequest.getLastname())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .build();
        return userRepository.save(user);
    }

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    @Override
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    @Transactional
    public User updateProfile(UpdateProfileRequest request) {
        User user = getCurrentUser();
        User dbUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        
        dbUser.setFirstname(request.getFirstname());
        dbUser.setLastname(request.getLastname());
        dbUser.setEmail(request.getEmail());
        
        return userRepository.save(dbUser);
    }

    @Override
    @Transactional
    public String uploadProfilePicture(MultipartFile file) {
        try {
            User user = getCurrentUser();
            User dbUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found"));
            
            dbUser.setProfilePicture(file.getBytes());
            userRepository.save(dbUser);
            
            return "Profile picture updated successfully";
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}