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
    	boolean issend = true;
    	String ID = headerAccessor.getSessionId();
    	if(MessageType.REJOIN.equals(chatMessage.getType())) {
    		if(!quizinfomap.getQuizmap().containsKey(chatMessage.getRoomnumber())) {
    			chatMessage.setType(MessageType.JOIN);
    		}
    		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
    		headerAccessor.getSessionAttributes().put("roomnumber", chatMessage.getRoomnumber());
    		quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setUsernumber(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getUsernumber()+1);
    	}
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
    			switch(quiz.getType()) {
    			case 0:
    				quiz.getPersonalscore().put(ID, 0);
    				quiz.setAlivemember(quiz.getAlivemember()+1);
    				
    				break;
    			case 1:
    				quiz.getPersonalscore().put(ID, 0);
    				break;
    			case 3 :
    				quiz.getPersonalscore().put(ID, 0);
    				break;
    			}
    			quizinfomap.getQuizmap().put(chatMessage.getRoomnumber(), quiz);
    		}
    		else { // 방에 사람이 없는 경우
    			//퀴즈정보 받기
    			QuizInfo quiz = new QuizInfo();
    			chatMessage.setId(ID);
    			quiz.setUsernumber(1);
    			headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        		headerAccessor.getSessionAttributes().put("roomnumber", chatMessage.getRoomnumber());
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
    			switch(quiz.getType()) {
    			case 0:
    				quiz.getPersonalscore().put(ID, 0);
    				quiz.setAlivemember(quiz.getAlivemember()+1);
    				break;
    			case 1:
    				quiz.getPersonalscore().put(ID, 0);
    				break;
    			case 2:
    				quiz.getTeamscore().put("team1", 0);
    				quiz.getTeamscore().put("team2", 0);
    				quiz.getTeamscore().put("team3", 0);
    				quiz.getTeamscore().put("team4", 0);
    				quiz.getTeamscore().put("team5", 0);
    				break;
    			case 3 :
    				quiz.getPersonalscore().put(ID, 0);
    				break;
    			case 4 :
    				quiz.getTeamscore().put("team1", 0);
    				quiz.getTeamscore().put("team2", 0);
    				quiz.getTeamscore().put("team3", 0);
    				quiz.getTeamscore().put("team4", 0);
    				quiz.getTeamscore().put("team5", 0);
    				break;
    			}
    			quiz.getTeammember().get("team0").add(tmp);
    			quizinfomap.getQuizmap().put(chatMessage.getRoomnumber(), quiz);
    		}
    	}
    	if(MessageType.ADMIN.equals(chatMessage.getType())) { // 팀 변경.
    		String fromteam = chatMessage.getFromteam();
    		String toteam = chatMessage.getToteam();
    		String id = chatMessage.getId();
    		QuizInfo quiz = quizinfomap.getQuizmap().get(chatMessage.getRoomnumber());
    		Map<String, LinkedList<Map<String, String>>> teammap =  quiz.getTeammember();
    		Map<String, String> removemap = null;
    		for(Map<String, String> tempmap :teammap.get("team"+fromteam)) {

    			if(id.equals(tempmap.get("id"))) {
    				removemap = tempmap;
    				System.out.println("in");
    				System.out.println(removemap);
    				break;
    			}
    		}
    		teammap.get("team"+fromteam).remove(removemap);
    		teammap.get("team"+toteam).add(removemap);
    	}
    	if(MessageType.NEXT.equals(chatMessage.getType())) {
    		if(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIndex() == quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIsresult()) {
    			
    		}
    		else {
    			quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setIndex(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIndex()+1);
    		}
    		quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setLeftmember(3);
    		if(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getType() == 0) {
    			quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setAlivemembers(new LinkedList<String>());
    		}
    	}
    	if(MessageType.ANSWER.equals(chatMessage.getType())) {
    		QuizInfo quiz = quizinfomap.getQuizmap().get(chatMessage.getRoomnumber());
    		switch(quiz.getType()) {
    		case 0:
    			if("alive".equals(chatMessage.getContent())) {
    				//정답
    				quiz.getAlivemembers().add(chatMessage.getId());
    			}
    			else if("die".equals(chatMessage.getContent())) {
    				quiz.setAlivemember(quiz.getAlivemember()-1);
    				quiz.getAlivemembers().remove(chatMessage.getId());
    				//탈락
    			}
    			issend = false;
    			break;
    		case 1:
    			if("alive".equals(chatMessage.getContent())) {
    				if(quiz.getLeftmember() == 3) {
    					quiz.getPersonalscore().put(chatMessage.getId(), quiz.getPersonalscore().get(chatMessage.getId()) + 10);
    				}
    				else if(quiz.getLeftmember() ==2) {
    					quiz.getPersonalscore().put(chatMessage.getId(), quiz.getPersonalscore().get(chatMessage.getId()) + 7);
    				}
    				else if(quiz.getLeftmember() ==1) {
    					quiz.getPersonalscore().put(chatMessage.getId(), quiz.getPersonalscore().get(chatMessage.getId()) + 3);
    				}
    				quiz.setLeftmember(quiz.getLeftmember()-1);
    				issend = false;
        			if(quiz.getLeftmember() == 0) {
        				issend = true;
        				chatMessage.setType(MessageType.NEXT);
        			}
    			}
    			else {
    				
    			}
    			
    			break;
    		case 2:
    			if("alive".equals(chatMessage.getContent())) {
    				quiz.getTeamscore().put("team"+chatMessage.getTeam(), quiz.getTeamscore().get("team"+chatMessage.getTeam())+1);
    				chatMessage.setContent("정답! +1점!");
    				
    			}
    			else {
    				chatMessage.setContent("오답! +0점!");
    				//nothing
    			}
				chatMessage.setType(MessageType.NEXT);
				if(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIndex() == quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIsresult()) {
	    			
	    		}
	    		else {
	    			quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setIndex(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIndex()+1);
	    		}
    			break;
    		case 3:
    			if("alive".equals(chatMessage.getContent())) {
    				if(quiz.getLeftmember() == 3) {
    					quiz.getPersonalscore().put(chatMessage.getId(), quiz.getPersonalscore().get(chatMessage.getId()) + 10);
    				}
    				else if(quiz.getLeftmember() ==2) {
    					quiz.getPersonalscore().put(chatMessage.getId(), quiz.getPersonalscore().get(chatMessage.getId()) + 7);
    				}
    				else if(quiz.getLeftmember() ==1) {
    					quiz.getPersonalscore().put(chatMessage.getId(), quiz.getPersonalscore().get(chatMessage.getId()) + 3);
    				}
    				issend = false;
    				quiz.setLeftmember(quiz.getLeftmember()-1);
        			if(quiz.getLeftmember() == 0) {
        				issend = true;
        				chatMessage.setType(MessageType.NEXT);
        			}
    			}
    			break;
    		case 4:
    			// 주관식 팀전
    			if("alive".equals(chatMessage.getContent())) {
    				quiz.getTeamscore().put("team"+chatMessage.getTeam(), quiz.getTeamscore().get("team"+chatMessage.getTeam())+1);
    				chatMessage.setContent("정답! +1점!");
    			}
    			else {
    				chatMessage.setContent("오답! +0점!");
    			}
    			chatMessage.setType(MessageType.NEXT);
    			break;
    		}
    	}
    	if(MessageType.TOINDEX.equals(chatMessage.getType())) {
    		//do nothing
    	}
    	if(MessageType.START.equals(chatMessage.getType())) {
    		quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setIndex(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getIndex()+1);;
    		if(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getType() == 0) {
    			quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setAlivemember(quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).getAlivemember()-1);
    		}
    	}
    	
    	if(MessageType.PERTEAM.equals(chatMessage.getType())) {
    		quizinfomap.getQuizmap().get(chatMessage.getRoomnumber()).setPerteam(Integer.parseInt(chatMessage.getContent()));
    	}
    	if(issend) {
    		messagingTemplate.convertAndSend("/topic/"+chatMessage.getRoomnumber(), chatMessage);
    	}
    }
    
}