package com.ssafy.quiz.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.quiz.domain.Member;
import com.ssafy.quiz.repository.MemberRepository;

import lombok.AllArgsConstructor;
import lombok.var;

@RestController
@RequestMapping("/member")
@CrossOrigin("*")
public class MemberController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";
    
    @Autowired
    MemberRepository memberRepository;
    
    @GetMapping("")
    public void getTest() {
        logger.info("logger 테스트");
    }
    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<String>  joinMember(@RequestBody Member memberbody, HttpServletRequest req) throws NoSuchAlgorithmException {
        String conclusion = "";
        HttpStatus status = HttpStatus.ACCEPTED;
    	if(memberRepository.save(Member.builder()
    		   .id(memberbody.getId())
    		   .pw(sha256(memberbody.getPw()))
    		   .nick(memberbody.getNick())
    		   .email(memberbody.getEmail())
    		   .build()).getId() != null)
    		conclusion = SUCCESS;
    	else conclusion = FAIL;
    	return new ResponseEntity<String>(conclusion, status);
    }
    //회원탈퇴
    @DeleteMapping("/{memberno}")
    public void deleteMember(@PathVariable(value = "memberno") int memberno,
          HttpServletRequest req) {
//       Map<String, Object> resultMap = new HashMap<>();
//       HttpStatus status = HttpStatus.ACCEPTED;
       memberRepository.deleteById(memberno);
//       return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
    //회원수정
    @PutMapping("")
    public ResponseEntity<String> updateMember(@RequestBody Member memberbody, HttpServletRequest req) throws NoSuchAlgorithmException {
       System.out.println(req);
       String conclusion = SUCCESS;
       HttpStatus status = HttpStatus.ACCEPTED;
       var option = memberRepository.findById(memberbody.getMember_no());
       Member member = option.get();
       member.setPw(sha256(memberbody.getPw()));
       member.setEmail(memberbody.getEmail());
       member.setNick(memberbody.getNick());
       memberRepository.save(member);
//       if(memberRepository.update(Member.builder()
//    		   .id(memberbody.getId())
//    		   .pw(sha256(memberbody.getPw()))
//    		   .nick(memberbody.getNick())
//    		   .email(memberbody.getEmail())
//    		   .build()).getId() != null)
//    		conclusion = SUCCESS;
//    	else conclusion = FAIL;
       return new ResponseEntity<String>(conclusion, status);
    }
    //sha256 해쉬
    public static String sha256(String msg) throws NoSuchAlgorithmException  {

        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(msg.getBytes());
        StringBuilder sb = new StringBuilder();
        for(final byte b: md.digest())
            sb.append(String.format("%02x ", b&0xff));
        return sb.toString();
    }
}
