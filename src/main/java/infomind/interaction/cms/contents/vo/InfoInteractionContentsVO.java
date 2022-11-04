package infomind.interaction.cms.contents.vo;

import infomind.com.ext.vo.CmsSearchVO;
import infomind.interaction.cms.tag.vo.InfoInteractionProjectTagVO;
import infomind.interaction.cms.tag.vo.InfoInteractionTagVO;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@ToString
@Data
public class InfoInteractionContentsVO extends CmsSearchVO {

    private String projectKey;
    private String projectName;
    private String projectData = "{\"assets\":[],\"styles\":[],\"pages\":[{}]}";
    private String useSnsShareYn;
    private String useLikeYn;
    private String useCommentYn;
    private String showYn;
    private String useYn;
    private String projectDesc;

    private Integer visitCnt = 0;
    private Integer shareCnt = 0;
    private Integer likeCnt = 0;
    private Integer commentCnt = 0;

    private String atchFileId;
    private List<InfoInteractionTagVO> tagList = new ArrayList<>();
    // 추가 필드
    private String tagGrpNm;

    private List<String> tag = Collections.emptyList();

    private String tagNm;
    private String statistics;
    private String totalRegDt;

    private String orderNumber;
}
