package infomind.interaction.builder.service;

import infomind.com.cmm.InfoConstants;
import infomind.interaction.builder.dao.InfoInteractionAssetsDAO;
import infomind.interaction.builder.vo.InfoInteractionAssetsVO;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class InteractionBuilderAssetsFileService implements InitializingBean {

    @Override
    public void afterPropertiesSet() throws Exception {
        this.rootPath = InfoConstants.INTERACTIVE_ASSETS_PATH();
    }

    @Resource(name = "InfoInteractionAssetsDAO")
    private InfoInteractionAssetsDAO infoInteractionAssetsDAO;

    private String rootPath = "";

    public String selectFilePath(String projectKey, String absoluteName) throws Exception {

        InfoInteractionAssetsVO vo = infoInteractionAssetsDAO.select(InfoInteractionAssetsVO.builder()
                .projectKey(projectKey)
                .absoluteName(absoluteName)
                .build());

        return vo.getAbsolutePath();
    }

    public List<?> selectList(String projectKey) throws Exception {
        return infoInteractionAssetsDAO.selectList(InfoInteractionAssetsVO.builder()
                .projectKey(projectKey)
                .build());
    }

    public List<InfoInteractionAssetsVO> parseFileInfo (String projectKey, List<MultipartFile> multipartFiles) throws IOException, NoSuchAlgorithmException {

        if (CollectionUtils.isEmpty(multipartFiles)) {
            return Collections.emptyList();
        }

        String savePath = Paths.get(rootPath).toString();
        if (!new File(savePath).exists()) {
            try {
                new File(savePath).mkdir();
            } catch (Exception e) {
                e.getStackTrace();
            }
        }

        List<InfoInteractionAssetsVO> fileList = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            String origFilename = multipartFile.getOriginalFilename();
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            System.out.println(origFilename);
            origFilename = new String(origFilename.getBytes("utf-8"),"8859_1");

            if (origFilename == null || "".equals(origFilename)) continue;
            String fileKey = MD5Generator(FilenameUtils.getBaseName(origFilename)).toString();
            String filename = fileKey + "." + FilenameUtils.getExtension(origFilename);
            String filePath = Paths.get(savePath, filename).toString();

            try {
                File file = new File(filePath);
                multipartFile.transferTo(file);

                BufferedImage img = ImageIO.read(multipartFile.getInputStream());

                // 파일 권한 설정(쓰기, 읽기)
                file.setWritable(true);
                file.setReadable(true);

                InfoInteractionAssetsVO assetsVO = InfoInteractionAssetsVO
                        .builder()
                        .projectKey(projectKey)
                        .type("image")
                        .name(multipartFile.getOriginalFilename())
                        .width(img.getWidth())
                        .height(img.getHeight())
                        .src(String.format("/site/interaction/assets/%s/%s", projectKey, fileKey))
                        .absolutePath(filePath)
                        .absoluteName(filename)
                        .build();

                infoInteractionAssetsDAO.insert(assetsVO);
                fileList.add(assetsVO);

            } catch (IOException e) {
                e.printStackTrace();
                throw new IOException("[" + multipartFile.getOriginalFilename() + "] failed to save file...");

            } catch (Exception e) {
                e.printStackTrace();
                throw new IOException("[" + multipartFile.getOriginalFilename() + "] failed to save file...");
            }
        }
        System.out.println(fileList);
        return fileList;
    }


    private String MD5Generator(String input) throws UnsupportedEncodingException, NoSuchAlgorithmException {

        MessageDigest mdMD5 = MessageDigest.getInstance("MD5");
        mdMD5.update(input.getBytes("UTF-8"));

        byte[] md5Hash = mdMD5.digest();
        StringBuilder hexMD5hash = new StringBuilder();

        for(byte b : md5Hash) {
            String hexString = String.format("%02x", b);
            hexMD5hash.append(hexString);
        }
        return hexMD5hash.toString();
    }


}
