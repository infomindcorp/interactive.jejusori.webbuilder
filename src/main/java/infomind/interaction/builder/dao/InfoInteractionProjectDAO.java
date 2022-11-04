package infomind.interaction.builder.dao;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.builder.vo.InfoInteractionProjectPageVO;
import infomind.interaction.builder.vo.InfoInteractionProjectVO;
import infomind.interaction.builder.vo.InfoIntractionCommentVO;
import infomind.interaction.builder.vo.InfoIntractionUsrLogVO;
import infomind.interaction.cms.statistics.vo.InfoInteractionCommentsVO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("InfoInteractionProjectDAO")
public class InfoInteractionProjectDAO extends EgovComAbstractDAO {

    public InfoInteractionProjectVO select(InfoInteractionProjectVO vo) throws Exception {
        return selectOne("InfoInteractionProjectDAO.select", vo);
    }

    public Integer selectTotalCount(InfoInteractionProjectVO vo) throws Exception {
        return selectOne("InfoInteractionProjectDAO.selectTotalCount", vo);
    }

    public List<?> selectList(InfoInteractionProjectVO vo) throws Exception {
        return selectList("InfoInteractionProjectDAO.selectList", vo);
    }

    public void insert(InfoInteractionProjectVO vo) throws Exception {
        insert("InfoInteractionProjectDAO.insert", vo);
    }

    public void update(InfoInteractionProjectVO vo) throws Exception {
        insert("InfoInteractionProjectDAO.update", vo);
    }

    public void delete(InfoInteractionProjectVO vo) throws Exception {
        insert("InfoInteractionProjectDAO.delete", vo);
    }

    public void insertPage(InfoInteractionProjectPageVO vo) throws Exception {
        insert("InfoInteractionProjectDAO.insertPage", vo);
    }
    public void togglePage(InfoInteractionProjectPageVO vo) throws Exception {
        update("InfoInteractionProjectDAO.togglePage", vo);
    }
    public void usePage(InfoInteractionProjectPageVO vo) throws Exception {
        update("InfoInteractionProjectDAO.usePage", vo);
    }

    public InfoInteractionProjectPageVO getPage(String pageSno) {
        return selectOne("InfoInteractionProjectDAO.getPage", pageSno);
    }

    public String getPageSno(String projectKey) {
        return selectOne("InfoInteractionProjectDAO.getPageSno", projectKey);
    }
    public List<InfoIntractionCommentVO> selectCommentList(InfoIntractionCommentVO vo) {
        return selectList("InfoInteractionProjectDAO.selectCommentList", vo);
    }
    public Integer insertComment(InfoIntractionCommentVO vo) {
        return insert("InfoInteractionProjectDAO.insertComment", vo);
    }

    public Integer insertLog(InfoIntractionUsrLogVO vo) {
        return insert("InfoInteractionProjectDAO.insertLog", vo);
    }

}
