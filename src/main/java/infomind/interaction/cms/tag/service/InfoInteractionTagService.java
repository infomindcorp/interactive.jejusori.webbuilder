package infomind.interaction.cms.tag.service;

import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;

import java.util.List;
import java.util.Map;

public interface InfoInteractionTagService {

    void insertTag(InfoInteractionTagVO vo) throws Exception;

    void updateTag(InfoInteractionTagVO vo) throws Exception;

    List<InfoInteractionTagVO> selectAllTagList(InfoInteractionTagVO vo) throws Exception;

    InfoInteractionTagVO selectChildTag(InfoInteractionTagVO vo) throws Exception;

    int checkTagId(String tagId) throws Exception;

    List<InfoInteractionTagVO>  selectTag(InfoInteractionTagVO vo) throws Exception;

    List<InfoInteractionTagVO> getBeforeTag (InfoInteractionTagVO vo) throws Exception;

}
