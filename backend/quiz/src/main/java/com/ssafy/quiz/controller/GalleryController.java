package com.ssafy.quiz.controller;

import com.ssafy.quiz.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

@RestController
@RequestMapping("/gallery")
@CrossOrigin("*")
public class GalleryController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired GalleryService galleryService;

    @RequestMapping(value=("/upload"), headers = ("content-type=multipart/form-data"), method=RequestMethod.POST)
    public String uploadGallery(@RequestParam(value = "data") MultipartFile multipartFile,
                                @RequestParam(value = "id") String id) throws IOException, SQLException {

        // 현재 dirName: "static", 추후 페이지별 디렉토리(dirName) 분리 가능
        String url = galleryService.upload("static", id, multipartFile);

        logger.info("이미지 업로드 url: " + url);
        return url;
    }
}