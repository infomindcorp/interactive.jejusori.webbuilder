package infomind.interaction.cms.page.web;

import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import infomind.com.utils.web.InfoViewUtils;
import infomind.interaction.builder.vo.InfoInteractionProjectPageVO;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.page.service.InfoInteractionPageService;
import infomind.interaction.cms.page.vo.InfoInteractionPageVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
public class InfoInteractionPageController {

    @Resource
    InfoInteractionPageService infoInteractionPageService;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    private String pagePath ="info/interaction/page/";

    @RequestMapping(value = "/cms/info/interaction/pageList.do")
    public String selectPage(@ModelAttribute("searchVO")InfoInteractionPageVO searchVO, ModelMap model) throws Exception{
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

        List<InfoInteractionPageVO> voList = infoInteractionPageService.selectPage(searchVO);

        model.addAttribute("searchVO",searchVO);
        model.addAttribute("list",voList);

        int totalCount = infoInteractionPageService.selectPageTotalCount(searchVO);
        paginationInfo.setTotalRecordCount(totalCount);
        model.addAttribute("paginationInfo", paginationInfo);

        return InfoViewUtils.adminTilesView(pagePath,"InfoInteractionPageList","axmodal");
    }

    //반영 변경
    @RequestMapping(value = "/cms/info/interaction/applyPage")
    public ModelAndView applyPage(@RequestParam String projectKey,@RequestParam String pageSno) throws Exception {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");

        infoInteractionPageService.applyPage(projectKey,pageSno);

        return modelAndView;
    }

}
