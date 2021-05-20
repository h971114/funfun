package com.ssafy.quiz.controller;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.quiz.domain.ChatMessage;
import com.ssafy.quiz.domain.Quiz;
import com.ssafy.quiz.domain.QuizInfoMap;

@RestController
@RequestMapping("/team")
@CrossOrigin("*")
public class TeamController {
	
	@Resource
	@Autowired
	private QuizInfoMap quizinfomap;
	 @GetMapping("/{no}")
	public ResponseEntity<Map> getTeam(@PathVariable(value = "no") String room_no, HttpServletRequest req){

		return new ResponseEntity<Map>(quizinfomap.getQuizmap().get(room_no).getTeammember(), HttpStatus.ACCEPTED);
	}
	 @GetMapping("/getteammember")
		public ResponseEntity<List<Map<String, String>>> getTeammember(@RequestParam("no") String room_no, @RequestParam("team") String team_no, HttpServletRequest req){

			return new ResponseEntity<List<Map<String, String>>>(quizinfomap.getQuizmap().get(room_no).getTeammember().get("team"+team_no), HttpStatus.ACCEPTED);
		}
	 @GetMapping("/quiz")
		public ResponseEntity<Quiz> getQuiz(@RequestParam("no") String room_no, @RequestParam("index") int index, @RequestParam("isresult") int isresult, HttpServletRequest req){

			 quizinfomap.getQuizmap().get(room_no).setIsresult(isresult);
			return new ResponseEntity<Quiz>(quizinfomap.getQuizmap().get(room_no).getQuizlist().get(index), HttpStatus.ACCEPTED);
		}
	 
	 @GetMapping("/quizsize")
		public ResponseEntity<Integer> getQuizsize(@RequestParam("no") String room_no, HttpServletRequest req){
			return new ResponseEntity<Integer>(quizinfomap.getQuizmap().get(room_no).getQuizlist().size(), HttpStatus.ACCEPTED);
		}
	 @GetMapping("/personal")
		public ResponseEntity<Integer> getPscore(@RequestParam("no") String room_no, @RequestParam("ID") String ID, HttpServletRequest req){

			 //List<Entry<String, Integer>> list = new ArrayList<>(quizinfomap.getQuizmap().get(room_no).getPersonalscore().entrySet());
			return new ResponseEntity<Integer>(quizinfomap.getQuizmap().get(room_no).getPersonalscore().get(ID), HttpStatus.ACCEPTED);
		}
	 @GetMapping("/team")
	 public ResponseEntity<Integer> getTscore(@RequestParam("no") String room_no, @RequestParam("team") String team , HttpServletRequest req){

		return new ResponseEntity<Integer>(quizinfomap.getQuizmap().get(room_no).getTeamscore().get("team"+team), HttpStatus.ACCEPTED);
	}
	 @GetMapping("/personal5")
		public ResponseEntity<List> getPscore5(@RequestParam("no") String room_no, HttpServletRequest req){
			 List<Entry<String, Integer>> list = new ArrayList<>(quizinfomap.getQuizmap().get(room_no).getPersonalscore().entrySet());
			 list.sort(Entry.comparingByValue(new Comparator<Integer>() {

					@Override
					public int compare(Integer o1, Integer o2) {
						// TODO Auto-generated method stub
						return o2-o1;
					}
				}));
			 List<Entry<String,Integer>> resultlist = null;
			 if(list.size() >=6) {
				 resultlist = list.subList(0, 5);
			 }
			 else {
				resultlist = list;
			 }
			 Map<String, String> idmap =  quizinfomap.getQuizmap().get(room_no).getIdnicknamemap();
			 List<String> returnlist = new ArrayList<String>();
			 for(Entry<String, Integer> ent : resultlist) {
				 returnlist.add(idmap.get(ent.getKey())+" : " + ent.getValue());
			 }
			 System.out.println(returnlist.toString());
			return new ResponseEntity<List>(returnlist, HttpStatus.ACCEPTED);
		}
	 @GetMapping("/team5")
		public ResponseEntity<List> getTscore5(@RequestParam("no") String room_no, HttpServletRequest req){
			 List<Entry<String, Integer>> list = new ArrayList<>(quizinfomap.getQuizmap().get(room_no).getTeamscore().entrySet());
			 list.sort(Entry.comparingByValue(new Comparator<Integer>() {

				@Override
				public int compare(Integer o1, Integer o2) {
					// TODO Auto-generated method stub
					return o2-o1;
				}
			}));
			 List<Entry<String,Integer>> resultlist = null;
			 if(list.size() >=6) {
				 resultlist = list.subList(0, 5);
			 }
			 else {
				resultlist = list;
			 }
			return new ResponseEntity<List>(resultlist, HttpStatus.ACCEPTED);
		}
	 @GetMapping("/OX")
	 public ResponseEntity<Integer> getalivemember(@RequestParam("no") String room_no, HttpServletRequest req){
		return new ResponseEntity<Integer>(quizinfomap.getQuizmap().get(room_no).getAlivemember(), HttpStatus.ACCEPTED);
		 
	 }
	 @GetMapping("/OXmembers")
	 public ResponseEntity<List<String>> getalivemembers(@RequestParam("no") String room_no, HttpServletRequest req){
		 List<String> resultlist = new LinkedList<String>();
		 for(String memberid : quizinfomap.getQuizmap().get(room_no).getAlivemembers()) {
			 resultlist.add(quizinfomap.getQuizmap().get(room_no).getIdnicknamemap().get(memberid));
		 }
		return new ResponseEntity<List<String>>(resultlist, HttpStatus.ACCEPTED);
		 
	 }
	 @GetMapping("/rejoin")
	 public ResponseEntity<ChatMessage> getleftparams(@RequestParam("no") String room_no, @RequestParam("id") String member_id, HttpServletRequest req){
		 ChatMessage returninfo = new ChatMessage();
		 returninfo.setSender(quizinfomap.getQuizmap().get(room_no).getIdnicknamemap().get(member_id));
		 String team = null;
		 for(String tmp :quizinfomap.getQuizmap().get(room_no).getTeammember().keySet()) {
			 for(Map<String, String> tmpmap : quizinfomap.getQuizmap().get(room_no).getTeammember().get(tmp)) {
				 if(tmpmap.get("id").equals(member_id)) {
					 team = tmp.substring(4);
					 
				 }
			 }
		 }
		 returninfo.setTeam(team);
		 returninfo.setToteam(Integer.toString(quizinfomap.getQuizmap().get(room_no).getPerteam()));
		 returninfo.setTitle(Integer.toString(quizinfomap.getQuizmap().get(room_no).getIndex()));
		 returninfo.setContent(Integer.toString(quizinfomap.getQuizmap().get(room_no).getIsresult()));
		return new ResponseEntity<ChatMessage>(returninfo, HttpStatus.ACCEPTED);
		 
	 }
	 @GetMapping("/isquiz")
	 public ResponseEntity<String> getquizroom(@RequestParam("no") String room_no, HttpServletRequest req){
		 String returninfo = "";
		 if(quizinfomap.getQuizmap().containsKey(room_no)) {
			 returninfo = "ison";
		 }
		 else {
			 returninfo = "noton";
		 }
		 return new ResponseEntity<String>(returninfo, HttpStatus.ACCEPTED);
	 }

}
