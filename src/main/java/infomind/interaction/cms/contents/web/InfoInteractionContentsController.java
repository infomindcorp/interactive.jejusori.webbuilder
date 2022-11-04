package infomind.interaction.cms.contents.web;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import infomind.com.cms.info.site.vo.InfoSiteMenuAuthConfigVO;
import infomind.com.utils.web.InfoViewUtils;
import infomind.interaction.cms.contents.service.InfoInteractionContentsService;
import infomind.interaction.cms.tag.service.InfoInteractionProjectTagService;
import infomind.interaction.cms.tag.service.InfoInteractionTagService;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.tag.vo.InfoInteractionProjectTagVO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class InfoInteractionContentsController {


    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name="InfoInteractionContentsService")
    private InfoInteractionContentsService infoInteractionContentsService;

    @Resource(name="InfoInteractionProjectTagService")
    private InfoInteractionProjectTagService infoInteractionProjectTagService;

    @Resource(name="InfoInteractionTagService")
    InfoInteractionTagService infoInteractionTagService;

    private String pagePath ="info/interaction/";

    @RequestMapping(value = "/cms/info/interaction/interactionList.do")
    public String selectInteractionList(@ModelAttribute("searchVO") InfoInteractionContentsVO searchVO, ModelMap model) throws Exception{

        /** EgovPropertyService.sample */
        searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
        searchVO.setPageSize(propertiesService.getInt("pageSize"));

        /** pageing */
        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
        paginationInfo.setPageSize(searchVO.getPageSize());

        searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
        searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        if(!hasAuthorize()){
            searchVO.setRegId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
        }
        searchVO.setShowYn("Y");
        List<InfoInteractionContentsVO> voList = infoInteractionContentsService.getContentsList(searchVO);
        model.addAttribute("list",voList);
        model.addAttribute("searchVO",searchVO);

        int totalCount = infoInteractionContentsService.selectContentsTotalCount(searchVO);
        paginationInfo.setTotalRecordCount(totalCount);
        model.addAttribute("paginationInfo", paginationInfo);

        return InfoViewUtils.adminTilesView(pagePath,"InfoInteractionList","ax5ui");
    }

    @RequestMapping(value = "/cms/info/interaction/RegistInteractionView.do")
    public String insertInteractionView(
            @RequestParam Map<?, ?> commandMap,
            @ModelAttribute("resultVO") InfoInteractionContentsVO vo) throws Exception{

        return InfoViewUtils.adminTilesView(pagePath,"InfoInteractionRegist","axmodal");

    }

    @RequestMapping(value = "/cms/info/interaction/InsertInteraction.do")
    public ModelAndView  insertInteraction(
            @ModelAttribute("resultVO") InfoInteractionContentsVO vo,
            @RequestParam List<String> tagList) throws Exception {

        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
        vo.setModId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
        vo.setRegId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        infoInteractionContentsService.insertContents(vo);


        if(tagList.size()>0) {
            for(int i =0; i< tagList.size(); i++){
                InfoInteractionProjectTagVO pt = new InfoInteractionProjectTagVO();
                pt.setProjectKey(vo.getProjectKey());
                pt.setTagId(tagList.get(i));
                infoInteractionProjectTagService.insertProjectTag(pt);
            }
        }

        return modelAndView;
    }

    @RequestMapping(value = "/cms/info/interaction/UpdateInteractionView.do")
    public String updateView(@ModelAttribute("searchVO") InfoInteractionContentsVO searchVO, ModelMap model) throws Exception{

        InfoInteractionContentsVO result = infoInteractionContentsService.selectContents(searchVO);
        List<InfoInteractionContentsVO> voList = infoInteractionContentsService.getSelectTagList(searchVO);

        model.addAttribute("resultVO", result);
        model.addAttribute("tagList",voList);

        return InfoViewUtils.adminTilesView(pagePath,"InfoInteractionUpdate","axmodal");

    }

    @RequestMapping("/cms/info/interaction/UpdateInteraction.do")
    public ModelAndView updateInteraction(
            @ModelAttribute("resultVO") InfoInteractionContentsVO vo
            ,@RequestParam List<String> tagList
    ) throws Exception {

        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
        vo.setModId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
        vo.setRegId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");

            InfoInteractionProjectTagVO pp = new InfoInteractionProjectTagVO();
            pp.setProjectKey(vo.getProjectKey());
            infoInteractionProjectTagService.deleteProjectTag(pp.projectKey);
            if(tagList.size()>0) {
                for (int i = 0; i < tagList.size(); i++) {
                    InfoInteractionProjectTagVO pt = new InfoInteractionProjectTagVO();
                    pt.setProjectKey(vo.getProjectKey());
                    pt.setTagId(tagList.get(i));
                    infoInteractionProjectTagService.insertProjectTag(pt);
                }
             }

        infoInteractionContentsService.updateContents(vo);

        return modelAndView;
    }

    //컨텐츠키 중복 체크
    @RequestMapping(value = "/cms/info/interaction/tag/ContentsKeyCnfirmAjax.do")
    public ModelAndView checkContentsKeyAjax(@RequestParam Map<String, Object> commandMap) throws Exception {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");

        String checkId = (String) commandMap.get("projectKey");

        int usedCnt = infoInteractionContentsService.checkProjectKey(checkId);


        modelAndView.addObject("usedCnt", usedCnt);
        modelAndView.addObject("checkId", checkId);

        return modelAndView;
    }

    //공개여부
    @RequestMapping(value = "/cms/info/interaction/updateShowYn.do")
    public ModelAndView updateShowYn(@RequestParam String projectKey, @RequestParam String showYn) throws Exception {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");

        InfoInteractionContentsVO vo = new InfoInteractionContentsVO();
        vo.setProjectKey(projectKey);
        vo.setShowYn(showYn);

        infoInteractionContentsService.updateShowYn(vo);

        return modelAndView;
    }


    private boolean hasAuthorize(){
        boolean result = false;
          if(EgovUserDetailsHelper.getAuthorities().contains("ROLE_ADMIN")){
            result = true;
            return result;
        }
          return result;
    }

}
