package com.ssafy.quiz.controller;

import com.ssafy.quiz.domain.Quiz;
import com.ssafy.quiz.repository.QuizRepository;
import com.ssafy.quiz.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    @Autowired
    QuizService quizService;

    @PostMapping("")
    public ResponseEntity<String> saveQuiz(@RequestBody Quiz quiz, HttpServletRequest req) {
        logger.info("퀴즈 등록");
        quizService.save(quiz);
        return new ResponseEntity<>(SUCCESS, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<String> deleteQuiz(@PathVariable(value = "no") int quiz_no, HttpServletRequest req) {
        logger.info("퀴즈 삭제");
        quizService.deleteById(quiz_no);
        return new ResponseEntity<>(SUCCESS, HttpStatus.ACCEPTED);
    }

    @PutMapping("")
    public ResponseEntity<String> updateQuiz(@RequestBody Quiz quiz, HttpServletRequest req) {
        logger.info("퀴즈 수정");
        quizService.updateQuiz(quiz);
        return new ResponseEntity<>(SUCCESS, HttpStatus.ACCEPTED);
    }

    @GetMapping("/type/{type}")
    public List<Quiz> findByType(@PathVariable(value = "type") int type, HttpServletRequest req) {
        logger.info(type+" 퀴즈 검색");
        return quizService.findByType(type);
    }
}

