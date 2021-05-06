package com.ssafy.quiz.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;

@Service("jwtService")
public class JwtServiceImpl implements JwtService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final String SALT = "TomorrowSecret";

    @Override
    public <T> String create(String key, T data, String subject) {
        Date datetime = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(datetime);
        cal.add(Calendar.HOUR, 24);
        datetime = cal.getTime();
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("regDate", System.currentTimeMillis())
                .setSubject(subject)
                .claim(key, data)
                .setExpiration(datetime)
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact();
        return jwt;
    }

    private byte[] generateKey() {
        byte[] key = null;
        try {
            key = SALT.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("Fail to generate key", e);
        }

        return key;
    }

    @Override
    public boolean isUsable(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(this.generateKey())
                    .parseClaimsJws(jwt);
            return true;

        } catch (Exception e) {
            logger.error("Fail to check isUsable :", e);
        }
        return false;
    }

    @Override
    public Object get(String key, String token) {
        String jwt = token;
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SALT.getBytes("UTF-8"))
                    .parseClaimsJws(jwt);
        } catch (Exception e) {
            logger.error("Fail to get claims :", e);
        }
        logger.info(claims.getBody().toString());
        if (!claims.getBody().containsKey(key)) {
            return "";
        }

        @SuppressWarnings("unchecked")
        Object value = claims.getBody().get(key);
        return value;
    }
}