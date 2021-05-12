package com.ssafy.quiz.controller;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

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
import com.ssafy.quiz.service.QuizService;

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
    
    @Autowired
    QuizService quizService;
    
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
    			Map<String, String> tmp = new HashMap<String, String>();
    			tmp.put("id", ID);
    			tmp.put("title", chatMessage.getSender());
    			quiz.getTeammember().get("team0").add(tmp);
    			quizinfomap.getQuizmap().put(chatMessage.getRoomnumber(), quiz);
    		}
    		else { // 방에 사람이 없는 경우
    			//퀴즈정보 받기
    			QuizInfo quiz = new QuizInfo();
    			chatMessage.setId(ID);
    			quiz.setUsernumber(1);
    			quiz.getIdnicknamemap().put(ID, chatMessage.getSender());
    			quiz.getTeammember().put("team0", new LinkedList<Map<String,String>>());
    			quiz.getTeammember().put("team1", new LinkedList<Map<String,String>>());
    			quiz.getTeammember().put("team2", new LinkedList<Map<String, String>>());
    			quiz.getTeammember().put("team3", new LinkedList<Map<String, String>>());
    			quiz.getTeammember().put("team4", new LinkedList<Map<String, String>>());
    			quiz.getTeammember().put("team5", new LinkedList<Map<String, String>>());
    			quiz.setQuizlist(quizService.findByRoom(chatMessage.getRoomnumber()));
    			quiz.setIndex(0);
    			quiz.setType(quiz.getQuizlist().get(0).getType());
    			Map<String, String> tmp = new HashMap<String, String>();
    			tmp.put("id", ID);
    			tmp.put("title", chatMessage.getSender());
    			quiz.getTeammember().get("team0").add(tmp);
    			quizinfomap.getQuizmap().put(chatMessage.getRoomnumber(), quiz);
    		}
    	}
    	if(MessageType.ADMIN.equals(chatMessage.getType())) { // 팀 변경.
    		System.out.println("in");
    		String fromteam = chatMessage.getFromteam();
    		String toteam = chatMessage.getToteam();
    		String id = chatMessage.getId();
    		System.out.println(fromteam+" "+toteam+" "+id);
    		QuizInfo quiz = quizinfomap.getQuizmap().get(chatMessage.getRoomnumber());
    		Map<String, LinkedList<Map<String, String>>> teammap =  quiz.getTeammember();
    		Map<String, String> removemap = null;
    		for(Map<String, String> tempmap :teammap.get("team"+fromteam)) {
    			System.out.println(tempmap);
    			System.out.println(id+" "+tempmap.get("id"));
    			if(id.equals(tempmap.get("id"))) {
    				removemap = tempmap;
    				System.out.println("in");
    				System.out.println(removemap);
    				break;
    			}
    		}
    		System.out.println(removemap);
    		teammap.get("team"+fromteam).remove(removemap);
    		teammap.get("team"+toteam).add(removemap);
    	}
    	if(MessageType.NEXT.equals(chatMessage.getType())) {
    		quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setIndex(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIndex()+1);
    	}
    	if(MessageType.CHAT.equals(chatMessage.getType())) {
    		//정답 처리
    		QuizInfo quiz = quizinfomap.getQuizmap().get(chatMessage.getRoomnumber());
    		switch(quiz.getType()) {
    		case 0:
    			//생존형은 어케해야될까
    			break;
    		case 1:
    			//객관식 개인전
    			break;
    		case 2:
    			// 객관식 팀전
    			break;
    		case 3:
    			// 주관식 개인전
    			break;
    		case 4:
    			// 주관식 팀전
    			break;
    		}
    	}
    	System.out.println(chatMessage);
    	System.out.println(quizinfomap.getQuizmap().toString());
    	messagingTemplate.convertAndSend("/topic/"+chatMessage.getRoomnumber(), chatMessage);
    }
    
}