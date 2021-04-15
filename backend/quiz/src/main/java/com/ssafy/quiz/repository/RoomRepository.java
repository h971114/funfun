package com.ssafy.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.quiz.domain.Room;

public interface RoomRepository extends JpaRepository<Room, Integer>{

}
