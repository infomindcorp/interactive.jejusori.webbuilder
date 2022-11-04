package infomind.interaction.builder.service;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import egovframework.com.utl.fcc.service.EgovStringUtil;
import egovframework.com.utl.sim.service.EgovFileScrty;
import infomind.com.cmm.InfoConstants;
import infomind.interaction.builder.dao.InfoInteractionProjectDAO;
import infomind.interaction.builder.vo.InfoInteractionProjectPageVO;
import infomind.interaction.builder.vo.InfoInteractionProjectVO;
import infomind.interaction.builder.vo.InfoIntractionCommentVO;
import infomind.interaction.builder.vo.InfoIntractionUsrLogVO;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InteractionBuilderProjectService implements InitializingBean {

    @Override
    public void afterPropertiesSet() throws Exception {
    }

    @Resource(name = "InfoInteractionProjectDAO")
    private InfoInteractionProjectDAO infoInteractionProjectDAO;


    public List<?> selectList(InfoInteractionProjectVO vo) throws Exception {
        return infoInteractionProjectDAO.selectList(vo);
    }


    public InfoInteractionProjectVO select(String projectKey) throws Exception {
        return infoInteractionProjectDAO.select(InfoInteractionProjectVO.builder().projectKey(projectKey).build());
    }

    public JsonNode selectProject(String projectKey) throws Exception {

        InfoInteractionProjectVO project = Optional.ofNullable(infoInteractionProjectDAO.select(InfoInteractionProjectVO.builder()
                .projectKey(projectKey)
                .build()
        )).orElse(InfoInteractionProjectVO.builder()
                .projectKey(projectKey)
                .projectData("{\"assets\":[],\"styles\":[],\"pages\":[{}]}")
                .build());

        ObjectMapper mapper = new ObjectMapper();
        JsonFactory factory = mapper.getFactory();
        JsonParser parser = factory.createParser(project.getProjectData());

        return mapper.readTree(parser);
    }

    public boolean store(JsonNode jsonNode) throws Exception {

        Optional<InfoInteractionProjectVO> project = Optional.ofNullable(infoInteractionProjectDAO.select(InfoInteractionProjectVO.builder().projectKey(jsonNode.get("projectKey").asText()).build()));

        if (!project.isPresent()) {
            InfoInteractionProjectVO projectVO = InfoInteractionProjectVO.builder()
                    .projectKey(jsonNode.get("projectKey").asText())
                    .projectName(jsonNode.get("projectName").asText())
                    .projectData("{\"assets\":[],\"styles\":[],\"pages\":[{}]}")
                    .build();
            infoInteractionProjectDAO.insert(projectVO);
            return true;
        }

        return false;
    }

    public void store(String projectKey, JsonNode projectData) throws Exception {
        Optional<InfoInteractionProjectVO> project = Optional.ofNullable(infoInteractionProjectDAO.select(InfoInteractionProjectVO.builder().projectKey(projectKey).build()));

        if (!project.isPresent()) {
            throw new Exception("");
        }

        project.get().setProjectData(projectData.get("data").toString());
        infoInteractionProjectDAO.update(project.get());


        UUID uuid = UUID.randomUUID();

        InfoInteractionProjectPageVO page = InfoInteractionProjectPageVO.builder()
                .projectKey(projectKey)
                .pageSno(uuid.toString())
                .pageMeta(replaceQuotation(projectData.get("page").get("pageMeta").toString()))
                .pageCss(replaceQuotation(projectData.get("page").get("pageCss").toString()))
                .pageHtml(replaceQuotation(projectData.get("page").get("pageHtml").toString()))
                .useYn("Y")
                .build();

        infoInteractionProjectDAO.togglePage(page);
        infoInteractionProjectDAO.insertPage(page);

        createHtmlFile(page.getProjectKey(), page.getPageSno(), project.get(), page.getPageMeta(), page.getPageCss(), page.getPageHtml());
    }

    public String getPagePath(String projectKey, String pageSno) throws Exception {
        Optional<InfoInteractionProjectVO> project = Optional.ofNullable(infoInteractionProjectDAO.select(InfoInteractionProjectVO.builder().projectKey(projectKey).build()));
        if(!project.isPresent()) {
            throw new Exception("검색된 컨텐츠가 없습니다.");
        }

        if(StringUtils.isEmpty(pageSno)) {
            pageSno = this.getPageSno(projectKey);
        }

        Optional<InfoInteractionProjectPageVO> page = Optional.ofNullable(infoInteractionProjectDAO.getPage(pageSno));
        if(!page.isPresent()) {
            throw new Exception("검색된 컨텐츠가 없습니다.");
        }

        File pageFile = new File(String.format("%s/WEB-INF/views/interaction/pages/%s/%s", InfoConstants.DIR_PATH(), projectKey, pageSno));
        if(!pageFile.exists()) {
            createHtmlFile(projectKey, pageSno, project.get(), page.get().getPageMeta(), page.get().getPageCss(), page.get().getPageHtml());
        }

        return String.format("interaction/pages/%s/%s.html", projectKey, pageSno);
    }

    public String getPageSno(String projectKey) {
        return infoInteractionProjectDAO.getPageSno(projectKey);
    }

    public List<InfoIntractionCommentVO> selectCommentList(String projectKey, InfoIntractionCommentVO vo) {
        vo.setProjectKey(projectKey);
        return infoInteractionProjectDAO.selectCommentList(vo);
    }

    public void insertComment(String projectKey, InfoIntractionCommentVO vo) throws Exception {
        vo.setProjectKey(projectKey);
        vo.setPasswd(EgovFileScrty.encryptPassword(vo.getPasswd(), EgovStringUtil.isNullToString(vo.getCommentsTitle())));
        infoInteractionProjectDAO.insertComment(vo);
    }

    public void insertLog(String projectKey, String logType) {
        infoInteractionProjectDAO.insertLog(InfoIntractionUsrLogVO.builder().projectKey(projectKey).usrLogType(logType).build());
    }

    private String replaceQuotation(String str) {
        if(StringUtils.isEmpty(str))
            return "";


        str = str.replaceAll("\\\\\"", "\"");
        str = StringUtils.replace(str, "\\n", System.getProperty("line.separator"));
        str = str.substring(1, str.length()-1);


        System.out.println(str);

        return str;
    }

    private File createHtmlFile(String dirName, String fileName, InfoInteractionProjectVO project, String meta, String css, String body) {
        try {
            File postDir = new File(InfoConstants.DIR_PATH() + "/WEB-INF/views/interaction/pages/" + dirName);

            if (!postDir.isDirectory()) {
                postDir.mkdirs();
            }

            String headerStr = "", htmlStr = "</html>";
            headerStr+= "<!DOCTYPE html>";
            headerStr+= "<html lang=\"ko\" xmlns:th=\"http://www.thymeleaf.org\">";
            headerStr+= "<head>";
            headerStr+= "<meta http-equiv=\"Page-Enter\" content=\"revealtrans(Duration=1,Transition=12)\" />";
            headerStr+= "<meta charset=\"utf-8\"/>";
            headerStr+= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
            headerStr+= "<title>" + project.getProjectName() + "</title>";

            headerStr+= String.format("<meta name=\"Keywords\" content=\"" + "\" />", "");
            headerStr+= String.format("<meta name=\"Description\" content=\"%s\" />", StringUtils.replace(project.getProjectDesc(), "\"", "'"));
            headerStr+= String.format("<meta name=\"Author\" content=\"%s\" />", "제주의소리");
            headerStr+= String.format("<meta name=\"Publisher\" content=\"%s\" />", "제주의소리");
            headerStr+= String.format("<meta name=\"Email\" content=\"%s\" />", "news@jejusori.net");

            headerStr+= String.format("<meta property=\"og:type\" content=\"%s\">", "website");
            headerStr+= String.format("<meta property=\"og:url\" content=\"%s\">", "");
            headerStr+= String.format("<meta property=\"og:title\" content=\"%s\">", project.getProjectName());
            headerStr+= String.format("<meta property=\"og:image\" content=\"/site/info/file/ImageView.do?atchFileId=%s&fileSn=1\">", project.getAtchFileId());
            headerStr+= String.format("<meta property=\"og:description\" content=\"%s\">", StringUtils.replace(project.getProjectDesc(), "\"", "'"));
            headerStr+= String.format("<meta property=\"og:site_name\" content=\"%s\">", "제주의소리 인터렉티브");


            headerStr+= meta;
            headerStr+= "<style>";
            headerStr+= css;
            headerStr+= "</style>";
            headerStr+= "</head>";

            body = StringUtils.replace(body, "<body>", "<div class=\"builder-contents\">");
            body = StringUtils.replace(body, "</body>", "</div>");

            body = "<th:block th:replace=\"~{/include/header.html::header}\" />"
                    + "<th:block th:replace=\"~{/include/tools.html::tools}\" />"
                    + body
                    + "<th:block th:replace=\"~{/include/footer.html::footer}\" />";

            File postFile = new File(postDir, fileName + ".html");
            FileUtils.writeStringToFile(postFile, headerStr + "<body>" + body + "</body>" + htmlStr, Charset.forName("UTF-8"));

            return postFile;
        } catch (Exception e) {
            return null;
        }
    }
}
