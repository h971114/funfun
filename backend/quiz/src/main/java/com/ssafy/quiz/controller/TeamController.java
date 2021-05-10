package com.ssafy.quiz.controller;

import java.util.List;
import java.util.Map;

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
}
