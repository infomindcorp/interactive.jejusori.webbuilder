CREATE TABLE `info_intrc_assets` (
                                     `PROJECT_KEY` varchar(200)  DEFAULT NULL COMMENT '컨텐츠 고유키',
                                     `SEQ` int(11) NOT NULL AUTO_INCREMENT COMMENT '리소스 시퀀스',
                                     `TYPE` varchar(20)  NOT NULL,
                                     `ABSOLUTE_PATH` varchar(512)  NOT NULL,
                                     `SRC` varchar(512)  NOT NULL,
                                     `WIDTH` int(11) NOT NULL,
                                     `HEIGHT` int(11) NOT NULL,
                                     `NAME` varchar(255)  NOT NULL,
                                     `ABSOLUTE_NAME` varchar(255)  NOT NULL,
                                     PRIMARY KEY (`SEQ`),
                                     KEY `fk_assets_project_key` (`PROJECT_KEY`),
                                     CONSTRAINT `fk_assets_project_key` FOREIGN KEY (`PROJECT_KEY`) REFERENCES `info_intrc_project` (`PROJECT_KEY`)
) COMMENT='인터랙티브 컨텐츠 리소스'

CREATE TABLE `info_intrc_comments` (
                                       `COMMENTS_SEQ` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '코멘트 고유 번호',
                                       `PROJECT_KEY` varchar(20)  DEFAULT NULL COMMENT '컨텐츠 키',
                                       `COMMENTS_DT` datetime DEFAULT current_timestamp() COMMENT '등록일시',
                                       `SHOW_YN` char(1)  DEFAULT 'Y' COMMENT '공개여부',
                                       `USE_YN` char(1)  DEFAULT 'Y' COMMENT '사용여부',
                                       `REG_ID` varchar(20)  DEFAULT NULL,
                                       `REG_DT` datetime DEFAULT NULL,
                                       `MOD_ID` varchar(20)  DEFAULT NULL,
                                       `MOD_DT` datetime DEFAULT NULL,
                                       `COMMENTS_TITLE` varchar(200)  NOT NULL,
                                       `COMMENTS_TEXT` text  NOT NULL COMMENT '코멘트 내용',
                                       `PASSWD` varchar(500)  DEFAULT NULL,
                                       PRIMARY KEY (`COMMENTS_SEQ`),
                                       KEY `fk_intrc_comments_project_key` (`PROJECT_KEY`),
                                       CONSTRAINT `fk_intrc_comments_project_key` FOREIGN KEY (`PROJECT_KEY`) REFERENCES `info_intrc_project` (`PROJECT_KEY`)
)  COMMENT='인터랙티브 컨텐츠 코멘트'

CREATE TABLE `info_intrc_project` (
                                      `PROJECT_KEY` varchar(255)  NOT NULL COMMENT '컨텐츠 고유키',
                                      `PROJECT_NAME` varchar(255)  NOT NULL COMMENT '컨텐츠명',
                                      `PROJECT_DESC` text  DEFAULT NULL COMMENT '태그그룹설명',
                                      `PROJECT_DATA` text  NOT NULL COMMENT '컨텐츠 데이터',
                                      `ATCH_FILE_ID` varchar(20)  DEFAULT NULL COMMENT '첨부이미지',
                                      `USE_SNS_SHARE_YN` char(1)  DEFAULT 'N' COMMENT 'SNS 공유 사용여부',
                                      `USE_LIKE_YN` char(1)  DEFAULT 'N' COMMENT '좋아요 사용여부',
                                      `USE_COMMENT_YN` char(1)  DEFAULT 'N' COMMENT '코멘트 사용여부',
                                      `SHOW_YN` char(1)  DEFAULT 'N' COMMENT '공개 여부',
                                      `USE_YN` char(1)  DEFAULT 'Y' COMMENT '사용여부',
                                      `REG_ID` varchar(20)  DEFAULT NULL,
                                      `REG_DT` datetime DEFAULT NULL,
                                      `MOD_ID` varchar(20)  DEFAULT NULL,
                                      `MOD_DT` datetime DEFAULT NULL,
                                      `ORDER_NUMBER` int(11) NOT NULL COMMENT '정렬순번',
                                      PRIMARY KEY (`PROJECT_KEY`)
) COMMENT='인터랙티브 컨텐츠'

