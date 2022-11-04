package infomind.interaction.cms.tagGrp.service;

import infomind.interaction.cms.tagGrp.vo.InfoInteractionTagGrpVO;

import java.util.List;

public interface InfoInteractionTagGrpService {

    void insertTagGrp(InfoInteractionTagGrpVO vo) throws Exception;

    void updateTagGrp(InfoInteractionTagGrpVO vo) throws Exception;

    InfoInteractionTagGrpVO selectTagGrp(InfoInteractionTagGrpVO vo) throws Exception;

    List<InfoInteractionTagGrpVO> selectTagGrpList(InfoInteractionTagGrpVO vo) throws Exception;

    List<InfoInteractionTagGrpVO> selectAllTagList(InfoInteractionTagGrpVO vo) throws Exception;

}
