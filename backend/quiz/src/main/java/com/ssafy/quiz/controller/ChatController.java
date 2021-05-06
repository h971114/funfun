package com.ssafy.quiz.controller;
import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ssafy.quiz.domain.ChatMessage;
import com.ssafy.quiz.domain.MessageType;
import com.ssafy.quiz.domain.QuizInfo;
import com.ssafy.quiz.domain.QuizInfoMap;

import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

@Controller
@CrossOrigin("*")
public class ChatController {

	@Resource
	@Autowired
	private QuizInfoMap quizinfomap;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    
    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessage chatMessage , SimpMessageHeaderAccessor headerAccessor) {
    	System.out.println(headerAccessor.getSessionId());

    	String ID = headerAccessor.getSessionId();
    	if(MessageType.JOIN.equals(chatMessage.getType())) {
    		chatMessage.setContent(chatMessage.getSender()+"님이 입장하셨습니다.");
    		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
    		headerAccessor.getSessionAttributes().put("roomnumber", chatMessage.getRoomnumber());
    		if(quizinfomap.getQuizmap().containsKey(chatMessage.getRoomnumber())) { // 방에 사람이 이미 있는경우
    			QuizInfo quiz =  quizinfomap.getQuizmap().get(chatMessage.getRoomnumber());
    			chatMessage.setId(ID);
    			quiz.setUsernumber(quiz.getUsernumber()+1);
    			quiz.getIdnicknamemap().put(ID, chatMessage.getSender());
    			quizinfomap.getQuizmap().put(chatMessage.getRoomnumber(), quiz);
    		}
    		else { // 방에 사람이 없는 경우
    			//퀴즈정보 받기
    			QuizInfo quiz = new QuizInfo();
    			chatMessage.setId(ID);
    			quiz.setUsernumber(1);
    			quiz.getIdnicknamemap().put(ID, chatMessage.getSender());
    			quizinfomap.getQuizmap().put(chatMessage.getRoomnumber(), quiz);
    		}
    	}
    	if(MessageType.ADMIN.equals(chatMessage.getType())) { // 팀 변경.
    		
    	}
    	System.out.println(chatMessage);
    	System.out.println(quizinfomap.getQuizmap().toString());
    	messagingTemplate.convertAndSend("/topic/"+chatMessage.getRoomnumber(), chatMessage);
    }
    
}