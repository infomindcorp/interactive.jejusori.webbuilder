package infomind.interaction.cms.tag.web;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.rte.fdl.property.EgovPropertyService;
import infomind.com.utils.web.InfoViewUtils;
import infomind.interaction.cms.tagGrp.service.InfoInteractionTagGrpService;
import infomind.interaction.cms.tag.service.InfoInteractionTagService;
import infomind.interaction.cms.tagGrp.vo.InfoInteractionTagGrpVO;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import net.sf.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class InfoInteractionTagController {

    @Resource
    InfoInteractionTagService infoInteractionTagService;

    @Resource
    InfoInteractionTagGrpService infoInteractionTagGrpService;


    //필요유무??
    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    private String pagePath ="info/interaction/tag/";

    //autoComplete
    @RequestMapping(value = "/ajax/autocomplete.do")
    @ResponseBody
    public ModelAndView selectTag(InfoInteractionTagVO vo) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.setStatus(HttpStatus.OK);
        List<InfoInteractionTagVO> list = infoInteractionTagService.selectTag(vo);
        modelAndView.addObject("list", list);

        System.out.println("=================="+list);
        return modelAndView;
    }

    @RequestMapping(value = "/cms/info/interaction/tag/getBeforeTag.do")
    public ModelAndView getBeforeTag(InfoInteractionTagVO vo) throws Exception{
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.setStatus(HttpStatus.OK);
        List<InfoInteractionTagVO> list = infoInteractionTagService.getBeforeTag(vo);
        List<JSONObject> result = new ArrayList<>();
        for(int i=0; i < list.size(); i++){
            JSONObject data = new JSONObject();
            data.put("value",list.get(i).getTagId());
            data.put("text",list.get(i).getTagNm());
            result.add(data);
        }
        System.out.println("Asdsadsadadsad");
        System.out.println(result);
        modelAndView.addObject("list", result);
        return modelAndView;
    }

    //태그 관리
    @RequestMapping(value = "/cms/info/interaction/tag/TagListSelect.do")
    public String selectTagList (@ModelAttribute("searchVO") InfoInteractionTagVO searchVO, @ModelAttribute("grpList") InfoInteractionTagGrpVO listVO, ModelMap model) throws Exception{


        //그룹 조회
        List<InfoInteractionTagGrpVO> grpList = infoInteractionTagGrpService.selectTagGrpList(listVO);
        model.addAttribute("grp_list",grpList);

        return InfoViewUtils.adminTilesView(pagePath,"InfoInteractionTagList","ax5ui");
    }
    

    @RequestMapping(value = "/cms/info/interaction/tag/AllTagSelect.do")
    @ResponseBody
    public ModelAndView menuListObject(InfoInteractionTagGrpVO searchVO) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.setStatus(HttpStatus.OK);
        List<InfoInteractionTagGrpVO> tagList = infoInteractionTagGrpService.selectTagGrpList(searchVO);
        modelAndView.addObject("list", tagList);
        return modelAndView;
    }

    @RequestMapping(value = "/cms/info/interaction/tag/InsertTag.do")
    @ResponseBody
    public ModelAndView InsertTag(
            @ModelAttribute("resultVO") InfoInteractionTagVO vo,
            BindingResult bindingResult, ModelMap model) throws Exception {


        infoInteractionTagService.insertTag(vo);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.setStatus(HttpStatus.OK);

        return modelAndView;
    }

    @RequestMapping(value = "/cms/info/interaction/tag/UpdateTag.do")
    @ResponseBody
    public ModelAndView UpdateTag(
            @ModelAttribute("resultVO") InfoInteractionTagVO vo,
                    BindingResult bindingResult, ModelMap model) throws Exception {


        infoInteractionTagService.updateTag(vo);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.setStatus(HttpStatus.OK);

        return modelAndView;
    }

    //태그 아이디 중복체크
    @RequestMapping(value = "/cms/info/interaction/tag/TagIdCnfirmAjax.do")
    public ModelAndView checkTagIdAjax(@RequestParam Map<String, Object> commandMap) throws Exception {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");

        String checkId = (String) commandMap.get("tagId");

        int usedCnt = infoInteractionTagService.checkTagId(checkId);


        modelAndView.addObject("usedCnt", usedCnt);
        modelAndView.addObject("checkId", checkId);

        return modelAndView;
    }


}
