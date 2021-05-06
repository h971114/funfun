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

@Getter @Setter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class ChatMessage {
    private MessageType type;
    private String sender;
    private String team;
    private String content;
    private String roomnumber;
    private String id;
}
