package infomind.interaction.cms.statistics.service;

import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import infomind.interaction.cms.statistics.vo.InfoInteractionCommentsVO;
import infomind.interaction.cms.statistics.vo.InfoInteractionStatisticsVO;

import java.util.List;

public interface InfoInteractionStatisticsService {

    List<InfoInteractionStatisticsVO> selectInfoInteractionWeekStatistics(InfoInteractionStatisticsVO vo) throws Exception;
    List<InfoInteractionStatisticsVO> selectInfoInteractionMonthStatistics(InfoInteractionStatisticsVO vo) throws Exception;

    List<InfoInteractionStatisticsVO> selectInfoInteractionStatisticsList(InfoInteractionStatisticsVO vo) throws Exception;
     Integer selectInfoInteractionStatisticsTotalCount(InfoInteractionStatisticsVO vo) throws Exception;
    InfoInteractionContentsVO selectInfoInteractionStatistics(InfoInteractionContentsVO vo) throws Exception;

    List<InfoInteractionCommentsVO> selectInfoInteractionCommentList(InfoInteractionCommentsVO vo) throws Exception;
    void updateCommentsShowYn(InfoInteractionCommentsVO vo) throws Exception;

    void updateCommentsUseYn(InfoInteractionCommentsVO vo) throws Exception;

    List<InfoInteractionStatisticsVO> selectInteractionTopContents(InfoInteractionStatisticsVO vo) throws Exception;

    List<InfoInteractionStatisticsVO> selectInteractionTopStatistics(InfoInteractionStatisticsVO vo) throws Exception;

    List<InfoInteractionStatisticsVO> selectInteractionTopTableStatistics(InfoInteractionStatisticsVO vo) throws Exception;

}
