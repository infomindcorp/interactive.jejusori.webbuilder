package infomind.interaction.cms.contents.service;

import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;

import java.util.List;

public interface InfoInteractionContentsService {

     InfoInteractionContentsVO selectContents(InfoInteractionContentsVO vo) throws Exception;

     Integer selectContentsTotalCount(InfoInteractionContentsVO vo) throws Exception;

     List<InfoInteractionContentsVO> selectContentsList(InfoInteractionContentsVO vo) throws Exception;

     List<InfoInteractionContentsVO> getContentsList(InfoInteractionContentsVO infoInteractionContentsVO) throws Exception;

     void insertContents(InfoInteractionContentsVO vo) throws Exception;

     void updateContents(InfoInteractionContentsVO vo) throws Exception;

     void deleteContents(InfoInteractionContentsVO vo) throws Exception;

     int checkProjectKey(String projectKey) throws Exception;

     List<InfoInteractionContentsVO> getSelectTagList(InfoInteractionContentsVO vo) throws Exception;

     void updateShowYn(InfoInteractionContentsVO vo) throws Exception;

}
