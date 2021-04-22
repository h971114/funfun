package com.ssafy.quiz.controller;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.quiz.domain.Member;
import com.ssafy.quiz.domain.Room;
import com.ssafy.quiz.repository.MemberRepository;
import com.ssafy.quiz.repository.RoomRepository;

@RestController
@RequestMapping("/room")
@CrossOrigin("*")
public class RoomController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    MemberRepository memberRepository;
    //방코드생성 - 임시저장
    @PostMapping("/make/{id}/temp")
    public ResponseEntity<String> makeRoomcode1(@PathVariable(value = "id") String memberid, HttpServletRequest req) throws NoSuchAlgorithmException {
    	Map<String, String> resultMap = new HashMap<>();
        Member tmpMember = memberRepository.findByMemberId(memberid);
        int member_no = tmpMember.getMember_no();
        String code = "";
        while(true) {
        	code = getRandomStr(6);
        	int n = roomRepository.findByRoomCode(code);
        	if(n==0) break;
        }
        if()
        logger.info(code);
        roomRepository.save(Room.builder()
                .code(code)
                .member_no(member_no)
                .build());
        return  new ResponseEntity<>(SUCCESS, HttpStatus.ACCEPTED);
    }
    //방코드생성 - 저장완료되면 방코드 7자리 (6자리 랜덤 + 숫자 1)
    @PostMapping("/make/{id}/save")
    public ResponseEntity<String> makeRoomcode2(@PathVariable(value = "id") String memberid, HttpServletRequest req) throws NoSuchAlgorithmException {
    	Map<String, String> resultMap = new HashMap<>();
        Member tmpMember = memberRepository.findByMemberId(memberid);
        int member_no = tmpMember.getMember_no();
        String code = "";
        while(true) {
        	code = getRandomStr(6);
        	int n = roomRepository.findByRoomCode(code);
        	if(n==0) break;
        }
        code+="1";
        logger.info(code);
        roomRepository.save(Room.builder()
                .code(code)
                .member_no(member_no)
                .build());
        return  new ResponseEntity<>(SUCCESS, HttpStatus.ACCEPTED);
    }
    //랜덤 6자리 생성
    public static String getRandomStr(int size) {
		if(size > 0) {
			char[] tmp = new char[size];
			for(int i=0; i<tmp.length; i++) {
				int div = (int) Math.floor( Math.random() * 2 );
				
				if(div == 0) { // 0이면 숫자로
					tmp[i] = (char) (Math.random() * 10 + '0') ;
				}else { //1이면 알파벳
					tmp[i] = (char) (Math.random() * 26 + 'A') ;
				}
			}
			return new String(tmp);
		}
		return "ERROR : Size is required."; 
	}
}
