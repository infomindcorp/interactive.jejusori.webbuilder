package infomind.interaction.cms.tag.service.impl;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import infomind.interaction.cms.tag.dao.InfoInteractionTagDAO;
import infomind.interaction.cms.tag.service.InfoInteractionTagService;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toMap;

@Service("InfoInteractionTagService")
public class InfoInteractionTagServiceImpl  extends EgovAbstractServiceImpl implements InfoInteractionTagService {

    @Resource(name="InfoInteractionTagDAO")
    InfoInteractionTagDAO infoInteractionTagDAO;

    @Override
    public void insertTag(InfoInteractionTagVO vo) throws Exception {
        infoInteractionTagDAO.insertTag(vo);
    }

    @Override
    public void updateTag(InfoInteractionTagVO vo) throws Exception {
        infoInteractionTagDAO.updateTag(vo);
    }

    @Override
    public List<InfoInteractionTagVO> selectAllTagList(InfoInteractionTagVO vo) throws Exception {
        return infoInteractionTagDAO.selectAllTagList(vo);
    }

    @Override
    public InfoInteractionTagVO selectChildTag(InfoInteractionTagVO vo) throws Exception {
        return infoInteractionTagDAO.selectChildTag(vo);
    }

    @Override
    public int checkTagId(String tagId) throws Exception {
        return infoInteractionTagDAO.checkTagId(tagId);
    }

    @Override
    public List<InfoInteractionTagVO> selectTag(InfoInteractionTagVO vo) throws Exception {
        return infoInteractionTagDAO.selectTag(vo);
    }

    @Override
    public List<InfoInteractionTagVO> getBeforeTag(InfoInteractionTagVO vo) throws Exception {
        return infoInteractionTagDAO.getBeforeTag(vo);
    }

}
