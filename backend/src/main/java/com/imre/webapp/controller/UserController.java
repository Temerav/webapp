package com.imre.webapp.controller;


import com.imre.webapp.auth.AuthResponse;
import com.imre.webapp.auth.JwtProvider;
import com.imre.webapp.model.User;
import com.imre.webapp.repository.UserRepository;
import com.imre.webapp.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserServiceImpl customUserDetails;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(
        @RequestBody final User user
    ) throws Exception {
        final var email = user.getEmail();
        final var password = user.getPassword();
        final var fullName = user.getFullName();
        final var mobile = user.getMobile();
        final var role = user.getRole();
        final var isEmailExist = userRepository.findUserByEmail(email);

        if (isEmailExist.isPresent()) {
            throw new Exception("Email Is Already Used With Another Account");
        }
        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setMobile(mobile);
        createdUser.setRole(role);
        createdUser.setPassword(passwordEncoder.encode(password));

        userRepository.save(createdUser);

        Authentication authentication =
            new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        final var token = JwtProvider.generateToken(authentication);
        final var authResponse = new AuthResponse();

        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
        authResponse.setEmail(email);
        authResponse.setFullName(fullName);
        authResponse.setRole(role);

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(
        @RequestBody final User loginRequest
    ) {
        final var username = loginRequest.getEmail();
        final var password = loginRequest.getPassword();
        final var authentication = authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        var name = "";
        var user = userRepository.findUserByEmail(username);
        var role = "";

        if (user.isPresent()){
            name = user.get().getFullName();
            role = user.get().getRole();
        }

        final var token = JwtProvider.generateToken(authentication);
        final var authResponse = new AuthResponse();

        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);
        authResponse.setEmail(username);
        authResponse.setFullName(name);
        authResponse.setRole(role);

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }

    private Authentication authenticate(
        final String username,
        final String password
    ) {
        final var userDetails = customUserDetails.loadUserByUsername(username);

        if(userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);
            throw new BadCredentialsException("Invalid username and password");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch"+userDetails);
            throw new BadCredentialsException("Invalid password");

        }
        return new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities()
        );
    }
}
