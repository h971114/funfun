package com.ssafy.quiz.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.MapKeyColumn;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
@Component
public class QuizInfo {
	private List<Quiz> quizlist = new ArrayList<Quiz>();
	private int usernumber;
	private Map<String, String> idnicknamemap = new HashMap<String, String>();
	private Map<String, Integer> userscore = new HashMap<String, Integer>();
	private Map<String, Integer> teamscore = new HashMap<String, Integer>();
	private Map<String, Integer> personalscore = new HashMap<String, Integer>();
	private Map<String, LinkedList<Map<String, String>>> teammember = new HashMap<String, LinkedList<Map<String, String>>>();
	private int index = 0;
	private int type = 0;
	private int leftmember =3;
	private int alivemember = 0;
	private int perteam = 0;
}
