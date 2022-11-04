package infomind.interaction.site.web;


import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import infomind.com.cmm.web.BaseAjaxController;
import infomind.interaction.cms.contents.service.InfoInteractionContentsService;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;

@RequestMapping(value = "/site")
@RestController
public class InteractionApiController extends BaseAjaxController {

    @Resource(name = "propertiesService")
    private EgovPropertyService propertiesService;

    @Resource(name = "InfoInteractionContentsService")
    private InfoInteractionContentsService infoInteractionContentsService;

    @PostMapping("/interaction/contentsList")
    @ResponseBody
    public Object getContentsList(@RequestBody InfoInteractionContentsVO searchVO) throws Exception {

        HashMap<String, Object> resultMap = new HashMap<>();

        int totalCount = infoInteractionContentsService.selectContentsTotalCount(searchVO);

        PaginationInfo paginationInfo = new PaginationInfo();
        paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
        paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
        paginationInfo.setPageSize(searchVO.getPageSize());
        paginationInfo.setTotalRecordCount(totalCount);

        searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
        searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
        searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        resultMap.put("paginationInfo", paginationInfo);
        resultMap.put("list", infoInteractionContentsService.selectContentsList(searchVO));

        return resultMap;
    }

}
