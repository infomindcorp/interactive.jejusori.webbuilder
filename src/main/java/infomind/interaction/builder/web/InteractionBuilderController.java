package infomind.interaction.builder.web;


import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableMap;
import infomind.interaction.builder.service.InteractionBuilderProjectService;
import infomind.interaction.builder.vo.InfoInteractionProjectVO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Map;

@RequestMapping(value = {"/interaction/builder"})
@Controller
public class InteractionBuilderController {

    @Resource(name = "interactionBuilderProjectService")
    private InteractionBuilderProjectService interactionBuilderProjectService;

    /*@RequestMapping(value = {"", "/"})
    public String interactionBuilderListPage(Model model) throws Exception {
        model.addAttribute("list", interactionBuilderProjectService.selectList(InfoInteractionProjectVO.builder().build()));
        return "interaction/builder/list.html";
    }*/

    @RequestMapping(value = {"/{projectKey}"})
    public String interactionBuilderPage(Model model, @PathVariable("projectKey") String projectKey) {
        model.addAttribute("projectKey", projectKey);
        return "interaction/builder/edit.html";
    }

    @PostMapping(value = {"/store"})
    @ResponseBody
    public ResponseEntity<Object> postStoreProject(@RequestBody JsonNode jsonNode) throws Exception {

        Map<String, Object> map = ImmutableMap.<String, Object>builder()
                .put("status", interactionBuilderProjectService.store(jsonNode))
                .put("projectKey", jsonNode.get("projectKey").asText())
                .build();

        return ResponseEntity.ok(map);
    }

    @GetMapping(value = {"/store/{projectKey}"})
    @ResponseBody
    public ResponseEntity<Object> getStoreProject(@PathVariable("projectKey") String projectKey) throws Exception {
        return ResponseEntity.ok(interactionBuilderProjectService.selectProject(projectKey));
    }

    @PatchMapping(value = {"/store/{projectKey}"})
    @ResponseBody
    public ResponseEntity<Object> patchStoreProject(@PathVariable("projectKey") String projectKey, @RequestBody JsonNode projectData) throws Exception {
        interactionBuilderProjectService.store(projectKey, projectData);
        return ResponseEntity.ok(null);
    }

}
