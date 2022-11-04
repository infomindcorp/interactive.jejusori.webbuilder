package infomind.interaction.builder.web;


import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;
import infomind.interaction.builder.service.InteractionBuilderAssetsFileService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@RequestMapping(value = {"/interaction/builder/assets"})
@Controller
public class InteractionBuilderAssetController {

    @Resource(name = "interactionBuilderAssetsFileService")
    private InteractionBuilderAssetsFileService interactionBuilderAssetsFileService;

    @GetMapping(value = "/{projectKey}")
    @ResponseBody
    public ResponseEntity<Object> list(@PathVariable("projectKey") String projectKey) throws Exception {
        List<?> list = interactionBuilderAssetsFileService.selectList(projectKey);

        Map<String, Object> result = Maps.newHashMap(
                ImmutableMap.<String, Object>builder()
                        .put("data", list)
                        .build()
        );

        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = {"/upload"}, method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Object> upload(
            @RequestParam("projectKey") String projectKey,
            @RequestParam("files[]") List<MultipartFile> files) throws IOException, NoSuchAlgorithmException {

        List<?> list = interactionBuilderAssetsFileService.parseFileInfo(projectKey, files);

        Map<String, Object> result = Maps.newHashMap(
                ImmutableMap.<String, Object>builder()
                        .put("data", list)
                        .build()
        );

        return ResponseEntity.ok(result);
    }

}
