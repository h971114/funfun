package com.ssafy.quiz.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
public class MemberController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @GetMapping("")
    public void getTest() {
        logger.info("logger 테스트");
    }
}
