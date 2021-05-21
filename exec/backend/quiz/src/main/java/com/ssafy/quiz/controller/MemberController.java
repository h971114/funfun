package com.ssafy.quiz.controller;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.quiz.service.JwtService;
import com.ssafy.quiz.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.quiz.domain.Member;
import com.ssafy.quiz.repository.MemberRepository;

@RestController
@RequestMapping("/member")
@CrossOrigin("*")
public class MemberController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    @Autowired MemberService memberService;
    @Autowired JwtService jwtService;
    @Autowired MemberRepository memberRepository;

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<String> joinMember(@RequestBody Member member, HttpServletRequest req) throws NoSuchAlgorithmException {
        logger.info("회원 가입");
        memberService.save(member);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.ACCEPTED);
    }

    // 회원 조회
    @GetMapping("/{no}")
    public ResponseEntity<Member> getMember(@PathVariable(value = "no") int member_no, HttpServletRequest req){
        logger.info("회원 조회");
        return new ResponseEntity<>(memberService.getMember(member_no), HttpStatus.ACCEPTED);
    }
    @GetMapping("/byid/{id}")
    public ResponseEntity<Member> getMemberbyid(@PathVariable(value = "id") String member_id, HttpServletRequest req){
        logger.info("회원 조회_id값 기반");
        return new ResponseEntity<>(memberService.getMemberById(member_id), HttpStatus.ACCEPTED);
    }

    //회원탈퇴
    @DeleteMapping("/{no}")
    public ResponseEntity<String> deleteMember(@PathVariable(value = "no") int member_no, HttpServletRequest req) {
        logger.info("회원 탈퇴");
        logger.info(String.valueOf(member_no));
        memberService.delete(member_no);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.ACCEPTED);
    }

    //회원수정
    @PutMapping("")
    public ResponseEntity<String> updateMember(@RequestBody Member member, HttpServletRequest req) throws NoSuchAlgorithmException {
        logger.info("회원 수정");
        memberService.updateMember(member);
        return new ResponseEntity<>(SUCCESS, HttpStatus.ACCEPTED);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginMember(@RequestBody Member member, HttpServletRequest req) throws NoSuchAlgorithmException {
        Map<String, String> resultMap = new HashMap<>();

        Member tempMember = memberService.login(member);
        if (tempMember!=null) {
        	resultMap.put("id", tempMember.getId());
            resultMap.put("nick", tempMember.getNick());
            resultMap.put("member_no", String.valueOf(tempMember.getMember_no()));
            resultMap.put("conclusion", SUCCESS);
            resultMap.put("token", jwtService.create("member", member, "id"));
            logger.info("로그인 성공");
        } else {
            resultMap.put("conclusion", FAIL);
            logger.info("로그인 실패");
        }

        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logoutMember(HttpServletRequest req) {
        Map<String, Object> resultMap = new HashMap<>();
        logger.info("로그아웃 성공");
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // id 찾기
    @GetMapping("/find-id")
    public ResponseEntity<String> findId(@RequestParam("email") String email, HttpServletRequest req) {
        logger.info("아이디 찾기");
        return new ResponseEntity<>(memberService.findId(email), HttpStatus.ACCEPTED);
    }

    // 비밀번호 찾기
    @GetMapping("/find-pw")
    public ResponseEntity<Map<String, String>> findId(@RequestParam("id") String id,
                                         @RequestParam("email") String email, HttpServletRequest req) {
        logger.info("비밀번호 찾기");
        Map<String, String> resultMap = new HashMap<>();
        if (memberService.findPw(id, email)) {
            Member tempMember = memberRepository.findById(id);
            resultMap.put("id", tempMember.getId());
            resultMap.put("nick", tempMember.getNick());
            resultMap.put("member_no", String.valueOf(tempMember.getMember_no()));
            resultMap.put("conclusion", SUCCESS);
        }else {
            resultMap.put("conclusion", FAIL);
        }
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }

    // token 검증
    @GetMapping("/jwt")
    public ResponseEntity<Map<String, String>> checkJwt(@RequestParam("token") String token, HttpServletRequest req)
            throws SQLException, NoSuchAlgorithmException {
        Map<String, String> resultMap = new HashMap<String, String>();
        if (jwtService.isUsable(token)) {
            LinkedHashMap lhm = (LinkedHashMap) jwtService.get("member", token);
            resultMap.put("id", (String) lhm.get("id"));
            resultMap.put("nick", (String) lhm.get("nick"));
            resultMap.put("conclusion", SUCCESS);
            logger.info("유효한 토큰입니다.");
        } else {
            resultMap.put("conclusion", FAIL);
            logger.info("유효하지 않은 토큰입니다.");
        }
        return new ResponseEntity<>(resultMap, HttpStatus.ACCEPTED);
    }
}
