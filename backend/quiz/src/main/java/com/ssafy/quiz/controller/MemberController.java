package com.ssafy.quiz.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.ssafy.quiz.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.quiz.domain.Member;
import com.ssafy.quiz.repository.MemberRepository;

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
    @Autowired
    JwtService jwtService;

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<String> joinMember(@RequestBody Member memberbody, HttpServletRequest req) throws NoSuchAlgorithmException {
        String conclusion = "";
        HttpStatus status = HttpStatus.ACCEPTED;
        if (memberRepository.save(Member.builder()
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
        memberRepository.deleteById(memberno);
    }

    //회원수정
    @PutMapping("")
    public ResponseEntity<String> updateMember(@RequestBody Member memberbody, HttpServletRequest req) throws NoSuchAlgorithmException {
        HttpStatus status = HttpStatus.ACCEPTED;
        var option = memberRepository.findById(memberbody.getMember_no());
        Member member = option.get();
        member.setPw(sha256(memberbody.getPw()));
        member.setEmail(memberbody.getEmail());
        member.setNick(memberbody.getNick());
        memberRepository.save(member);
        return new ResponseEntity<>(SUCCESS, status);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginMember(@RequestBody Member member, HttpServletRequest req) throws NoSuchAlgorithmException {
        Map<String, String> resultMap = new HashMap<>();
        member.setPw(sha256(member.getPw()));
        Member tmpMember = memberRepository.findByMemberId(member.getId());

        if (tmpMember.getPw().equals(member.getPw())) {
            resultMap.put("conclusion", SUCCESS);
            resultMap.put("id", tmpMember.getId());
            resultMap.put("nick", tmpMember.getNick());
            resultMap.put("token", jwtService.create("member", tmpMember, "id"));
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
        String id = null;
        Member member = memberRepository.findByMemberId(email);
        if (member != null) {
            id = member.getId();
        }
        return new ResponseEntity<>(id, HttpStatus.ACCEPTED);
    }

    // 비밀번호 찾기
    @GetMapping("/find-pw")
    public ResponseEntity<String> findId(@RequestParam("id") String id,
                                         @RequestParam("email") String email, HttpServletRequest req) {
        String ret = FAIL;
        Member member = memberRepository.findByMemberId(id);
        if (member != null && member.getEmail().equals(email)) {
            ret = SUCCESS;
        }
        return new ResponseEntity<>(ret, HttpStatus.ACCEPTED);
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

    //sha256 해쉬
    public static String sha256(String msg) throws NoSuchAlgorithmException {

        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(msg.getBytes());
        StringBuilder sb = new StringBuilder();
        for (final byte b : md.digest())
            sb.append(String.format("%02x ", b & 0xff));
        return sb.toString();
    }
}
