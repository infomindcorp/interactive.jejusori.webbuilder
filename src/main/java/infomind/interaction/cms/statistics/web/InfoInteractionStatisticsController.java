package infomind.interaction.cms.statistics.web;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import infomind.com.utils.web.InfoViewUtils;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.statistics.service.InfoInteractionStatisticsService;
import infomind.interaction.cms.statistics.vo.InfoInteractionCommentsVO;
import infomind.interaction.cms.statistics.vo.InfoInteractionStatisticsVO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.management.modelmbean.ModelMBean;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class InfoInteractionStatisticsController {

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;
    @Resource(name="InfoInteractionStatisticsService")
    private InfoInteractionStatisticsService infoInteractionStatisticsService;

    private String pagePath ="info/interaction/statistics/";

    @RequestMapping(value = "/cms/info/interaction/InteractionStatisticsList.do")
    public String selectInteractionList(@ModelAttribute("searchVO") InfoInteractionStatisticsVO searchVO, ModelMap model) throws Exception{

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

        List<InfoInteractionStatisticsVO> voList = infoInteractionStatisticsService.selectInfoInteractionStatisticsList(searchVO);

        model.addAttribute("list",voList);
        model.addAttribute("searchVO",searchVO);

        int totalCount = infoInteractionStatisticsService.selectInfoInteractionStatisticsTotalCount(searchVO);
        paginationInfo.setTotalRecordCount(totalCount);
        model.addAttribute("paginationInfo", paginationInfo);

        return InfoViewUtils.adminTilesView(pagePath,"InteractionStatisticsList","ax5ui");
    }
    @RequestMapping(value = "/cms/info/interaction/InteractionStatistics.do")
    public String dashboardDetail(@ModelAttribute("searchVO")InfoInteractionContentsVO searchVO, ModelMap model) throws Exception {

        model.addAttribute("contents",infoInteractionStatisticsService.selectInfoInteractionStatistics(searchVO));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.add(c.DATE, -7);
        String stDate = sdf.format(c.getTime());

        searchVO.setStrDay(stDate);
        return InfoViewUtils.adminTilesView(pagePath,"InteractionStatistics","ax5ui");
    }

    @RequestMapping(value="/cms/info/interaction/InteractionDaysStatistics.do")
    public ModelAndView InteractionStatistics(@ModelAttribute("searchVO")InfoInteractionStatisticsVO searchVO) throws Exception{

        List<String> visit = new ArrayList<>();
        visit.add("VISIT");
        List<String> comment = new ArrayList<>();
        comment.add("COMMENT");
        List<String> like = new ArrayList<>();
        like.add("LIKE");
        List<String> date = new ArrayList<>();
        date.add("x");

        List<InfoInteractionStatisticsVO> list = infoInteractionStatisticsService.selectInfoInteractionWeekStatistics(searchVO);
        list.stream().forEach(v->
                visit.add(v.getVisit())
        );
        list.stream().forEach(v->
                comment.add(v.getComment())
        );
        list.stream().forEach(v->
                like.add(v.getLike())
        );
        list.stream().forEach(v->
                date.add(v.getLogDt())
        );

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("visit", visit);
        modelAndView.addObject("comment",comment );
        modelAndView.addObject("like",like );
        modelAndView.addObject("date",date );

        return modelAndView;
    }

    @RequestMapping(value="/cms/info/interaction/InteractionMonthStatistics.do")
    public ModelAndView InteractionMonthStatistics(@ModelAttribute("searchVO")InfoInteractionStatisticsVO searchVO) throws Exception{

        List<String> visit = new ArrayList<>();
        visit.add("VISIT");
        List<String> comment = new ArrayList<>();
        comment.add("COMMENT");
        List<String> like = new ArrayList<>();
        like.add("LIKE");
        List<String> date = new ArrayList<>();
        date.add("x");

        List<InfoInteractionStatisticsVO> list = infoInteractionStatisticsService.selectInfoInteractionMonthStatistics(searchVO);
        list.stream().forEach(v->
                visit.add(v.getVisit())
        );
        list.stream().forEach(v->
                comment.add(v.getComment())
        );
        list.stream().forEach(v->
                like.add(v.getLike())
        );
        list.stream().forEach(v->
                date.add(v.getLogDt())
        );

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("visit", visit);
        modelAndView.addObject("comment",comment );
        modelAndView.addObject("like",like );
        modelAndView.addObject("date",date );

        return modelAndView;
    }

    @RequestMapping(value="/cms/info/interaction/InteractionTableStatistics.do")
    public ModelAndView InteractionTableStatistics(@ModelAttribute("searchVO")InfoInteractionStatisticsVO searchVO) throws Exception{

        List<InfoInteractionStatisticsVO> list = infoInteractionStatisticsService.selectInfoInteractionWeekStatistics(searchVO);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("list", list);


        return modelAndView;
    }

    @RequestMapping(value="/cms/info/interaction/InteractionTableMonthStatistics.do")
    public ModelAndView InteractionTableMonthStatistics(@ModelAttribute("searchVO")InfoInteractionStatisticsVO searchVO) throws Exception{

        List<InfoInteractionStatisticsVO> list = infoInteractionStatisticsService.selectInfoInteractionMonthStatistics(searchVO);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd");
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-mm");

        for (int i=0; i < list.size(); i++ ) {
            list.get(i).setLogDt(simpleDateFormat2.format(simpleDateFormat.parse(list.get(i).getLogDt())));
        }

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("list", list);

        return modelAndView;
    }

    @RequestMapping(value="/cms/info/interaction/InteractionCommentStatistics.do")
    public ModelAndView InteractionCommentStatistics(@ModelAttribute("searchVO") InfoInteractionCommentsVO searchVO) throws Exception{

        List<InfoInteractionCommentsVO> list = infoInteractionStatisticsService.selectInfoInteractionCommentList(searchVO);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("list", list);

        return modelAndView;
    }

    @RequestMapping(value = "/cms/info/interaction/updateCommentsUseYn.do")
    public ModelAndView updateCommentsUseYn(InfoInteractionCommentsVO vo) throws Exception{
        infoInteractionStatisticsService.updateCommentsUseYn(vo);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("ok", "ok");

        return modelAndView;

    }

    @RequestMapping(value = "/cms/info/interaction/updateCommentsShowYn.do")
    public ModelAndView updateCommentsShowYn(InfoInteractionCommentsVO vo) throws Exception{
        infoInteractionStatisticsService.updateCommentsShowYn(vo);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("ok", "ok");

        return modelAndView;
    }

    @RequestMapping(value = "/cms/info/interaction/InteractionTopStatistics.do")
    public ModelAndView InteractionTopStatistics(InfoInteractionStatisticsVO vo) throws Exception{
        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        if(!hasAuthorize()){
            vo.setRegId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
        }

        List<InfoInteractionStatisticsVO> list = infoInteractionStatisticsService.selectInteractionTopContents(vo);

        List<List> cont = new ArrayList<>();
        List<String> date = new ArrayList<>();

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.add(c.DATE, -7);
        date.add("x");
        date.add(sdf.format(c.getTime()));
        for(int i = 0; i < 7; i++){
            c.add(c.DATE, 1);
            String stDate = sdf.format(c.getTime());
            date.add(stDate);
        }

        cont.add(date);
        for(int i = 0; i < list.size(); i++){

            vo.setProjectKey(list.get(i).getProjectKey());
            List<InfoInteractionStatisticsVO> topStatistics = infoInteractionStatisticsService.selectInteractionTopStatistics(vo);
            List<String> str = new ArrayList<>();
            str.add(list.get(i).getProjectName());
            topStatistics.stream().forEach(v -> {
                str.add(v.getCnt());
            });
            cont.add(str);
        }

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("list", cont);
        modelAndView.addObject("ok", "ok");

        return modelAndView;
    }

    @RequestMapping(value = "/cms/info/interaction/InteractionTopTableStatistics.do")
    public ModelAndView InteractionTopTableStatistics(InfoInteractionStatisticsVO vo) throws Exception{
        LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

        if(!hasAuthorize()){
            vo.setRegId((user == null || user.getUniqId() == null) ? "" : user.getUniqId());
        }

        List<InfoInteractionStatisticsVO> topStatistics = infoInteractionStatisticsService.selectInteractionTopTableStatistics(vo);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("jsonView");
        modelAndView.addObject("list", topStatistics);

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
