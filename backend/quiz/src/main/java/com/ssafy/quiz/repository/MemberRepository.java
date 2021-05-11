package com.ssafy.quiz.repository;

import lombok.RequiredArgsConstructor;
import com.ssafy.quiz.domain.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

@Repository
@RequiredArgsConstructor
@Transactional
public class MemberRepository {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final EntityManager em;

    public void save(Member member) {
        em.persist(member);

    }

    public void delete(int member_no) {
        em.createQuery("delete from Member m where m.member_no = : member_no")
                .setParameter("member_no", member_no).executeUpdate();
    }

    public Member find(int member_no) {
        return em.find(Member.class, member_no);
    }

    public Member findById(String member_id) {
        try {
            return em.createQuery("select m from Member m where m.id = :member_id", Member.class)
                    .setParameter("member_id", member_id)
                    .getSingleResult();
        } catch (NoResultException nre) {
            return null;
        }
    }

    public Member findByEmail(String member_email) {
        try {
            return em.createQuery("select m from Member m where m.email = :member_email", Member.class)
                    .setParameter("member_email", member_email)
                    .getSingleResult();
        } catch (NoResultException nre) {
            return null;
        }
    }
}
