;(function($){

$.fui = $.fui || {};

$.extend(true,
$.fui, {
    uimsg: {
        en: {
            info: {
                captionRefresh: 'Refresh',
                captionAdd: 'Add',
                captionCol: 'Column',
                captionDel: 'Delete',
                captionExp: 'Export',
                captionImp: 'Import',
                captionSave: 'Save',
                processing: 'Processing...'
            },
            valid: {
                date001: 'Invalid date format. ex) 2009.01.01',
                date002: 'Only allows to type a year up to 9999',
                date003: 'Only allows to type a month from 01 to 12.',
                date004: 'Only allows to type a day in {1}/{0} from 01 to {2}',
                date005: 'Invalid datetime format. ex) 2009.01.01 23:59',
                date006: 'Only allows to type a time from 00:00 to 23:59',
                date007: 'Invalid datetime format. 예)2009.01.01 23:59:59',
                date008: 'Only allows to type a time from 00:00:00 to 23:59:59',
                date100: 'Invalid datetime format. Valid one: {0}',
                require: 'This is a mandatory field',
                length001: 'Unable to type more than ({0}) size',
                length002: 'Should type more than ({0}) size',
                length003: 'Please type ({0}) size',
                type001: 'Only allows number type',
                type002: 'Only allows to type integer type',
                type003: 'Only allows to type double type',
                type004: 'Only allows to type double type',
                type005: 'Only allows to type Korean',
                type006: 'Only allows to type English',
                type007: 'Only allows to type English and number',
                type008: 'Only allows to type English with lowercase',
                type009: 'Only allows to type English with uppercase',
                type010: 'Only allows to type English with lowercase and number',
                type011: 'Only allows to type English with uppercase and number',
                type012: 'Invalid email address'
            },
            error: {
                chartCreate: 'An error when rendering a chart',
                http403: 'HttpRequest[403]: Access-Denied',
                http404: 'HttpRequest[404]: Not Found',
                http500: 'HttpRequest[500]: Server Error',
                execute: 'An error when processing',
                gridCreate: 'An error when rendering a grid',
                noUrl: 'Please check the url to request'
            },
            warning: {
                exeNoData: 'No data to process',
                exeSelect: 'Please select data to process',
                delSelect: 'Please select data to delete',
                noData: 'No data available',
                rowSelect: 'Please select a row',
                selRetry: 'Please try again after searching',
                noPopWin: 'Please try again after allowing the pop up block.'
            },
            confirm: {
                dataCnt: 'Process count : {0}',
                dataCntDetail: 'Insert : {0} \nUpdate : {0} \nDelete : {0} ',
                execute: 'Do you want to process it?',
                executeData: 'Do you want to delete the data?',
                selExecute: 'Do you want to process the data selected?'
            }
        }
    },

    grid: {
        en : {
            state : {
                flag_normal: "",
                flag_insert: "I",
                flag_update: "U",
                flag_delete: "D",
                label_normal: "",
                label_insert: "New",
                label_update: "Update",
                label_delete: "Delete"
            },
            defaults : {
                sortReload: true,
                altRows: false,
                widthOffset: -1,
                heightOffset: 0,
                blockTimeout: 50,
                enterMove: "",
                rownumbers: "Num",
                //recordtext: "{0} - {1} / {2}",
                recordtext: "Total {2}",
                emptyrecords: "No data",
                loadtext: "Loading...",
                pgtext: "Page {0} / {1}",
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
                caption: "Search...",
                Find: "Find",
                Reset: "Reset",
                odata : ['Equal( = )', 'Not equal( <> )', 'Less than( < )', 'Less or equal( <= )','Greater than( > )','Greater or equal( >= )', 'Start with','Not start with','Contain','Not contain','End with','Not end with','Include','Not include'],
                groupOps: [    { op: "AND", text: "And" },    { op: "OR",  text: "Or" }    ],
                matchText: " match",
                rulesText: " rules"
            },
            edit : {
                addCaption: "New record",
                editCaption: "Edit record",
                bSubmit: "Submit",
                bCancel: "Cancel",
                bClose: "Close",
                saveData: "The data has been changed! Do you want to save it?",
                bYes : "Yes",
                bNo : "No",
                bExit : "Exit",
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
                caption: "View record",
                bClose: "Close"
            },
            del : {
                caption: "Delete",
                msg: "Do you want to delete it?",
                bSubmit: "Delete",
                bCancel: "Cancel"
            },
            nav : {
                edittext: "",
                edittitle: "Edit row",
                addtext:"",
                addtitle: "Add row",
                deltext: "",
                deltitle: "Delete row",
                searchtext: "",
                searchtitle: "Search row",
                refreshtext: "",
                refreshtitle: "Refresh",
                alertcap: "Warning",
                alerttext: "Select a row",
                viewtext: "",
                viewtitle: "View row"
            },
            col : {
                caption: "Show/Hide",
                bSubmit: "Submit",
                bCancel: "Cancel"
            },
            errors : {
                errcap : "Error",
                nourl : "Unable to find a url",
                norecords: "Unable to process due to no data",
                model : "Length of colNames must match one of colModel"
            },
            formatter : {
                number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 0, defaultValue: ""},
                integer : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 0, defaultValue: ""},
                decimal : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: ""},
                currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 0, defaultValue: "", prefix: "", suffix:""},
                date : {
                    dayNames:   [
                        'Sun','Mon','Tue','Wed','Thu','Fri','Sat',
                        'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
                    ],
                    monthNames: [
                        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
                        'January','February','March','April','May','June', 'July','August','September','October','November','December'
                    ],
                    AmPm : ["am","pm","AM","PM"],
                    S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
                    srcformat: 'YYYYMMDD',
                    newformat: 'DD/MM/YYYY',
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
        en: {
            dateSeparator: '/',
            timeSeparator: ':',
            edittype: {
                'time'       : { format: 'HH:mm:ss', mask: '29:59:59', regEx: /^(\d{2}):(\d{2}):(\d{2})$/},
                'time_hm'    : { format: 'HH:mm', mask: '29:59', regEx: /^(\d{2}):(\d{2})$/},
                'date_y'     : { format: 'YYYY', mask: '9999', regEx: /^(\d{4})$/},
                'date_ym'    : { format: 'MM/YYYY', mask: '19/9999', regEx: /^(\d{2})(\/)(\d{4})$/},
                'date'       : { format: 'DD/MM/YYYY', mask: '39/19/9999', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{4})$/},
                'date_h'     : { format: 'DD/MM/YYYY HH', mask: '39/19/9999 29', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{4}) (\d{2})$/},
                'date_hm'    : { format: 'DD/MM/YYYY HH:mm', mask: '39/19/9999 29:59', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{4}) (\d{2}):(\d{2})$/},
                'date_hms'   : { format: 'DD/MM/YYYY HH:mm:ss', mask: '39/19/9999 29:59:59', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{4}) (\d{2}):(\d{2}):(\d{2})$/},
                'date_yy'    : { format: 'DD/MM/YY', mask: '39/19/99', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{2})$/},
                'date_yy_h'  : { format: 'DD/MM/YY HH', mask: '39/19/99 29', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{2}) (\d{2})$/},
                'date_yy_hm' : { format: 'DD/MM/YY HH:mm', mask: '39/19/99 29:59', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{2}) (\d{2}):(\d{2})$/},
                'date_yy_hms': { format: 'DD/MM/YY HH:mm:ss', mask: '39/19/99 29:59:59', regEx: /^(\d{2})(\/)(\d{2})(\/)(\d{2}) (\d{2}):(\d{2}):(\d{2})$/}
            }
        }
    },

    number: {
        en: {
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
                format: '#,###.00',
                negative: true,
                select: true
            }
        }
    }
});

