package infomind.interaction.cms.tagGrp.service.impl;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import infomind.interaction.cms.tagGrp.dao.InfoInteractionTagGrpDAO;
import infomind.interaction.cms.tagGrp.service.InfoInteractionTagGrpService;
import infomind.interaction.cms.tagGrp.vo.InfoInteractionTagGrpVO;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service("InfoInteractionTagGrpService")
public class InfoInteractionTagGrpServiceImpl extends EgovAbstractServiceImpl implements InfoInteractionTagGrpService {

    @Resource
    InfoInteractionTagGrpDAO infoInteractionTagGrpDAO;

    @Override
    public void insertTagGrp(InfoInteractionTagGrpVO vo) throws Exception {
        infoInteractionTagGrpDAO.insertTagGrp(vo);
    }

    @Override
    public void updateTagGrp(InfoInteractionTagGrpVO vo) throws Exception {
        infoInteractionTagGrpDAO.updateTagGrp(vo);
    }

    public InfoInteractionTagGrpVO selectTagGrp(InfoInteractionTagGrpVO vo) throws Exception {
       return infoInteractionTagGrpDAO.selectTagGrp(vo);
    }

    @Override
    public List<InfoInteractionTagGrpVO> selectTagGrpList(InfoInteractionTagGrpVO vo) throws Exception {
        return infoInteractionTagGrpDAO.selectTagGrpList(vo);
    }

    @Override
    public List<InfoInteractionTagGrpVO> selectAllTagList(InfoInteractionTagGrpVO vo) throws Exception {
        List<InfoInteractionTagGrpVO> AList =  new ArrayList<>();
//        InfoInteractionTagVO infoInteractionTagVO = new InfoInteractionTagVO();
//
//        for(InfoInteractionTagGrpVO temp : TGList){
//            infoInteractionTagVO.setTagGrpId(temp.getTagGrpId());
//            List<InfoInteractionTagVO> ttList = infoInteractionTagGrpDAO.selectAllTagList(infoInteractionTagVO);
//            temp.setTagList(ttList);
//            AList.add(temp);
//        }
        return AList;
    }

}
