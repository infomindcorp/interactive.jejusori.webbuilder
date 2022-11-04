package infomind.interaction.site.web;

import infomind.com.cmm.bean.InfoUserMenuCacheManager;
import infomind.com.cms.info.site.vo.InfoSiteMenuVO;
import infomind.interaction.builder.service.InteractionBuilderAssetsFileService;
import infomind.interaction.builder.service.InteractionBuilderProjectService;
import infomind.interaction.builder.vo.InfoIntractionCommentVO;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.FileSystemResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;


@RequestMapping("/site")
@Controller
public class IntractionWebController {

    @Resource
    private InfoUserMenuCacheManager cacheUserMenu;

    @Resource(name = "interactionBuilderProjectService")
    private InteractionBuilderProjectService interactionBuilderProjectService;

    @Resource(name = "interactionBuilderAssetsFileService")
    private InteractionBuilderAssetsFileService interactionBuilderAssetsFileService;

    @ModelAttribute("footerMenuList")
    public List<InfoSiteMenuVO> getFooterMenu() {
        return cacheUserMenu.getMenuByALlList("default-footer-menu-group");
    }

    @RequestMapping(value = "/v/{projectKey}")
    public String interactionView(@PathVariable String projectKey, Model model) throws Exception {

        interactionBuilderProjectService.insertLog(projectKey, "VISIT");

        model.addAttribute("project", interactionBuilderProjectService.select(projectKey));
        return interactionBuilderProjectService.getPagePath(projectKey, null);
    }

    @RequestMapping(value = "/v/{projectKey}/{pageSno}")
    public String interactionPreviewView(@PathVariable String projectKey, @PathVariable String pageSno, Model model) throws Exception {
        model.addAttribute("project", interactionBuilderProjectService.select(projectKey));
        return interactionBuilderProjectService.getPagePath(projectKey, pageSno);
    }

    @GetMapping(value = {"/interaction/assets/{projectKey}/{absoluteName:.+}"})
    @ResponseBody
    public ResponseEntity<FileSystemResource> getResource(
            @PathVariable("projectKey") String projectKey,
            @PathVariable("absoluteName") String absoluteName) throws Exception {

        String filePath = interactionBuilderAssetsFileService.selectFilePath(projectKey, absoluteName);
        FileSystemResource resource = new FileSystemResource(filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(Files.probeContentType(Paths.get(filePath))));
        headers.setContentLength(resource.contentLength());
        return ResponseEntity.ok(new FileSystemResource(filePath));
    }

    @GetMapping("/comment/{projectKey}")
    @ResponseBody
    public ResponseEntity<Object> getCommentList(@PathVariable String projectKey, InfoIntractionCommentVO vo) {
        return ResponseEntity.ok(interactionBuilderProjectService.selectCommentList(projectKey, vo));
    }

    @PostMapping("/comment/{projectKey}")
    @ResponseBody
    public ResponseEntity<Object> postComment(@PathVariable String projectKey, @RequestBody InfoIntractionCommentVO vo) throws Exception {
        interactionBuilderProjectService.insertComment(projectKey, vo);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/log/{logType}/{projectKey}")
    @ResponseBody
    public ResponseEntity<Object> loggingProject(@PathVariable String logType, @PathVariable String projectKey) {
        interactionBuilderProjectService.insertLog(projectKey, logType.toUpperCase());
        return ResponseEntity.ok(null);
    }

}
