package com.ssafy.quiz.controller;

import java.util.ArrayList;
import java.util.Comparator;
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
		 System.out.println(room_no);
		 System.out.println(quizinfomap.toString());
		return new ResponseEntity<Map>(quizinfomap.getQuizmap().get(room_no).getTeammember(), HttpStatus.ACCEPTED);
	}
	 @GetMapping("")
		public ResponseEntity<List<Map<String, String>>> getTeammember(@RequestParam("no") String room_no, @RequestParam("team") String team_no, HttpServletRequest req){
			 System.out.println(room_no);
			 System.out.println(quizinfomap.toString());
			return new ResponseEntity<List<Map<String, String>>>(quizinfomap.getQuizmap().get(room_no).getTeammember().get("team"+team_no), HttpStatus.ACCEPTED);
		}
	 @GetMapping("/quiz")
		public ResponseEntity<Quiz> getQuiz(@RequestParam("no") String room_no, @RequestParam("index") int index, HttpServletRequest req){
			 System.out.println(room_no);
			 System.out.println(quizinfomap.toString());
			return new ResponseEntity<Quiz>(quizinfomap.getQuizmap().get(room_no).getQuizlist().get(index), HttpStatus.ACCEPTED);
		}
	 @GetMapping("/personal")
		public ResponseEntity<Integer> getPscore(@RequestParam("no") String room_no, @RequestParam("ID") String ID, HttpServletRequest req){
			 System.out.println(room_no);
			 System.out.println(quizinfomap.toString());
			 //List<Entry<String, Integer>> list = new ArrayList<>(quizinfomap.getQuizmap().get(room_no).getPersonalscore().entrySet());
			return new ResponseEntity<Integer>(quizinfomap.getQuizmap().get(room_no).getPersonalscore().get(ID), HttpStatus.ACCEPTED);
		}
	 @GetMapping("/team")
	 public ResponseEntity<Integer> getTscore(@RequestParam("no") String room_no, @RequestParam("team") String team , HttpServletRequest req){
		 System.out.println(room_no);
		 System.out.println(quizinfomap.toString());
		return new ResponseEntity<Integer>(quizinfomap.getQuizmap().get(room_no).getTeamscore().get(team), HttpStatus.ACCEPTED);
	}
	 @GetMapping("/personal5")
		public ResponseEntity<List> getPscore5(@RequestParam("no") String room_no, HttpServletRequest req){
			 System.out.println(room_no);
			 System.out.println(quizinfomap.toString());
			 List<Entry<String, Integer>> list = new ArrayList<>(quizinfomap.getQuizmap().get(room_no).getPersonalscore().entrySet());
			 list.sort(Entry.comparingByValue(new Comparator<Integer>() {

					@Override
					public int compare(Integer o1, Integer o2) {
						// TODO Auto-generated method stub
						return o2-o1;
					}
				}));
			 List<Entry<String,Integer>> resultlist = list.subList(0, 4);
			return new ResponseEntity<List>(resultlist, HttpStatus.ACCEPTED);
		}
	 @GetMapping("/team5")
		public ResponseEntity<List> getTscore5(@RequestParam("no") String room_no, HttpServletRequest req){
			 System.out.println(room_no);
			 System.out.println(quizinfomap.toString());
			 List<Entry<String, Integer>> list = new ArrayList<>(quizinfomap.getQuizmap().get(room_no).getTeamscore().entrySet());
			 list.sort(Entry.comparingByValue(new Comparator<Integer>() {

				@Override
				public int compare(Integer o1, Integer o2) {
					// TODO Auto-generated method stub
					return o2-o1;
				}
			}));
			 List<Entry<String,Integer>> resultlist = list.subList(0, 4);
			return new ResponseEntity<List>(resultlist, HttpStatus.ACCEPTED);
		}
}
