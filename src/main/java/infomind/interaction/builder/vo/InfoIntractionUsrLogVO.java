package infomind.interaction.builder.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Builder
@Data
public class InfoIntractionUsrLogVO {

    private Integer usrLogSeq;

    private String projectKey;

    private String usrLogType;

    private Date usrLogDt;
}
