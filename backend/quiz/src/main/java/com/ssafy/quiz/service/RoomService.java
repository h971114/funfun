package com.ssafy.quiz.service;

import javax.persistence.EntityManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ssafy.quiz.domain.Room;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomService {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final EntityManager em;
	   public void save(Room room){
	        em.persist(room);
	    }
}
