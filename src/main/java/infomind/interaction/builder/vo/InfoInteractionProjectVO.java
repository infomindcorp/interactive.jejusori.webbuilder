package infomind.interaction.builder.vo;

import infomind.interaction.cms.contents.vo.InfoInteractionContentsVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InfoInteractionProjectVO extends InfoInteractionContentsVO {

   private String projectKey;

   private String projectName;
   private String projectData;

   private InfoInteractionProjectPageVO page;
}
