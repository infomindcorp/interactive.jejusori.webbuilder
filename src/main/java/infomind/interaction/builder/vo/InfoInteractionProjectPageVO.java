package infomind.interaction.builder.vo;

import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InfoInteractionProjectPageVO {

   private String  pageSno;
   private String projectKey;
   private String projectData;

   private String pageMeta;
   private String pageCss;
   private String pageHtml;
   private String useYn = "N";

   private Date regDt;
   private String regId;

}
