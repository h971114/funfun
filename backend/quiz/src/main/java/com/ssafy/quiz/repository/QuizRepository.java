package com.ssafy.quiz.repository;

import com.ssafy.quiz.domain.Quiz;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class QuizRepository {

    private final EntityManager em;

    public void save(Quiz quiz){
        em.persist(quiz);
    }

    public void delete(int quiz_no){
        em.createQuery("delete from Quiz q where q.quiz_no = : quiz_no", Quiz.class)
                .setParameter("quiz_no", quiz_no).executeUpdate();
    }

    public Quiz find(int quiz_no){
        return em.find(Quiz.class, quiz_no);
    }
    public List<Quiz> findwithroom(String room_no) {
    	return em.createQuery("SELECT q FROM Quiz q where q.room_no = : room_no order by quiz_order ", Quiz.class).setParameter("room_no", room_no).getResultList();
    }

    public List<Quiz> findByType(int type) {
        return em.createQuery("select q from Quiz q where q.type = : type", Quiz.class)
                .setParameter("type", type)
                .getResultList();
    }
}
