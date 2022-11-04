package infomind.interaction.cms.page.service.impl;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import infomind.interaction.builder.dao.InfoInteractionProjectDAO;
import infomind.interaction.builder.vo.InfoInteractionProjectPageVO;
import infomind.interaction.builder.vo.InfoInteractionProjectVO;
import infomind.interaction.cms.page.dao.InfoInteractionPageDAO;
import infomind.interaction.cms.page.service.InfoInteractionPageService;
import infomind.interaction.cms.page.vo.InfoInteractionPageVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service("InfoInteractionPageService")
public class InfoInteractionPageServiceImpl extends EgovAbstractServiceImpl implements InfoInteractionPageService {

    @Resource
    InfoInteractionPageDAO infoInteractionPageDAO;

    @Resource
    InfoInteractionProjectDAO infoInteractionProjectDAO;

    @Override
    public List<InfoInteractionPageVO> selectPage(InfoInteractionPageVO vo) throws Exception {
        return infoInteractionPageDAO.selectPage(vo);
    }

    @Override
    public Integer selectPageTotalCount(InfoInteractionPageVO vo) throws Exception {
        return infoInteractionPageDAO.selectPageTotalCount(vo);
    }

    @Override
    public void applyPage(String projectKey,String pageSno) throws Exception {

        InfoInteractionProjectPageVO page = InfoInteractionProjectPageVO.builder()
                .projectKey(projectKey)
                .pageSno(pageSno)
                .build();

        infoInteractionProjectDAO.togglePage(page);
        infoInteractionProjectDAO.usePage(page);

    }
}
