package infomind.interaction.cms.page.vo;

import infomind.com.ext.vo.CmsSearchVO;
import infomind.interaction.builder.vo.InfoInteractionProjectPageVO;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class InfoInteractionPageVO extends CmsSearchVO{

    private String pageSno;

    private String projectKey;

    private String useYn;

    private String regId;

    private String regDt;

}
