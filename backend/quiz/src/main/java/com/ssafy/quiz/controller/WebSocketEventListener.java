package com.ssafy.quiz.controller;
import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.ssafy.quiz.domain.ChatMessage;
import com.ssafy.quiz.domain.MessageType;
import com.ssafy.quiz.domain.QuizInfo;
import com.ssafy.quiz.domain.QuizInfoMap;

@Component
@CrossOrigin("*")
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    
	@Resource
	@Autowired
	private QuizInfoMap quizinfomap;
    
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
    	StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    	logger.info(headerAccessor.toString());
    	logger.info("Received a new web socket connection. Session ID : [{}]", headerAccessor.getSessionId());
        logger.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println(event.getMessage());
        String roomnumber = ((String) headerAccessor.getSessionAttributes().get("roomnumber"));
//        QuizInfo quiz = quizinfomap.getQuizmap().get(roomnumber);
//        quiz.setUsernumber(quiz.getUsernumber()-1);
//        if(quiz.getUsernumber() == 0) {
//        	quizinfomap.getQuizmap().remove(roomnumber);
//        }
//        System.out.println(quizinfomap.toString());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
            logger.info("User Disconnected : " + username);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(MessageType.LEAVE);
            chatMessage.setSender(username);
            chatMessage.setRoomnumber((String) headerAccessor.getSessionAttributes().get("roomnumber"));
            messagingTemplate.convertAndSend("/topic/"+chatMessage.getRoomnumber(), chatMessage);
    }
}