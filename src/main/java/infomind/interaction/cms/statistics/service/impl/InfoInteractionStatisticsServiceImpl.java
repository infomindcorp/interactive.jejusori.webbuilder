package infomind.interaction.cms.statistics.service.impl;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.statistics.dao.InfoInteractionStatisticsDAO;
import infomind.interaction.cms.statistics.service.InfoInteractionStatisticsService;
import infomind.interaction.cms.statistics.vo.InfoInteractionCommentsVO;
import infomind.interaction.cms.statistics.vo.InfoInteractionStatisticsVO;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.List;

@Service("InfoInteractionStatisticsService")
public class InfoInteractionStatisticsServiceImpl implements InfoInteractionStatisticsService {

    @Resource(name="InfoInteractionStatisticsDAO")
    private InfoInteractionStatisticsDAO infoInteractionStatisticsDAO;

    @Override
    public List<InfoInteractionStatisticsVO> selectInfoInteractionWeekStatistics(InfoInteractionStatisticsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInfoInteractionWeekStatistics(vo);
    }

    @Override
    public List<InfoInteractionStatisticsVO> selectInfoInteractionMonthStatistics(InfoInteractionStatisticsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInfoInteractionMonthStatistics(vo);
    }

    @Override
    public List<InfoInteractionStatisticsVO> selectInfoInteractionStatisticsList(InfoInteractionStatisticsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInfoInteractionStatisticsList(vo);
    }

    @Override
    public Integer selectInfoInteractionStatisticsTotalCount(InfoInteractionStatisticsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInfoInteractionStatisticsTotalCount(vo);
    }

    @Override
    public InfoInteractionContentsVO selectInfoInteractionStatistics(InfoInteractionContentsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInfoInteractionStatistics(vo);
    }

    @Override
    public List<InfoInteractionCommentsVO> selectInfoInteractionCommentList(InfoInteractionCommentsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInfoInteractionCommentList(vo);
    }

    @Override
    public void updateCommentsShowYn(InfoInteractionCommentsVO vo) throws Exception {
        infoInteractionStatisticsDAO.updateCommentsShowYn(vo);
    }

    @Override
    public void updateCommentsUseYn(InfoInteractionCommentsVO vo) throws Exception {
        infoInteractionStatisticsDAO.updateCommentsUseYn(vo);
    }

    @Override
    public List<InfoInteractionStatisticsVO> selectInteractionTopContents(InfoInteractionStatisticsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInteractionTopContents(vo);
    }

    @Override
    public List<InfoInteractionStatisticsVO> selectInteractionTopStatistics(InfoInteractionStatisticsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInteractionTopStatistics(vo);
    }

    @Override
    public List<InfoInteractionStatisticsVO> selectInteractionTopTableStatistics(InfoInteractionStatisticsVO vo) throws Exception {
        return infoInteractionStatisticsDAO.selectInteractionTopTableStatistics(vo);
    }
}
