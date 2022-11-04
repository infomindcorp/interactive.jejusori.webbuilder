package infomind.interaction.site.event;

import com.mysql.jdbc.StringUtils;
import infomind.com.cms.info.banner.service.InfoBannerService;
import infomind.com.cms.info.banner.vo.InfoBannerVO;
import infomind.com.event.InCmsPageEvent;
import infomind.com.event.InCmsPathEvent;
import infomind.interaction.cms.tag.service.InfoInteractionTagService;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import infomind.interaction.cms.tagGrp.service.InfoInteractionTagGrpService;
import infomind.interaction.cms.tagGrp.vo.InfoInteractionTagGrpVO;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class InteractionPageEventListener {

    @Resource(name = "InfoBannerService")
    private InfoBannerService infoBannerService;

    @Resource(name = "InfoInteractionTagService")
    private InfoInteractionTagService interactionTagService;


    @EventListener(condition = "{'/', '/index.do', #event.mainPagePath}.contains(#event.path)")
    public void mainPageHandler(InCmsPathEvent event) {

    }

    @EventListener(condition = "'banner-jejusori' == #event.eventName")
    public void bannerListEventHandler(InCmsPageEvent event) throws Exception {

        event.getRequest().setAttribute("bannerList", infoBannerService.selectBannerList(InfoBannerVO.of("jejusori.banner")));

    }

    @EventListener(condition = "(#event.eventName).indexOf('interactive-tag') > -1")
    public void interactiveTagListEventHandler(InCmsPageEvent event) throws Exception {

        List<String> list = StringUtils.split(event.getEventName(), "@", true);

        event.getRequest().setAttribute(list.get(1), interactionTagService.selectAllTagList(InfoInteractionTagVO.of(list.get(1))));
    }

}
