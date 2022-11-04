package infomind.interaction.cms.statistics.vo;
import infomind.com.ext.vo.CmsSearchVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class InfoInteractionStatisticsVO extends CmsSearchVO {

    private String logDt;
    private String visit; // 방문통계
    private String comment; //
    private String like;  // 좋아요 통계
    private String projectKey;
    private String projectName;
    private String cnt;

    //추가
    private String regId;
}
