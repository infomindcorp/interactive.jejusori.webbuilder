package infomind.interaction.cms.statistics.dao;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.statistics.vo.InfoInteractionCommentsVO;
import infomind.interaction.cms.statistics.vo.InfoInteractionStatisticsVO;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository("InfoInteractionStatisticsDAO")
public class InfoInteractionStatisticsDAO extends EgovComAbstractDAO {

    public List<InfoInteractionStatisticsVO> selectInfoInteractionWeekStatistics(InfoInteractionStatisticsVO vo) throws Exception{
        return selectList("InfoInteractionStatisticsDAO.selectInfoInteractionWeekStatistics",vo);
    }

    public List<InfoInteractionStatisticsVO> selectInfoInteractionMonthStatistics(InfoInteractionStatisticsVO vo) throws Exception{
        return selectList("InfoInteractionStatisticsDAO.selectInfoInteractionMonthStatistics",vo);
    }

    public List<InfoInteractionStatisticsVO> selectInfoInteractionStatisticsList(InfoInteractionStatisticsVO vo) throws Exception{
        return selectList("InfoInteractionStatisticsDAO.selectInfoInteractionStatisticsList",vo);
    }

    public Integer selectInfoInteractionStatisticsTotalCount(InfoInteractionStatisticsVO vo) throws Exception{
        return selectOne("InfoInteractionStatisticsDAO.selectInfoInteractionStatisticsTotalCount",vo);
    }

    public InfoInteractionContentsVO selectInfoInteractionStatistics(InfoInteractionContentsVO vo) throws Exception{
        return selectOne("InfoInteractionStatisticsDAO.selectInfoInteractionStatistics",vo);
    }

    public List<InfoInteractionCommentsVO> selectInfoInteractionCommentList(InfoInteractionCommentsVO vo) throws Exception{
        return selectList("InfoInteractionStatisticsDAO.selectInfoInteractionCommentList",vo);
    }

    public void updateCommentsShowYn(InfoInteractionCommentsVO vo) throws Exception{
        update("InfoInteractionStatisticsDAO.updateCommentsShowYn",vo);
    }

    public void updateCommentsUseYn(InfoInteractionCommentsVO vo) throws Exception{
        update("InfoInteractionStatisticsDAO.updateCommentsUseYn",vo);
    }

    public List<InfoInteractionStatisticsVO> selectInteractionTopContents(InfoInteractionStatisticsVO vo) throws Exception{
        return selectList("InfoInteractionStatisticsDAO.selectInteractionTopContents",vo);
    }

    public List<InfoInteractionStatisticsVO> selectInteractionTopStatistics(InfoInteractionStatisticsVO vo) throws Exception{
        return selectList("InfoInteractionStatisticsDAO.selectInteractionTopStatistics",vo);
    }

    public List<InfoInteractionStatisticsVO> selectInteractionTopTableStatistics(InfoInteractionStatisticsVO vo) throws Exception{
        return selectList("InfoInteractionStatisticsDAO.selectInteractionTopTableStatistics",vo);
    }
}
