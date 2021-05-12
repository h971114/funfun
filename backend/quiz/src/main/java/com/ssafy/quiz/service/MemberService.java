package com.ssafy.quiz.service;

import com.ssafy.quiz.domain.Member;
import com.ssafy.quiz.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class MemberService {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    MemberRepository memberRepository;

    public void save(Member member) throws NoSuchAlgorithmException {
        member.setId(member.getId().toLowerCase());
        member.setPw(sha256(member.getPw()));

        if (memberRepository.findById(member.getId()) == null)
            memberRepository.save(member);
        else
            logger.warn("아이디 중복");
    }

    public Member getMember(int member_no) {
        return memberRepository.find(member_no);
    }
    
    public Member getMemberById(String id) {
        return memberRepository.findById(id);
    }
    
    public void delete(int member_no) {
        memberRepository.delete(member_no);
    }

    public void updateMember(Member member) throws NoSuchAlgorithmException {
        Member tempMember = memberRepository.find(member.getMember_no());
        tempMember.setId(member.getId().toLowerCase());
        tempMember.setPw(sha256(member.getPw()));
        tempMember.setEmail(member.getEmail());
        tempMember.setNick(member.getNick());

        memberRepository.save(tempMember);
    }

    public Member login(Member member) throws NoSuchAlgorithmException {
        Member tempMember = memberRepository.findById(member.getId().toLowerCase());
        if(tempMember.getPw().equals(sha256(member.getPw()))){
            return tempMember;
        }

        return null;
    }

    public String findId(String email) {
        String id = null;
        Member tempMember = memberRepository.findByEmail(email);
        if (tempMember != null)
            id = tempMember.getId();

        return id;
    }

    public boolean findPw(String id, String email) {
    	Member tempMember = memberRepository.findById(id.toLowerCase());

        if (tempMember != null && tempMember.getEmail().equals(email))
            return true;

        return tempMember != null && tempMember.getEmail().equals(email);
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
