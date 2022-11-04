package infomind.interaction.cms.tagGrp.dao;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.cms.tagGrp.vo.InfoInteractionTagGrpVO;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("InfoInteractionTagGrpDAO")
public class InfoInteractionTagGrpDAO extends EgovComAbstractDAO {

    public void insertTagGrp(InfoInteractionTagGrpVO vo) throws Exception {
        insert("InfoInteractionTagGrpDAO.insertTagGrp", vo);
    }

    public void updateTagGrp(InfoInteractionTagGrpVO vo) throws Exception {
        update("InfoInteractionTagGrpDAO.updateTagGrp", vo);
    }

    public InfoInteractionTagGrpVO selectTagGrp(InfoInteractionTagGrpVO vo) throws Exception {
        return selectOne("InfoInteractionTagGrpDAO.selectTagGrp", vo);
    }

    public List<InfoInteractionTagGrpVO> selectTagGrpList(InfoInteractionTagGrpVO vo) throws Exception {
        return selectList("InfoInteractionTagGrpDAO.selectTagGrpList", vo);
    }

    public List<InfoInteractionTagVO> selectAllTagList(InfoInteractionTagVO vo) throws Exception{
        return selectList("InfoInteractionTagGrpDAO.selectAllTagList" ,vo);
    }
}
