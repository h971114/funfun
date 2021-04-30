package com.ssafy.quiz.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Result {

    @Id
    @GeneratedValue
    @Column(name = "result_no")
    private int result_no;

    @Column(name = "result_name")
    private String name;

    @Column(name = "result_score")
    private String score;

    @Column(name = "result_room_no")
    private int result_room_no;
}
