package infomind.interaction.cms.tagGrp.vo;

import infomind.com.ext.vo.CmsSearchVO;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@ToString
public class InfoInteractionTagGrpVO extends CmsSearchVO {

    private String tagGrpId;

    private String tagGrpNm;

    private String useYn;

    private List<InfoInteractionTagVO> childMenu;

    public static InfoInteractionTagGrpVO of(String tagGrpId) {
        InfoInteractionTagGrpVO vo = new InfoInteractionTagGrpVO();
        vo.setTagGrpId(tagGrpId);
        vo.setSearchAllPage();
        return vo;
    }
}
