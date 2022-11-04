package infomind.interaction.cms.contents.dao;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("InfoInteractionContentsDAO")
public class InfoInteractionContentsDAO extends EgovComAbstractDAO {

    public InfoInteractionContentsVO selectContents(InfoInteractionContentsVO vo) throws Exception{
        return selectOne("InfoInteractionContentsDAO.selectContents", vo);
    }

    public Integer selectContentsTotalCount(InfoInteractionContentsVO vo) throws Exception{
        return selectOne("InfoInteractionContentsDAO.selectContentsTotalCount", vo);
    }

    public List<?> selectContentsList(InfoInteractionContentsVO vo) throws Exception{
        return selectList("InfoInteractionContentsDAO.selectContentsList", vo);
    }

    public void insertContents(InfoInteractionContentsVO vo) throws Exception{
        insert("InfoInteractionContentsDAO.insertContents", vo);
    }

    public void updateContents(InfoInteractionContentsVO vo) throws Exception{
        update("InfoInteractionContentsDAO.updateContents", vo);
    }

    public List<InfoInteractionTagVO> selectTag(InfoInteractionContentsVO vo) throws Exception{
        return selectList("InfoInteractionContentsDAO.selectTag", vo);
    }

    public List<InfoInteractionContentsVO> getSelectContentsList(InfoInteractionContentsVO vo) throws Exception{
        return selectList("InfoInteractionContentsDAO.getSelectContentsList",vo);
    }

    public List<InfoInteractionTagVO> getSelectContentsTagList(InfoInteractionTagVO vo) throws Exception{
        return selectList("InfoInteractionContentsDAO.getSelectContentsTagList",vo);
    }

    public void deleteContents(InfoInteractionContentsVO vo) throws Exception{
        update("InfoInteractionContentsDAO.deleteContents", vo);
    }

    public int checkProjectKey(String projectKey) throws Exception{
        return (Integer) selectOne("InfoInteractionContentsDAO.checkProjectKey", projectKey);
    }

    public List<InfoInteractionContentsVO> getSelectTagList(InfoInteractionContentsVO vo) throws Exception{
        return selectList("InfoInteractionContentsDAO.getSelectTagList", vo);
    }

    public void updateShowYn(InfoInteractionContentsVO vo) throws Exception{

        update("InfoInteractionContentsDAO.updateShowYn", vo);
    }

}
