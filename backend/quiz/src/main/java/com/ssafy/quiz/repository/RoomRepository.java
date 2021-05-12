package com.ssafy.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.quiz.domain.Room;

public interface RoomRepository extends JpaRepository<Room, Integer>{
	 @Query(value = "select count(r.*) from room as r where r.room_code = :room_code", nativeQuery = true)
	    int findByRoomCode(String room_code);
}
