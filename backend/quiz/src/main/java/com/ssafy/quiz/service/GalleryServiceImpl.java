package com.ssafy.quiz.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.SimpleFormatter;

@Service
public class GalleryServiceImpl implements GalleryService {
    private final AmazonS3Client amazonS3Client;

    public GalleryServiceImpl(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public String upload(String dirName, String id, MultipartFile multipartFile) throws IOException, SQLException {
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        return uploadFile(dirName, id, uploadFile);
    }

    @Override
    public String uploadFile(String dirName, String id, File uploadFile) throws SQLException {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String url = insertAWS(uploadFile, dirName + "/" + sdf.format(calendar.getTime()) + "-" + id + "-" + uploadFile.getName());
        uploadFile.delete();
        return url;
    }

    @Override
    public String insertAWS(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    @Override
    public Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        System.out.println("에러 테스트-1 "+convertFile.getName());
        if (convertFile.createNewFile()) {
            System.out.println("에러 테스트0");
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            System.out.println("에러 테스트1");
            return Optional.of(convertFile);
        }
        System.out.println("에러 테스트2");
        return Optional.empty();
    }
}
