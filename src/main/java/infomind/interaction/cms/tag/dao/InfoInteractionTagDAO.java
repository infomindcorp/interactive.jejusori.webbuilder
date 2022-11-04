package infomind.interaction.cms.tag.dao;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("InfoInteractionTagDAO")
public class InfoInteractionTagDAO extends EgovComAbstractDAO {

    public void insertTag(InfoInteractionTagVO vo) throws Exception{
        insert("InfoInteractionTagDAO.insertTag", vo);
    }

    public void updateTag(InfoInteractionTagVO vo) throws Exception{
        update("InfoInteractionTagDAO.updateTag", vo);
    }

    public List<InfoInteractionTagVO> selectAllTagList(InfoInteractionTagVO vo) throws Exception{
        return selectList("InfoInteractionTagDAO.selectAllTagList",vo);
    }

    public InfoInteractionTagVO selectChildTag(InfoInteractionTagVO vo) throws Exception{
        return selectOne("InfoInteractionTagDAO.selectChildTag",vo);
    }

    public int checkTagId(String tagId){
        return (Integer)selectOne("InfoInteractionTagDAO.checkTagId",tagId);
    }

    public List<InfoInteractionTagVO> selectTag(InfoInteractionTagVO vo) throws Exception{
        return selectList("InfoInteractionTagDAO.selectTag",vo);
    }

    public List<InfoInteractionTagVO> getBeforeTag (InfoInteractionTagVO vo) throws Exception {
        return selectList("InfoInteractionContentsDAO.getBeforeTag",vo);
    }
}
