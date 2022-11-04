package infomind.interaction.cms.page.service;

import infomind.interaction.builder.vo.InfoInteractionProjectPageVO;
import infomind.interaction.cms.page.vo.InfoInteractionPageVO;

import java.util.List;

public interface InfoInteractionPageService {

    List<InfoInteractionPageVO> selectPage(InfoInteractionPageVO vo) throws Exception;

    Integer selectPageTotalCount(InfoInteractionPageVO vo) throws Exception;

    void applyPage(String projectKey,String pageSno) throws Exception;
}
