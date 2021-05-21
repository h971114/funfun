package com.ssafy.quiz.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class Member {
    @Id @GeneratedValue
    @Column(name = "member_no")
    private int member_no;
    @Column(name = "member_id")
    private String id;
    @Column(name = "member_pw")
    private String pw;
    @Column(name = "member_nick")
    private String nick;
    @Column(name = "member_email")
    private String email;
}
