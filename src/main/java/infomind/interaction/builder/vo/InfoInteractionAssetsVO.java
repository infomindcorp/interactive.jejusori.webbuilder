package infomind.interaction.builder.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class InfoInteractionAssetsVO {

    @JsonIgnore
    private String projectKey;

    @JsonIgnore
    private String absolutePath;

    @JsonIgnore
    private Integer seq;

    private String type;

    private String src;

    private Integer width;

    private Integer height;

    private String name;

    private String absoluteName;

}
