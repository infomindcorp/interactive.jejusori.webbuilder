package infomind.interaction.cms.contents.service.impl;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import infomind.com.utils.file.InfoFileMngUtil;
import infomind.interaction.cms.contents.dao.InfoInteractionContentsDAO;
import infomind.interaction.cms.contents.service.InfoInteractionContentsService;
import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("InfoInteractionContentsService")
public class InfoInteractionContentsServiceImpl extends EgovAbstractServiceImpl implements InfoInteractionContentsService {

    @Resource(name="InfoInteractionContentsDAO")
    private InfoInteractionContentsDAO infoInteractionContentsDAO;

    @Resource(name = "InfoFileMngUtil")
    private InfoFileMngUtil infoFileMngUtil;

    @Override
    public InfoInteractionContentsVO selectContents(InfoInteractionContentsVO vo) throws Exception {
        return infoInteractionContentsDAO.selectContents(vo);
    }

    @Override
    public Integer selectContentsTotalCount(InfoInteractionContentsVO vo) throws Exception {
        return infoInteractionContentsDAO.selectContentsTotalCount(vo);
    }

    @Override
    public List<InfoInteractionContentsVO> selectContentsList(InfoInteractionContentsVO infoInteractionContentsVO) throws Exception {
        return (List<InfoInteractionContentsVO>) infoInteractionContentsDAO.selectContentsList(infoInteractionContentsVO);
    }

    @Override
    public List<InfoInteractionContentsVO> getContentsList(InfoInteractionContentsVO infoInteractionContentsVO) throws Exception {
        List<InfoInteractionContentsVO> cList =  infoInteractionContentsDAO.getSelectContentsList(infoInteractionContentsVO);
        cList.stream().forEach(v -> {
            v.setTagNm(v.getTag().toString().substring(1,v.getTag().toString().length()-1));
        });
        return cList;
    }

    @Override
    public void insertContents(InfoInteractionContentsVO vo) throws Exception {
        infoInteractionContentsDAO.insertContents(vo);
        infoFileMngUtil.copyFile(vo.getAtchFileId());
    }

    @Override
    public void updateContents(InfoInteractionContentsVO vo) throws Exception {
        infoInteractionContentsDAO.updateContents(vo);
        infoFileMngUtil.copyFile(vo.getAtchFileId());
    }

    @Override
    public void deleteContents(InfoInteractionContentsVO vo) throws Exception {
        infoInteractionContentsDAO.deleteContents(vo);
    }

    @Override
    public int checkProjectKey(String projectKey) throws Exception {
        return infoInteractionContentsDAO.checkProjectKey(projectKey);
    }

    @Override
    public List<InfoInteractionContentsVO> getSelectTagList(InfoInteractionContentsVO infoInteractionContentsVO) throws Exception {
        List<InfoInteractionContentsVO> cList =  infoInteractionContentsDAO.getSelectTagList(infoInteractionContentsVO);
        cList.stream().forEach(v -> {
            v.setTagNm(v.getTag().toString().substring(1,v.getTag().toString().length()-1));
        });
        return cList;
    }

    @Override
    public void updateShowYn(InfoInteractionContentsVO vo) throws Exception {
        infoInteractionContentsDAO.updateShowYn(vo);
    }


}
