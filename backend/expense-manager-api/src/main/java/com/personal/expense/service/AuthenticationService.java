package com.personal.expense.service;

import com.personal.expense.model.JwtAuthenticationResponse;
import com.personal.expense.model.SignInRequest;
import com.personal.expense.model.SignUpRequest;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);
    JwtAuthenticationResponse signin(SignInRequest request);
}