if ($.datepicker) {
    $.datepicker.disable = true;	//fleta-ui-1.2.4면 disable true 아니어야 함
    $.datepicker.locale = 'en';
    $.datepicker.regional['en'] = {
        closeText: 'Close',
        prevText: 'Prev',
        nextText: 'Next',
        currentText: 'Today',
        monthNames: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
        monthNamesShort: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
        dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        dayNamesMin: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        weekHeader: 'Wk',
        dateFormat: 'DD/MM/YY',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: 'Year'
    };
    $.datepicker.setDefaults($.datepicker.regional['en']);
}

if ($.timepicker) {
    $.timepicker.regional['ko'] = {
        timeOnlyTitle: 'Select',
        timeText: 'Time',
        hourText: 'Hour',
        minuteText: 'Minute',
        secondText: 'Second',
        currentText: 'Current',
        closeText: 'Select',
        ampm: false
    };
    $.timepicker.setDefaults($.timepicker.regional['en']);
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
        checkAllText: 'Check all',
        uncheckAllText: 'Un-check all',
        noneSelectedText: '',
        selectedText: '# selected',
        maxCheckText: 'Max # can be selected'
    });
    $.extend($.ech.multiselectfilter.prototype.options, {
        label: "Filter:",
        placeholder: ""
    });
}

})(jQuery);
