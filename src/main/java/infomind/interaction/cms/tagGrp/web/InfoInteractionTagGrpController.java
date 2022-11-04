package infomind.interaction.cms.tagGrp.web;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import infomind.com.utils.web.InfoViewUtils;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.tagGrp.service.InfoInteractionTagGrpService;
import infomind.interaction.cms.tagGrp.vo.InfoInteractionTagGrpVO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.Map;

@Controller
public class InfoInteractionTagGrpController {

    @Resource
    InfoInteractionTagGrpService infoInteractionTagGrpService;

    private String pagePath ="info/interaction/tag/";


    @RequestMapping(value = "/cms/info/interaction/tag/RegistTagGroupView.do")
    public String insertTagGrpView(
            @RequestParam Map<?, ?> commandMap,
            @ModelAttribute("resultVO") InfoInteractionTagGrpVO vo, BindingResult bindingResult, ModelMap model) throws Exception{

        return InfoViewUtils.adminTilesView(pagePath,"InfoInteractionTagGrpRegist","axmodal");

    }

    @RequestMapping(value = "/cms/info/interaction/tag/UpdateTagGroupView.do")
    public String updateTagGrpView(
            @RequestParam Map<?, ?> commandMap,
            @ModelAttribute("resultVO") InfoInteractionTagGrpVO vo, BindingResult bindingResult, ModelMap model) throws Exception{
            model.addAttribute("resultVO",infoInteractionTagGrpService.selectTagGrp(vo));
        return InfoViewUtils.adminTilesView(pagePath,"InfoInteractionTagGrpUpdate","axmodal");

    }

    @RequestMapping(value = "/cms/info/interaction/tag/InsertTagGroup.do")
    public ModelAndView InsertTagGroup(
            @ModelAttribute("resultVO") InfoInteractionTagGrpVO vo) throws Exception {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        infoInteractionTagGrpService.insertTagGrp(vo);
        return modelAndView;
    }



    @RequestMapping("/cms/info/interaction/UpdateTagGrp.do")
    public ModelAndView updateTagGrp(
            @ModelAttribute("resultVO") InfoInteractionTagGrpVO vo) throws Exception {


        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        infoInteractionTagGrpService.updateTagGrp(vo);

        return modelAndView;
    }


}
