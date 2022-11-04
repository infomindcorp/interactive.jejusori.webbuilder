package infomind.interaction.builder.dao;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.builder.vo.InfoInteractionAssetsVO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("InfoInteractionAssetsDAO")
public class InfoInteractionAssetsDAO extends EgovComAbstractDAO {

    public InfoInteractionAssetsVO select(InfoInteractionAssetsVO vo) throws Exception {
        return selectOne("InfoInteractionAssetsDAO.select", vo);
    }

    public Integer selectTotalCount(InfoInteractionAssetsVO vo) throws Exception {
        return selectOne("InfoInteractionAssetsDAO.selectTotalCount", vo);
    }

    public List<?> selectList(InfoInteractionAssetsVO vo) throws Exception {
        return selectList("InfoInteractionAssetsDAO.selectList", vo);
    }

    public void insert(InfoInteractionAssetsVO vo) throws Exception {
        insert("InfoInteractionAssetsDAO.insert", vo);
    }

    public void update(InfoInteractionAssetsVO vo) throws Exception {
        insert("InfoInteractionAssetsDAO.update", vo);
    }

    public void delete(InfoInteractionAssetsVO vo) throws Exception {
        insert("InfoInteractionAssetsDAO.delete", vo);
    }

}
