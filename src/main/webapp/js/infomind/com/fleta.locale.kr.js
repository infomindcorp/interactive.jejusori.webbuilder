;(function($){

$.fui = $.fui || {};

$.extend(true,
$.fui, {
    uimsg: {
        kr: {
            info: {
                captionRefresh: '갱신',
                captionAdd: '추가',
                captionCol: '컬럼',
                captionDel: '삭제',
                captionExp: '엑셀',
                captionImp: '엑셀',
                captionSave: '저장',
                processing: '요청중입니다...'
            },
            valid: {
                date001: '입력은 날짜 형식만 가능합니다. 예)2009.01.01',
                date002: '년은 9999년까지 입력 가능합니다.',
                date003: '월은 01~12월까지 입력 가능합니다.',
                date004: '{0}년{1}월의 날짜는 01~{2}일까지 입력 가능합니다.',
                date005: '입력은 일시 형식만 가능합니다. 예)2009.01.01 23:59',
                date006: '시간은 00:00~23:59 까지 입력 가능합니다.',
                date007: '입력은 일시 형식만 가능합니다. 예)2009.01.01 23:59:59',
                date008: '시간은 00:00:00~23:59:59 까지 입력 가능합니다.',
                date100: '날짜/시간 형식이 잘못되었습니다. 입력형식: {0}',
                require: '해당항목은 필수 입력값입니다.',
                length001: '({0})자리 이상 입력할수 없습니다.',
                length002: '({0})자리 이상 입력해야 합니다.',
                length003: '({0})자리로 입력해주세요.',
                type001: '숫자만 입력하실 수 있습니다.',
                type002: '숫자(정수)만 입력하실 수 있습니다.',
                type003: '숫자(실수)만 입력하실 수 있습니다.',
                type004: '실수만 입력하실 수 있습니다.',
                type005: '한글만 입력하실 수 있습니다.',
                type006: '영문만 입력하실 수 있습니다.',
                type007: '영어, 숫자만 입력하실 수 있습니다.',
                type008: '영문(소문자)만 입력하실 수 있습니다.',
                type009: '영문(대문자)만 입력하실 수 있습니다.',
                type010: '영문(소문자), 숫자만 입력하실 수 있습니다.',
                type011: '영문(대문자), 숫자만 입력하실 수 있습니다.',
                type012: '유효하지 않은 이메일 주소입니다.'
            },
            error: {
                chartCreate: '차트 생성시 오류가 발생하였습니다.',
                http403: 'HttpRequest[403]: 접근거부',
                http404: 'HttpRequest[404]: 페이지없음',
                http500: 'HttpRequest[500]: 서버오류',
                execute: '처리중 에러가 발생했습니다.',
                gridCreate: '그리드 생성시 오류가 발생하였습니다.',
                noUrl: '호출될 URL을 확인해 주세요.'
            },
            warning: {
                exeNoData: '처리할 데이터가 없습니다.',
                exeSelect: '처리할 데이터를 선택하십시요.',
                delSelect: '삭제할 행을 선택해주세요.',
                noData: '데이터가 없습니다.',
                rowSelect: '행을 선택하십시오.',
                selRetry: '조회후 다시 수행해주세요.',
                noPopWin: '팝업차단을 해제한 후 다시 수행해주세요.'
            },
            confirm: {
                dataCnt: '처리건수 : {0} 건',
                dataCntDetail: '등록건수 : {0} 건\n수정건수 : {0} 건\n삭제건수 : {0} 건',
                execute: '처리하시겠습니까?',
                executeData: '데이터를 처리하시겠습니까?',
                selExecute: '선택한 데이터를 처리하시겠습니까?'
            }
        }
    },

    grid: {
        kr : {
            state : {
                flag_normal: "",
                flag_insert: "I",
                flag_update: "U",
                flag_delete: "D",
                label_normal: "",
                label_insert: "신규",
                label_update: "수정",
                label_delete: "삭제"
            },
            defaults : {
                sortReload: true,
                altRows: false,
                widthOffset: -1,
                heightOffset: 0,
                blockTimeout: 50,
                enterMove: "",
                rownumbers: "번호",
                //recordtext: "보기 {0} - {1} / {2}",
                recordtext: "총 {2}건",
                emptyrecords: "레코드가 없습니다.",
                loadtext: "요청중입니다...",
                pgtext: "페이지 {0} / {1}",
                colModel: {
                    editoptions: {
                        //그리드셀 디폴트(영문설정)
                        imeMode: "inactive"
                        //그리드셀 디폴트(한글설정)
                        //imeMode: "active"
                    }
                }
            },
            search : {
                caption: "검색...",
                Find: "찾기",
                Reset: "초기화",
                odata : ['같다( = )', '같지 않다( <> )', '적다( < )', '같거나 적다( <= )','크다( > )','같거나 크다( >= )', '단어로 시작','단어로 시작 안 함','들어있는 단어','들어있지 않은 단어','단어로 끝남','해당 단어로 끝나지 않음','포함됨','포함되지 않음'],
                groupOps: [    { op: "AND", text: "모두" },    { op: "OR",  text: "또는" }    ],
                matchText: " match",
                rulesText: " rules"
            },
            edit : {
                addCaption: "새 레코드",
                editCaption: "레코드 편집",
                bSubmit: "확인",
                bCancel: "취소",
                bClose: "닫기",
                saveData: "데이터가 바뀌었습니다! 저장하시겠습니까??",
                bYes : "예",
                bNo : "아니오",
                bExit : "취소",
                msg: {
                    required:"해당 항목은 필수입력입니다.",
                    minValue:"다음 숫자는 해당 숫자보다 커야 합니다 - ",
                    maxValue:"다음 숫자는 해당 숫자보다 작아야 합니다 - ",
                    email: "올바른 이메일 주소가 아닙니다.",
                    date: "올바른 날짜 형식으로 넣어 주십시오.",
                    url: "URL은 ('http://' 또는 'https://') 형식으로 시작해야 합니다.",
                    nodefined : "정의되지 않았습니다!",
                    novalue : "반환값이 필요합니다!",
                    customarray : "사용자 정의 함수는 배열을 반환해야합니다!",
                    customfcheck : "사용자 정의 함수는 사용자 정의 검사의 경우에 존재합니다!",
                    maxlength: "자리 이상 입력할 수 없습니다.",
                    minlength: "자리 이상 입력해야 합니다.",
                    fixlength: "자리로 입력해주세요.",
                    number: "올바른 숫자가 아닙니다.",
                    integer: "올바른 숫자가 아닙니다.",
                    decimal: "올바른 숫자가 아닙니다.",
                    currency: "올바른 숫자가 아닙니다.",
                    korean: "한글만 입력하실 수 있습니다.",
                    alpha: "영문만 입력하실 수 있습니다.",
                    alphanum: "영어,숫자만 입력하실 수 있습니다.",
                    loweralpha: "영문(소문자)만 입력하실 수 있습니다.",
                    upperalpha: "영문(대문자)만 입력하실 수 있습니다.",
                    loweralphanum: "영문(소문자), 숫자만 입력하실 수 있습니다.",
                    upperalphanum: "영문(대문자), 숫자만 입력하실 수 있습니다."
                },
                newRowDelete  : '해당행은 제거됩니다. \n진행(제거) 하시겠습니까?',
                newRowDeletes : '신규행들은 제거됩니다. \n진행(전체선택) 하시겠습니까?'
            },
            view : {
                caption: "레코드 보기",
                bClose: "닫기"
            },
            del : {
                caption: "삭제",
                msg: "정말 레코드를 삭제하시겠습니까??",
                bSubmit: "삭제",
                bCancel: "취소"
            },
            nav : {
                edittext: "",
                edittitle: "선책된 행 편집",
                addtext:"",
                addtitle: "행 추가",
                deltext: "",
                deltitle: "행 삭제",
                searchtext: "",
                searchtitle: "행 찾기",
                refreshtext: "",
                refreshtitle: "그리드 새로고침",
                alertcap: "경고",
                alerttext: "행을 선택하십시오.",
                viewtext: "",
                viewtitle: "선택행 보기"
            },
            col : {
                caption: "컬럼 보기/감추기",
                bSubmit: "확인",
                bCancel: "취소"
            },
            errors : {
                errcap : "Error",
                nourl : "URL이 설정되지 않았습니다.",
                norecords: "레코드가 없어 처리하지 못했습니다.",
                model : "colNames 와 colModel 길이가 달라야 합니다!"
            },
            formatter : {
                number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 0, defaultValue: ""},
                integer : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 0, defaultValue: ""},
                decimal : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: ""},
                currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 0, defaultValue: "", prefix: "", suffix:""},
                date : {
                    dayNames:   [
                        "일", "월", "화", "수", "목", "금", "토",
                        "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"
                    ],
                    monthNames: [
                        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
                        "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
                    ],
                    AmPm : ["오전","오후","오전","오후"],
                    S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
                    srcformat: 'Y.m.d',
                    newformat: 'Y.m.d',
                    reformatAfterEdit : false
                },
                baseLinkUrl: '',
                showAction: '',
                target: '',
                checkbox : {disabled:false},
                radio : {disabled:false},
                idName : 'id'
            },
            /**
             * 그리드 헤더스타일 설정
             * - color: 기본헤더색상
             * - colorAsc: 소트시색상(내림차순)
             * - colorDesc: 소트시색상(오름차순)
             */
            sort: {
                color: '#555555',
                colorAsc: '#010976',
                colorDesc: '#C40040'
            }
        }
    },

    datetime: {
        kr: {
            dateSeparator: '-',
            timeSeparator: ':',
            edittype: {
                'time'       : { format: 'HH:mm:ss', mask: '29:59:59', regEx: /^(\d{2}):(\d{2}):(\d{2})$/},
                'time_hm'    : { format: 'HH:mm', mask: '29:59', regEx: /^(\d{2}):(\d{2})$/},
                'date_y'     : { format: 'YYYY', mask: '9999', regEx: /^(\d{4})$/},
                'date_ym'    : { format: 'YYYY-MM', mask: '9999-19', regEx: /^(\d{4)-(\d{2})$/},
                'date'       : { format: 'YYYY-MM-DD', mask: '9999-19-39', regEx: /^(\d{4)-(\d{2})-(\d{2})$/},
                'date_h'     : { format: 'YYYY-MM-DD HH', mask: '9999-19-39 29', regEx: /^(\d{4)-(\d{2})-(\d{2}) (\d{2})$/},
                'date_hm'    : { format: 'YYYY-MM-DD HH:mm', mask: '9999-19-39 29:59', regEx: /^(\d{4)-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/},
                'date_hms'   : { format: 'YYYY-MM-DD HH:mm:ss', mask: '9999-19-39 29:59:59', regEx: /^(\d{4)-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/},
                'date_yy'    : { format: 'YY-MM-DD', mask: '99-19-39', regEx: /^(\d{2})-(\d{2})-(\d{2})$/},
                'date_yy_h'  : { format: 'YY-MM-DD HH', mask: '99-19-39 29', regEx: /^(\d{2})-(\d{2})-(\d{2}) (\d{2})$/},
                'date_yy_hm' : { format: 'YY-MM-DD HH:mm', mask: '99-19-39 29:59', regEx: /^(\d{2})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/},
                'date_yy_hms': { format: 'YY-MM-DD HH:mm:ss', mask: '99-19-39 29:59:59', regEx: /^(\d{2})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/}
            }
        }
    },

    number: {
        kr: {
            number: {
                type: 'number',
                format: '#,###',
                negative: false,
                select: true
            },
            integer: {
                type: 'integer',
                format: '#,###',
                negative: true,
                select: true
            },
            decimal: {
                type: 'decimal',
                format: '#,###.##',
                negative: true,
                select: true
            },
            currency: {
                type: 'currency',
                format: '#,###',
                negative: true,
                select: true
            }
        }
    }
});

if ($.datepicker) {
    $.datepicker.disable = true;	//fleta-ui-1.2.4면 disable true 아니어야 함
    $.datepicker.locale = 'kr';
    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
        monthNamesShort: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
        '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
        dayNames: ['일','월','화','수','목','금','토'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        dayNamesMin: ['일','월','화','수','목','금','토'],
        weekHeader: 'Wk',
        dateFormat: 'yy.mm.dd',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '년(YEAR)'
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
}

if ($.timepicker) {
    $.timepicker.regional['ko'] = {
        timeOnlyTitle: '시간선택',
        timeText: 'Time',
        hourText: 'Hour',
        minuteText: 'Minute',
        secondText: 'Second',
        currentText: '현재',
        closeText: '선택',
        ampm: false
    };
    $.timepicker.setDefaults($.timepicker.regional['ko']);
}

//allou(2013.07.25 로케일 적용, fleta.jquery.ext.js에서 이동해옴)
if ($.ech) {
    // Menu Label 설정
    $.extend($.ech.multiselect.prototype.options, {
        showUp: false,
        header: false,
        multiple: false,
        minWidth: 150,
        maxCheck: 500,
        selectedList: 1,
        checkAllText: '전체선택',
        uncheckAllText: '전체해제',
        noneSelectedText: '',
        selectedText: '#개 선택',
        maxCheckText: '#개만 선택할 수 있습니다.'
    });
    $.extend($.ech.multiselectfilter.prototype.options, {
        label: "필터:",
        placeholder: ""
    });
}

})(jQuery);
