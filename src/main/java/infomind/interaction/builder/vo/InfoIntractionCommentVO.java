package infomind.interaction.builder.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class InfoIntractionCommentVO {


    private Integer commentsSeq; // COMMENTS_SEQ  bigint auto_increment comment '코멘트 고유 번호'
    private String projectKey;  // PROJECT_KEY   varchar(20)                          null comment '컨텐츠 키',
    private Date commentsDt;  // COMMENTS_DT   datetime default current_timestamp() null comment '등록일시',
    private String showYn = "Y";      // SHOW_YN       char     default 'Y'                 null comment '공개여부',
    private String useYn  = "Y";       // USE_YN        char     default 'Y'                 null comment '사용여부',
    private String regId;       // REG_ID        varchar(20)                          null,
    private Date regDt;       // REG_DT        datetime                             null,
    private String modId;       // MOD_ID        varchar(20)                          null,
    private Date modDt;       // MOD_DT        datetime                             null,
    private String commentsTitle;//
    private String commentsText;// COMMENTS_TEXT text                                 not null comment '코멘트 내용',
    private String passwd;       // PASSWD        varchar(500)                         null,


}
