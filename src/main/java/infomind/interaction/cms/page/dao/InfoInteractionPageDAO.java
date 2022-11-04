package infomind.interaction.cms.page.dao;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.cms.page.service.InfoInteractionPageService;
import infomind.interaction.cms.page.vo.InfoInteractionPageVO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("InfoInteractionPageDAO")
public class InfoInteractionPageDAO extends EgovComAbstractDAO {

    public List<InfoInteractionPageVO> selectPage(InfoInteractionPageVO vo) throws Exception{
        return selectList("InfoInteractionPageDAO.selectPage", vo);
    }

    public Integer selectPageTotalCount(InfoInteractionPageVO vo) throws Exception{
        return selectOne("InfoInteractionPageDAO.selectPageTotalCount", vo);
    }
}
