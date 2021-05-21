package com.ssafy.quiz.service;

import com.ssafy.quiz.domain.Quiz;
import com.ssafy.quiz.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    QuizRepository quizRepository;

    public void save(Quiz quiz) {
        quizRepository.save(quiz);
    }

    public void deleteById(int quiz_no) {
        quizRepository.delete(quiz_no);
    }

    public void updateQuiz(Quiz quiz) {
        Quiz tempQuiz = quizRepository.find(quiz.getQuiz_no());
        tempQuiz.setType(quiz.getType());
        tempQuiz.setContent(quiz.getContent());
        tempQuiz.setOrder(quiz.getOrder());
        // 5지선다
        tempQuiz.setExam1(quiz.getExam1());
        tempQuiz.setExam2(quiz.getExam2());
        tempQuiz.setExam3(quiz.getExam3());
        tempQuiz.setExam4(quiz.getExam4());
        tempQuiz.setExam5(quiz.getExam5());
        // ox
        tempQuiz.setOx(quiz.getOx());
        // 단답
        tempQuiz.setShort_word(quiz.getShort_word());
        // 정답
        tempQuiz.setAnswer(quiz.getAnswer());
        tempQuiz.setRoom_no(quiz.getRoom_no());
        quizRepository.save(tempQuiz);
    }

    public List<Quiz> findByType(int type) {
        return quizRepository.findByType(type);
    }
    public List<Quiz> findByRoom(String room_no){
    	return quizRepository.findwithroom(room_no);
    }
}
