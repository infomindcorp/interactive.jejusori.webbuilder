package infomind.interaction.cms.tag.dao;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.cms.tag.vo.InfoInteractionProjectTagVO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("InfoInteractionProjectTagDAO")
public class InfoInteractionProjectTagDAO extends EgovComAbstractDAO {

    public InfoInteractionProjectTagVO selectProjectTag(InfoInteractionProjectTagVO vo) throws Exception{
        return selectOne("InfoInteractionProjectTagDAO.selectProjectTag", vo);
    }

    public List<?> selectProjectTagList(InfoInteractionProjectTagVO vo) throws Exception{
        return selectList("InfoInteractionProjectTagDAO.selectProjectTagList", vo);
    }


    public void  insertProjectTag(InfoInteractionProjectTagVO vo) throws Exception{
        insert("InfoInteractionProjectTagDAO.insertProjectTag", vo);
    }

    public void deleteProjectTag(String projectKey) throws Exception{
        delete("InfoInteractionProjectTagDAO.deleteProjectTag", projectKey);
    }
}
