package com.ssafy.quiz.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

public interface GalleryService {
    String upload(String dirName, String id, MultipartFile multipartFile) throws IOException, SQLException;

    String uploadFile(String dirName, String id, File uploadFile) throws SQLException;

    String insertAWS(File uploadFile, String fileName);

    Optional<File> convert(MultipartFile file) throws IOException;
}
