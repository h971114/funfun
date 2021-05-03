package com.ssafy.quiz.repository;

import lombok.RequiredArgsConstructor;
import com.ssafy.quiz.domain.Member;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
@Transactional
public class MemberRepository{

    private final EntityManager em;

    public void save(Member member){
        em.persist(member);
    }

    public void delete(int member_no){
        em.createQuery("delete from Member m where m.member_no = : member_no", Member.class)
                .setParameter("member_no", member_no);
    }

    public Member find(int member_no){
        return em.find(Member.class, member_no);
    }

    public Member findById(String member_id){
        return em.createQuery("select m from Member m where m.id = :member_id", Member.class)
                .setParameter("member_id", member_id)
                .getSingleResult();
    }

    public Member findByEmail(String member_email){
        return em.createQuery("select m from Member m where m.email = :member_email", Member.class)
                .setParameter("member_email", member_email)
                .getSingleResult();
    }
}
