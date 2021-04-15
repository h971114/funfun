package com.ssafy.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.quiz.domain.Member;


public interface MemberRepository extends JpaRepository<Member, Integer>{

}