CREATE TABLE `info_intrc_project_page` (
                                           `PAGE_SNO` varchar(50)  NOT NULL,
                                           `PROJECT_KEY` varchar(255)  NOT NULL,
                                           `PROJECT_DATA` text  DEFAULT NULL,
                                           `PAGE_META` text  DEFAULT NULL,
                                           `PAGE_CSS` text  DEFAULT NULL,
                                           `PAGE_HTML` text  DEFAULT NULL,
                                           `PAGE_JS` text  DEFAULT NULL,
                                           `USE_YN` char(1)  DEFAULT 'Y',
                                           `REG_DT` datetime DEFAULT NULL,
                                           `REG_ID` varchar(20)  DEFAULT NULL,
                                           PRIMARY KEY (`PAGE_SNO`),
                                           KEY `info_intrc_project_page_info_intrc_project_PROJECT_KEY_fk` (`PROJECT_KEY`),
                                           CONSTRAINT `info_intrc_project_page_info_intrc_project_PROJECT_KEY_fk` FOREIGN KEY (`PROJECT_KEY`) REFERENCES `info_intrc_project` (`PROJECT_KEY`)
)

CREATE TABLE `info_intrc_project_tag` (
                                          `PROJECT_KEY` varchar(255)  NOT NULL COMMENT '컨텐츠 키',
                                          `TAG_ID` varchar(20)  NOT NULL COMMENT '태그 고유 아이디',
                                          PRIMARY KEY (`PROJECT_KEY`,`TAG_ID`),
                                          KEY `fk_project_tag_tag_id` (`TAG_ID`),
                                          CONSTRAINT `fk_project_tag_project_key` FOREIGN KEY (`PROJECT_KEY`) REFERENCES `info_intrc_project` (`PROJECT_KEY`),
                                          CONSTRAINT `fk_project_tag_tag_id` FOREIGN KEY (`TAG_ID`) REFERENCES `info_intrc_tag` (`TAG_ID`)
) COMMENT='인터랙티브 컨텐츠 태그 매핑'

CREATE TABLE `info_intrc_tag` (
                                  `TAG_ID` varchar(20)  NOT NULL COMMENT '태그 고유 아이디',
                                  `TAG_GRP_ID` varchar(20)  NOT NULL COMMENT '태그 그룹 아이디',
                                  `TAG_NM` varchar(200)  NOT NULL COMMENT '태그명',
                                  `TAG_DESCRIPTION` varchar(200)  DEFAULT NULL COMMENT '태그 설명',
                                  `USE_YN` char(1)  DEFAULT 'Y' COMMENT '사용여부',
                                  PRIMARY KEY (`TAG_ID`),
                                  KEY `fk_tag_tag_grp_id` (`TAG_GRP_ID`),
                                  CONSTRAINT `fk_tag_tag_grp_id` FOREIGN KEY (`TAG_GRP_ID`) REFERENCES `info_intrc_tag_grp` (`TAG_GRP_ID`)
)  COMMENT='인터랙티브 태그'

CREATE TABLE `info_intrc_tag_grp` (
                                      `TAG_GRP_ID` varchar(20)  NOT NULL COMMENT '태그 그룹 아이디',
                                      `TAG_GRP_NM` varchar(200)  DEFAULT NULL COMMENT '태그 그룹명',
                                      `USE_YN` char(1)  DEFAULT 'Y' COMMENT '사용여부',
                                      PRIMARY KEY (`TAG_GRP_ID`)
)  COMMENT='인터랙티브 태그 그룹'

CREATE TABLE `info_intrc_usr_log` (
                                      `usr_log_seq` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '로그 고유번호',
                                      `PROJECT_KEY` varchar(255)  DEFAULT NULL COMMENT '컨텐츠 키',
                                      `usr_log_type` varchar(20)  DEFAULT NULL COMMENT '로그 타입, VISIT, LIKE, SHARE 등',
                                      `usr_log_dt` datetime DEFAULT current_timestamp(),
                                      PRIMARY KEY (`usr_log_seq`),
                                      KEY `fk_usr_log_project_key` (`PROJECT_KEY`),
                                      CONSTRAINT `fk_usr_log_project_key` FOREIGN KEY (`PROJECT_KEY`) REFERENCES `info_intrc_project` (`PROJECT_KEY`)
) COMMENT='인터랙티브 사용자 로그'

