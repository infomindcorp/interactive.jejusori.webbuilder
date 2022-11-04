package infomind.interaction.cms.statistics.vo;
import infomind.com.ext.vo.CmsSearchVO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class InfoInteractionCommentsVO extends CmsSearchVO {

    private String commentsSeq;
    private String projectKey;
    private String commentsText;
    private String commentsDt;
    private String showYn;
    private String useYn;

}
