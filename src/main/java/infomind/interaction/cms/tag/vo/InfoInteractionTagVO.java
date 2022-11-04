package infomind.interaction.cms.tag.vo;

import infomind.com.cms.mnu.mpm.vo.InfoMenuManageVO;
import infomind.com.ext.vo.CmsSearchVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Data
@ToString
public class InfoInteractionTagVO extends CmsSearchVO {
    private String tagId;

    private String tagGroupId;

    private String tagNm;

    private String tagDescription;

    private String useYn;

    //추가
    private String projectKey;

    private String tagGrpNm;

    private String tagGrpId;

    private List<String> childMenu;

    public static InfoInteractionTagVO of(String tagGroupId) {
        InfoInteractionTagVO vo = new InfoInteractionTagVO();
        vo.setTagGroupId(tagGroupId);
        vo.setSearchAllPage();
        return vo;
    }

    private String text;

    private String value;
}
