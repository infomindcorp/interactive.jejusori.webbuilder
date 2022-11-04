package infomind.interaction.cms.tag.service.impl;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import infomind.interaction.cms.tag.dao.InfoInteractionProjectTagDAO;
import infomind.interaction.cms.tag.service.InfoInteractionProjectTagService;
import infomind.interaction.cms.tag.vo.InfoInteractionProjectTagVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("InfoInteractionProjectTagService")
public class InfoInteractionProjectTagServiceImpl extends EgovAbstractServiceImpl implements InfoInteractionProjectTagService {

    @Resource(name="InfoInteractionProjectTagDAO")
    private InfoInteractionProjectTagDAO infoInteractionProjectTagDAO;

    @Override
    public InfoInteractionProjectTagVO selectProjectTag(InfoInteractionProjectTagVO vo) throws Exception {
        return infoInteractionProjectTagDAO.selectProjectTag(vo);
    }

    @Override
    public List<?> selectProjectTagList(InfoInteractionProjectTagVO vo) throws Exception {
        return infoInteractionProjectTagDAO.selectProjectTagList(vo);
    }


    @Override
    public void insertProjectTag(InfoInteractionProjectTagVO vo) throws Exception {
        infoInteractionProjectTagDAO.insertProjectTag(vo);
    }

    @Override
    public void deleteProjectTag(String projectKey) throws Exception {
        infoInteractionProjectTagDAO.deleteProjectTag(projectKey);
    }

}
