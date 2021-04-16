package com.ssafy.quiz.controller;

import com.ssafy.quiz.domain.Quiz;
import com.ssafy.quiz.repository.QuizRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    QuizRepository quizRepository;


    @PostMapping("")
    public void saveQuiz(@RequestBody Quiz quiz, HttpServletRequest req){
        try {
            quizRepository.save(quiz);
        } catch (Exception e){
            logger.error("Fail to save quiz: ", e);
        }
        logger.info("quiz 등록");
    }

    @GetMapping("")
    public List<Quiz> findQuiz(HttpServletRequest req){
        return new ArrayList<>();
    }

    @DeleteMapping("/{no}")
    public void deleteQuiz(@PathVariable(value = "no") int quiz_no, HttpServletRequest req){
        try {
            quizRepository.deleteById(quiz_no);
        } catch (Exception e){
            logger.error("Fail to delete quiz: ", e);
        }
        logger.info(quiz_no+"번 quiz 삭제");
    }
}

