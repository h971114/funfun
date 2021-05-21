package com.ssafy.quiz.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class Room {
    @Id @GeneratedValue
    @Column(name = "room_no")
    private int room_no;
    @Column(name = "room_code")
    private String code;
    @Column(name = "room_member_no")
    private int member_no;
    @Column(name = "room_team_cnt")
    private int team_cnt;
    @Column(name ="room_quiz_cnt")
    private int quiz_cnt;
    @Column(name ="quiz_title")
    private String quiz_title;
    @Column(name ="quiz_date")
    private String quiz_date;
}
