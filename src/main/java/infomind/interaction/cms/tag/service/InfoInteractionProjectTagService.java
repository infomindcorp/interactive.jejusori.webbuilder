package infomind.interaction.cms.tag.service;

import infomind.interaction.cms.tag.vo.InfoInteractionProjectTagVO;

import java.util.List;

public interface InfoInteractionProjectTagService {

    public InfoInteractionProjectTagVO selectProjectTag(InfoInteractionProjectTagVO vo) throws Exception;

    public List<?> selectProjectTagList(InfoInteractionProjectTagVO vo) throws Exception;

    public void insertProjectTag(InfoInteractionProjectTagVO vo) throws Exception;


    public void deleteProjectTag(String projectKey) throws Exception;


}
