package com.imre.webapp.controller;


import com.imre.webapp.service.EmailService;
import com.imre.webapp.model.Email;
import com.imre.webapp.repository.EmailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final EmailRepository emailRepository;

    @PostMapping("")
    public ResponseEntity<String> addItem(
        @RequestBody final Email newEmail
    ) throws Exception {

        emailService.sendSimpleMessage(
            newEmail.getFrom(),
            newEmail.getTo(),
            newEmail.getCc(),
            newEmail.getSubject(),
            newEmail.getText()
        );

        emailRepository.save(newEmail);

        return new ResponseEntity<>("Email sent", HttpStatus.OK);
    }

}
