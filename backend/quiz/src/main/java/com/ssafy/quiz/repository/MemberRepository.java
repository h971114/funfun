package com.ssafy.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.quiz.domain.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer>{

    @Query(value = "select m.* from member as m where m.member_id = :member_id", nativeQuery = true)
    Member findByMemberId(String member_id);

    @Query(value = "select m.* from member as m where m.member_id = :member_id and m.member_pw = :member_pw", nativeQuery = true)
    boolean login(String member_id, String member_pw);
}
