package com.ssafy.quiz.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_no")
    private int quiz_no;

//    @ManyToOne
//    @JoinColumn(name = "quiz_member_no")
//    private Member member;
    
    @Column(name = "quiz_member_no")
    private int memberno;
    @Column(name = "quiz_type")
    private int type;
    @Column(name = "quiz_content")
    private String content;
    @Column(name = "quiz_exam1")
    private String exam1;
    @Column(name = "quiz_exam2")
    private String exam2;
    @Column(name = "quiz_exam3")
    private String exam3;
    @Column(name = "quiz_exam4")
    private String exam4;
    @Column(name = "quiz_exam5")
    private String exam5;
    @Column(name = "quiz_ox")
    private String ox;
    @Column(name = "quiz_short_word")
    private String short_word;
    @Column(name = "quiz_answer")
    private String answer;
    @Column(name = "quiz_order")
    private int order;
    @Column(name = "quiz_img")
    private String img;
    @Column(name = "room_no")
    private String room_no;
}
