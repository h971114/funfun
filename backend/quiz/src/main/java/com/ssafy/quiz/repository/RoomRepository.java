package com.ssafy.quiz.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.quiz.domain.Room;

public interface RoomRepository extends JpaRepository<Room, Integer>{
	 @Query(value = "select count(r.*) from room as r where r.room_code = :room_code", nativeQuery = true)
	    int findByRoomCode(String room_code);
	 @Query(value = "select r.* from room as r where r.room_member_no = :member_no", nativeQuery = true)
	 	List<Room> findyBymember_no(String member_no);
	 @Query(value = "select * from room as r where r.room_code = :room_code", nativeQuery = true)
	    Room findByroom_code(String room_code);
	 @Modifying
	 @Query("UPDATE room r SET r.room_quiz_cnt, r.quiz_title, r where r.room_code = :room_code")
	 void updateInquiry(@Param("room_quiz_cnt") int room_quiz_cnt,@Param("quiz_title") String quiz_title,@Param("room_code") String room_code);
}
