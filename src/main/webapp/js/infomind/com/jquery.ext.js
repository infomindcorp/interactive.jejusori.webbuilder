
// 달력날짜형식 구분자
var DATE_SEP = '-';
var TIME_SEP = ':';
var isGridField = false;

//경로변수(OFC차트)
//var OFC_LIB_PATH = contextPath + '/resources/common-ui/chart/ofc';
//경로변수(달력이미지)
var CARLENDAR_IMAGE_PATH = "/source/images/user.gif";

$(document).ready(function () {
});

function convertJSON(b) {
    var a = undefined;
    try {
        a = $.parseJSON(b)
    } catch (c) {
    }
    return a
}

function getJsonData(b) {
    if (b != undefined && b != "null" && b != "") {
        var a;
        if (typeof b == "string") {
            a = $.parseJSON(b)
        } else {
            a = b
        }
        if (a.length != 0) {
            return a
        }
    }
    return null
}

function showServerMessage(e, a) {
    try {
        if ($.isFunction(cfn_ajaxResponseCheck)) {
            cfn_ajaxResponseCheck(e, a.showMessage);
            return
        }
    } catch (d) {
    }
    var c = null;
    var b = null;
    var f = null;
    if (e.readyState == 0) {
    } else {
        if (e.readyState == 1) {
        } else {
            if (e.readyState == 2) {
            } else {
                if (e.readyState == 3) {
                } else {
                    if (e.readyState == 4) {
                        c = e.status;
                        if (c == 200) {
                            b = getServerMessage(e.responseText)
                        } else {
                            if (c == 403) {
                                b = e.responseText;
                                f = $.uimsg.error.http403
                            } else {
                                if (c == 404) {
                                    b = e.responseText;
                                    f = $.uimsg.error.http404
                                } else {
                                    if (c == 500) {
                                        b = e.responseText;
                                        f = $.uimsg.error.http500
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var g = "";
    if (f != null) {
        g = {status: c, serviceMessage: f, causeMessage: encodeURIComponent(b)}
    } else {
        if (b != null) {
            if (typeof b == "object") {
                if ($.isArray(b)) {
                    g = b.join("\n")
                } else {
                    g = b
                }
            } else {
                g = b
            }
            if (g) {
                if (!$.isArray(g) && g.status == "fatal") {
                } else {
                    if (a.showMessage) {
                        alert(g)
                    }
                }
            }
        }
    }
    return g
}

function getServerMessage(c) {
    var a = getJsonData(c);
    if (a != null) {
        var b = new Array();
        if ($.isArray(a)) {
            $.each(a, function (d) {
                if (this.serviceMessage) {
                    b.push(this.serviceMessage)
                }
            })
        } else {
            if (a.page == undefined && a.rows == undefined) {
                if (a.status == "fatal") {
                    return a
                } else {
                    if (a.serviceMessage) {
                        b.push(a.serviceMessage)
                    }
                }
            }
        }
        if (b.length > 0) {
            return b
        }
    }
    return null
}

function isValidMessage(b) {
    var a = true;
    if (b) {
        if (b.indexOf("error") != -1) {
            a = false
        } else {
            if (b.substring(4, 5) == "E") {
                a = false
            }
        }
    }
    return a
}

function sleep(a) {
    var b = new Date();
    b.setTime(b.getTime() + a);
    while (new Date().getTime() < b.getTime()) {
    }
}

var createMessage = function (b) {
    var a = $.makeArray(arguments).slice(1);
    if (b === undefined) {
        b = ""
    }
    return b.replace(/\{(\d+)\}/g, function (c, d) {
        return a[d]
    })
};

function supportsCanvasToDataURL() {
    if (!(!!document.createElement("canvas").getContext)) {
        return false
    }
    return (document.createElement("canvas").toDataURL("image/png").indexOf("data:image/png") == 0)
}

var POPUP_WIN = null;
var POPUP_DATA_KEY = "popup";

function popupWindow(a) {
    if (a.timeout) {
        setTimeout(function () {
            return popupWindowOpen(a)
        }, a.timeout)
    } else {
        return popupWindowOpen(a)
    }
}

function popupWindowOpen(k) {
    if (!k) {
        return null
    }
    var h;
    var m = k.modal ? k.modal : false;
    var f = k.width ? k.width : 800;
    var g = k.height ? k.height : 600;
    var r = (k.scroll == false) ? "no" : "yes";
    var d = (k.resize == false) ? "no" : "yes";
    var b = (k.location == false) ? "no" : "yes";
    var s = k.reload ? k.reload : false;
    var l = k.windowNm ? k.windowNm : "_popup";
    var e = k.method ? k.method : "get";
    var o = k.url;
    var p = $.extend({windowNm: l}, k.param);
    var i = {};
    if (p) {
        if (typeof (p) == "string") {
            i = getMasterParams(p)
        } else {
            i = p
        }
        var a = "";
        for (nm in i) {
            var c = i[nm];
            c = encodeURIComponent(c);
            if (i.hasOwnProperty(nm)) {
                if (c) {
                    a += (a) ? "&" : "";
                    a += (nm + "=" + c)
                }
            }
        }
        if (o && a && e == "get") {
            if (o.indexOf("?") != -1) {
                o = o + "&" + a
            } else {
                o = o + "?" + a
            }
        }
    }
    var n = $.extend({}, $(document.body).data(POPUP_DATA_KEY));
    n[l] = k.callback;
    $(document.body).data(POPUP_DATA_KEY, n);
    if (m === true && window.showModalDialog) {
        h = "dialogWidth:" + f + "px;dialogHeight:" + g + "px;scroll:" + r + ";resizable:" + d + ";location:" + b + ";help:no;center:yes;status:no;edge:raised;unadorned:no;";
        POPUP_WIN = window.showModalDialog(o, window, h);
        if ($.isFunction(k.callback)) {
            k.callback(POPUP_WIN.param)
        }
    } else {
        var j = window.center({width: k.width, height: k.height});
        if (POPUP_WIN != null && s != true) {
            try {
                if (POPUP_WIN.name == l) {
                    POPUP_WIN.focus();
                    return POPUP_WIN
                }
            } catch (q) {
                POPUP_WIN = null
            }
        }
        h = "left=" + j.x + ",top=" + j.y + ",height=" + g + ",width=" + f + ",scrollbars=" + r + ",resizable=" + d + ",location=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,linemenubar=no,modal=yes,dependent=yes";
        if (e == "post") {
            POPUP_WIN = window.open("", l, h, false);
            submitDynamicForm("_popupWindowOpenForm", o, "post", i, l)
        } else {
            POPUP_WIN = window.open(o, l, h, false)
        }
        if (POPUP_WIN == null) {
            if ($.uimsg.warning.noPopWin) {
                alert($.uimsg.warning.noPopWin)
            }
        } else {
            POPUP_WIN.focus()
        }
    }
    return POPUP_WIN
}

function popupWindowClose(a) {
    window.close()
}

function popupCallback(a) {
    if (typeof (a) != "object") {
        return
    }
    if (window.dialogArguments) {
        window.returnValue = a
    } else {
        a.windowNm = window.name;
        opener.popupCallbackOpener(a);
        opener.focus()
    }
    if (a.close !== false) {
        window.close()
    }
}

function popupCallbackOpener(b) {
    var a = $(document.body).data(POPUP_DATA_KEY);
    if (b.windowNm) {
        var c = a[b.windowNm];
        if ($.isFunction(c)) {
            c(b.param)
        }
    }
}

function popupLayer(a) {
    var c = $.extend({
        modal: true,
        draggable: true,
        resizable: false,
        position: ["center", 100],
        width: a.width || "auto",
        height: a.height || "auto",
        minWidth: 150,
        minHeight: 150,
        create: function (f, g) {
        },
        open: function (f, g) {
        },
        beforeClose: function (f, g) {
        },
        close: function (f, g) {
        },
        focus: function (f, g) {
        },
        dragStart: function (f, g) {
        },
        drag: function (f, g) {
        },
        dragStop: function (f, g) {
        },
        resizeStart: function (f, g) {
        },
        resize: function (f, g) {
        },
        resizeStop: function (f, g) {
        }
    }, a);
    var d = $("div.ui-dialog-content[id=" + a.id + "]");
    if (d.attr("id") && a.remove != false) {
        $("div[id=" + d.attr("id") + "]").dialog("moveToTop");
        return
    }
    c.open = function (f, g) {
        if ($.isFunction(a.open)) {
            a.open.call(this, f, g)
        }
    };
    c.close = function (g, h) {
        if (a.remove !== false) {
            var f = $("div.ui-dialog-content[id^=" + this.id + "_]").closest("div[role=dialog] *");
            f.remove();
            $("div[id=" + a.id + "]").remove()
        }
        if ($.isFunction(a.close)) {
            a.close.call(this, g, h)
        }
    };
    if (c.id === undefined) {
        alert("id is null!");
        return
    } else {
        c.id = c.id.replace(/#/gi, "");
        c.param = $.extend({wid: c.id}, c.param)
    }
    var b = true;
    var e = $("div[id=" + c.id + "]");
    if (e.length == 0) {
        if (c.url) {
            $.ajax({
                async: false, type: "POST", url: c.url, data: c.param, dataType: "html", success: function (i, f) {
                    try {
                        var h = convertJSON(i);
                        if (h != undefined) {
                            b = false
                        } else {
                            e = createDynamicDiv(c);
                            e.html(i)
                        }
                    } catch (g) {
                    }
                }, complete: function (h, f) {
                    if (f == "success") {
                    }
                    try {
                        cfn_ajaxResponseCheck(h)
                    } catch (g) {
                    }
                }
            })
        } else {
            e = createDynamicDiv(c)
        }
    }
    if (e.length > 0 && b == true) {
        e.dialog(c)
    }
    return e
}

function popupLayerClose(b) {
    var c = $.extend({}, b);
    var a = c.id.replace(/#/gi, "");
    if (c.remove !== false) {
        $("#" + a).dialog(c).dialog("close").remove()
    } else {
        $("#" + a).dialog(c).dialog("close")
    }
}

function createDynamicDiv(b) {
    var a = $(document.createElement("div"));
    a.attr("id", b.id).hide();
    $("body").append(a);
    return a
}

function dialogMessage(b) {
    if (!b.width) {
        b.width = 500
    }
    if (!b.height) {
        b.height = 500
    }
    var a = window.center({width: b.width, height: b.height});
    $.jgrid.info_dialog("메세지", b.msg, "닫기", {left: a.x, top: a.y, jqModal: true, modal: true})
}

function ajaxCheckOptions(a) {
    var b = $.extend(true, {async: true, showMessage: true, confirmMessage: true}, a || {});
    if ($.isFunction(b.callback)) {
        if (!b.async) {
            b.async = false
        }
    }
    return b
}

function ajaxCheckOptions2(b) {
    var a = $.extend(true, {}, $.ajaxOptions || {});
    a = $.extend(true, a, b || {});
    var c = $.extend(true, {
        requestDataType: "form",
        async: true,
        url: undefined,
        param: {},
        searchMaster: {id: undefined, toMasterId: undefined},
        searchDetail: {
            id: undefined,
            rowId: undefined,
            subId: undefined,
            selected: true,
            reload: false,
            toDetailId: undefined,
            toSubDetailId: undefined
        },
        master: {id: undefined, ids: []},
        detail: {id: undefined, ids: [], stateFlag: [], checked: false, reload: false},
        paramExecute: true,
        arrValJoin: false,
        showMessage: true,
        warningMessage: true,
        confirmMessage: false,
        block: true
    }, a);
    a = null;
    if ($.isFunction(c.callback)) {
        if (!c.async) {
            c.async = false
        }
    }
    return c
}

function ajaxLoadSelect(a) {
    if (a.constructor != Object || $.isEmptyObject(a)) {
        alert("ERROR : Invalid Parameter(Object)")
    }
    var f = false;
    $.each(a.params, function () {
        if (this.name == "p1") {
            if (this.value == "") {
                f = true;
                return false
            }
        }
    });
    var b;
    if (a.selectcomId) {
        b = $("#" + a.selectcomId + " select[name=" + a.selectboxNm + "]")
    } else {
        b = $("select[name=" + a.selectboxNm + "]")
    }
    var e = b.attr("val");
    if (!a.firstOption) {
        var d = (b.attr("multi") == "true") ? true : false;
        var c = (b.attr("group") == "true") ? true : false;
        if (d || c) {
            a.firstOption = {code: "", codeNm: ""}
        }
    }
    if (f) {
        b.loadSelect([], a.firstOption, e);
        b.change();
        return
    }
    a = ajaxCheckOptions(a);
    $.ajax({
        url: a.url, type: "post", dataType: "json", data: a.params, async: a.async, success: function (h, g, i) {
            b.loadSelect(h, a.firstOption, e);
            b.change()
        }, complete: function (h, i) {
            var j = null;
            try {

               // console.log(h.responseText);

                j = getJsonData(h.responseText)

                // console.log(j);

            } catch (g) {

                // console.log(g);

            }
            if ($.isFunction(a.callback)) {
                a.callback(i, j)
            }
        }
    })
}

function submitDynamicForm(d, a, e, c, b) {
    var g = $("form[id=" + d + "]");
    if (g.length == 0) {
        if (b == undefined) {
            b = null
        }
        g = $(document.createElement("form")).attr("id", d).attr("name", d).attr("action", a).attr("method", e).attr("target", b).hide();
        $("body").append(g)
    } else {
        g.attr("action", a).attr("method", e)
    }
    g.empty();
    if ($.isArray(c)) {
        $.each(c, function () {
            $("<input>").attr({type: "hidden", name: this.name, value: this.value}).appendTo(g)
        })
    } else {
        if (!$.isEmptyObject(c) && c.constructor == Object) {
            for (var f in c) {
                $("<input>").attr({type: "hidden", name: f, value: c[f]}).appendTo(g)
            }
        }
    }
    g.submit()
}

function downloadExcel(d, c) {
    var b = getMasterParams(d);
    if (c != undefined) {
        for (var a in c) {
            b.push({name: a, value: c[a]})
        }
    }
    submitDynamicForm("_downloadExcelForm", contextPath + "/common/workbookExcelDownload.do", "post", b)
}

function downloadGridExcel(a, e) {
    var c = a.replace(/#/gi, "");
    var d = $("#" + c).getGridParam("searchParams");
    var b = new Array();
    if (d != undefined) {
        $.each(d, function () {
            b.push({name: this.name, value: this.value})
        })
    }
    if (e != undefined) {
        $.each(e, function (f, g) {
            b.push({name: f, value: g})
        })
    }
    submitDynamicForm("_downloadExcelForm", contextPath + "/common/workbookExcelDownload.do", "post", b)
}

function getFileSizeUnit(g) {
    var d = parseInt(g);
    var f = "bytes";
    var b = [[1024 * 1024 * 1024, "GB"], [1024 * 1024, "MB"], [1024, "KB"], [1, "bytes"]];
    for (var c = 0; c < b.length; c++) {
        var a = b[c][0];
        var e = b[c][1];
        if (d >= a) {
            d = d / a;
            d = Math.ceil(d * 10) / 10;
            f = e;
            break
        }
    }
    return d + "" + f
}

function _validDate(a) {
    var c;
    if (a === undefined || $.isArray(a) == false || a.length < 3) {
        return c
    }
    if (a[0] > 9999 || a[0] < 0) {
        c = $.uimsg.valid.date002
    } else {
        if (a[1] > 12 || a[1] < 1) {
            c = $.uimsg.valid.date003
        } else {
            if (a[1] != 2) {
                if (a[1] == 4 || a[1] == 6 || a[1] == 9 || a[1] == 11) {
                    if (a[2] > 30 || a[2] < 1) {
                        c = createMessage($.uimsg.valid.date004, a[0], a[1], "30")
                    }
                } else {
                    if (a[1] == 1 || a[1] == 3 || a[1] == 5 || a[1] == 7 || a[1] == 8 || a[1] == 10 || a[1] == 12) {
                        if (a[2] > 31 || a[2] < 1) {
                            c = createMessage($.uimsg.valid.date004, a[0], a[1], "31")
                        }
                    }
                }
            } else {
                var b;
                if ((a[0] % 400 == 0) || ((a[0] % 4 == 0) && (a[0] % 100 != 0))) {
                    b = 29
                } else {
                    b = 28
                }
                if (a[2] > b) {
                    c = createMessage($.uimsg.valid.date004, a[0], a[1], b)
                }
            }
        }
    }
    return c
}

function validDate(b) {
    var c;
    var a = b.split(DATE_SEP);
    if (a[0] == null || a[1] == null || a[2] == null) {
        c = $.uimsg.valid.date001
    } else {
        c = _validDate(a)
    }
    return c
}

function validDateHm(c) {
    var d;
    var b = c.split(" ");
    if (b.length < 2) {
        b.push("")
    }
    var e = b[0].split(DATE_SEP);
    var a = b[1].split(TIME_SEP);
    if (e[0] == null || e[1] == null || e[2] == null || a[0] == null || a[1] == null) {
        d = $.uimsg.valid.date005
    } else {
        d = _validDate(e);
        if (a[0] > 23 || a[0] < 0 || a[1] > 59 || a[1] < 0) {
            d = d == undefined ? $.uimsg.valid.date006 : $.uimsg.valid.date005
        }
    }
    return d
}

function validDateHms(d) {
    var c;
    var b = d.split(" ");
    if (b.length < 2) {
        b.push("")
    }
    var e = b[0].split(DATE_SEP);
    var a = b[1].split(TIME_SEP);
    if (e[0] == null || e[1] == null || e[2] == null || a[0] == null || a[1] == null || a[2] == null) {
        c = $.uimsg.valid.date007
    } else {
        c = _validDate(e);
        if (a[0] > 23 || a[0] < 0 || a[1] > 59 || a[1] < 0 || a[2] > 59 || a[2] < 0) {
            c = c == undefined ? $.uimsg.valid.date008 : $.uimsg.valid.date007
        }
    }
    return c
}

function debugProperties(a) {
    var b = "";
    if ($.isArray(a)) {
        b = "Array:";
        var d = 0;
        $.each(a, function (e) {
            if (e > 0) {
                b += ","
            }
            b += debugObject(a[e]);
            ++e
        })
    } else {
        if (typeof (a) === "object") {
            b = "Object:";
            var d = 0;
            for (var c in a) {
                if (a.hasOwnProperty(c)) {
                    if (d > 0) {
                        b += ","
                    }
                    b += "name:" + c + ", value:" + a[c];
                    ++d
                }
            }
        }
    }
    if (b != "") {
        alert(b)
    }
}

function debugObject(a) {
    var b = "";
    if (typeof (a) === "object") {
        var d = 0;
        for (var c in a) {
            if (a.hasOwnProperty(c)) {
                if (d > 0) {
                    b += ","
                }
                b += c + "=" + a[c];
                ++d
            }
        }
    } else {
        b = a
    }
    return b
}

function callAjax(e, c, a, b) {
    var f = new Array();
    if (c != undefined) {
        f = getMasterParams(c)
    }
    if (a != undefined) {
        for (var d in a) {
            f.push({name: d, value: a[d]})
        }
    }
    $.ajax({
        url: e, type: "post", dataType: "json", data: f, async: true, success: function (h, g, i) {
        }, error: function (i, g, h) {
        }, complete: function (h, g) {
            showServerMessage(h);
            if ($.isFunction(b)) {
                b(h.responseText, g)
            }
        }
    })
};

(function ($) {
    window.size = function () {
        var w = 0;
        var h = 0;
        if (!window.innerWidth) {
            if (!(document.documentElement.clientWidth == 0)) {
                w = document.documentElement.clientWidth;
                h = document.documentElement.clientHeight
            } else {
                w = document.body.clientWidth;
                h = document.body.clientHeight
            }
        } else {
            w = window.innerWidth;
            h = window.innerHeight
        }
        return {width: w, height: h}
    };
    window.center = function () {
        var hWnd = (arguments[0] != null) ? arguments[0] : {width: 0, height: 0};
        var _x = 0;
        var _y = 0;
        var offsetX = 0;
        var offsetY = 0;
        if (!window.pageYOffset) {
            if (!(document.documentElement.scrollTop == 0)) {
                offsetY = document.documentElement.scrollTop;
                offsetX = document.documentElement.scrollLeft
            } else {
                offsetY = document.body.scrollTop;
                offsetX = document.body.scrollLeft
            }
        } else {
            offsetX = window.pageXOffset;
            offsetY = window.pageYOffset
        }
        _x = ((this.size().width - hWnd.width) / 2) + offsetX;
        _y = ((this.size().height - hWnd.height) / 2) + offsetY;
        return {x: _x, y: _y}
    };
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    };
    String.prototype.ltrim = function () {
        return this.replace(/^\s+/, "")
    };
    String.prototype.rtrim = function () {
        return this.replace(/\s+$/, "")
    };
    Array.prototype.max = function () {
        return Math.max.apply(null, this)
    };
    Array.prototype.min = function () {
        return Math.min.apply(null, this)
    };
    Array.prototype.getObjValue = function (key) {
        var val = null;
        $.each(this, function () {
            if (key == this.name) {
                val = this.value;
                return false
            }
        });
        return val
    };
    Array.prototype.getObjIndex = function (key, value) {
        var idx = -1;
        $.each(this, function (i) {
            if (this[key] == value) {
                idx = i;
                return false
            }
        });
        return idx
    };
    Array.prototype.unique = function () {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            if (typeof obj[this[i]] == "undefined") {
                obj[this[i]] = 1
            }
        }
        this.length = 0;
        for (var i in obj) {
            this[this.length] = i
        }
        return this
    };
    $.xhrPool = [];
    $.ajaxOptions = {blockUI: false, xhrPool: false};
    $.fn.resetForm = function () {
        $(":input:not([type=button])", this).each(function () {
            switch (this.type) {
                case"radio":
                    this.checked = false;
                    break;
                case"checkbox":
                    this.checked = false;
                    break;
                case"select-one":
                case"select-multiple":
                    if ($(this).attr("mode") == "layer") {
                        $(this).multiselectData("")
                    }
                    break;
                default:
                    $(this).val("");
                    break
            }
        })
    };
    $.fn.dataToForm = function (data, isAll) {
        var obj = data;
        if (typeof obj != "object") {
            alert("Data is not an object type.");
            return
        }
        for (var i in obj) {
            var $el = $("[name=" + i + "]", this);
            if ($el.is("input:checkbox")) {
                var arrVal = [];
                if (obj[i]) {
                    arrVal = obj[i].split(",")
                }
                $el.each(function () {
                    if ($.inArray(this.value, arrVal) != -1) {
                        $(this)["attr"]("checked", true)
                    } else {
                        $(this)["attr"]("checked", false)
                    }
                })
            } else {
                if ($el.is("input:radio")) {
                    var isIE7 = false;
                    if ($.browser.msie) {
                        if ($.browser.version == 7) {
                            isIE7 = true
                        }
                    }
                    $el.each(function () {
                        if ($(this).val() == obj[i]) {
                            if (isIE7) {
                                this.checked = true
                            } else {
                                $(this)["attr"]("checked", true)
                            }
                        } else {
                            if (isIE7) {
                                this.checked = false
                            } else {
                                $(this)["attr"]("checked", false)
                            }
                        }
                    })
                } else {
                    if ($el.is("select") && $el.attr("mode") == "layer") {
                        $el.multiselectData(obj[i])
                    } else {
                        $el.val(obj[i]);
                        var edittype = $el.attr("edittype");
                        if (edittype) {
                            if (edittype.indexOf("time") != -1 || edittype.indexOf("date") != -1) {
                                $el.val($.datetime.toFormatDate(edittype, $el.val()));
                                $el.trigger("blur.mask")
                            } else {
                                if (edittype == "number" || edittype == "integer" || edittype == "decimal" || edittype == "currency") {
                                    $el.blur()
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    $.fn.readonlyObj = function (is) {
        return this.each(function () {
            var $t = $(this);
            var edittype = $t.attr("edittype");
            if (is) {
                if (this.tagName == "INPUT" || this.tagName == "TEXTAREA") {
                    if (edittype && (edittype.indexOf("time") != -1 || edittype.indexOf("date") != -1)) {
                        if ($.datepicker.disable === true) {
                            $t.parent().datetimepicker("disable")
                        } else {
                            $t.datepicker("disable")
                        }
                    } else {
                        $t.addClass("inp_read");
                        $t.attr("readonly", true)
                    }
                }
            } else {
                if (this.tagName == "INPUT" || this.tagName == "TEXTAREA") {
                    if (edittype && (edittype.indexOf("time") != -1 || edittype.indexOf("date") != -1)) {
                        if ($.datepicker.disable === true) {
                            $t.parent().datetimepicker("enable")
                        } else {
                            $t.datepicker("enable")
                        }
                    } else {
                        $t.removeClass("inp_read");
                        $t.attr("readonly", false)
                    }
                }
            }
        })
    };
    $.fn.disableObj = function (is) {
        return this.each(function () {
            var $t = $(this);
            var edittype = $t.attr("edittype");
            if (is) {
                if (this.tagName == "SPAN" && this.id.indexOf("btn") != -1) {
                    if ($t.hasClass("btn_basic")) {
                        $t.addClass("btn_none")
                    }
                    if ($t.hasClass("btn_basic2")) {
                        $t.addClass("btn_none2")
                    }
                    if ($t.data("events").click) {
                        $t.data("events").click_bak = $t.data("events").click[0];
                        $t.unbind("click")
                    }
                } else {
                    if (this.tagName == "INPUT") {
                        if (edittype && (edittype.indexOf("time") != -1 || edittype.indexOf("date") != -1)) {
                            if ($.datepicker.disable === true) {
                                $t.parent().datetimepicker("disable")
                            } else {
                                $t.datepicker("disable")
                            }
                        } else {
                            $t.attr("disabled", true)
                        }
                    } else {
                        if (this.tagName == "SELECT" && $t.attr("mode") == "layer") {
                            $t.multiselect("disable")
                        } else {
                            $t.attr("disabled", true)
                        }
                    }
                }
            } else {
                if (this.tagName == "SPAN" && this.id.indexOf("btn") != -1) {
                    $t.removeClass("btn_none");
                    $t.removeClass("btn_none2");
                    $t.bind("click", $t.data("events").click_bak);
                    $t.data("events").click_bak = null
                } else {
                    if (this.tagName == "INPUT") {
                        if (edittype && (edittype.indexOf("time") != -1 || edittype.indexOf("date") != -1)) {
                            if ($.datepicker.disable === true) {
                                $t.parent().datetimepicker("enable")
                            } else {
                                $t.datepicker("enable")
                            }
                        } else {
                            $t.attr("disabled", false)
                        }
                    } else {
                        if (this.tagName == "SELECT" && $t.attr("mode") == "layer") {
                            $t.multiselect("enable")
                        } else {
                            $t.attr("disabled", false)
                        }
                    }
                }
            }
        })
    };
    $.fn.outerHTML = function () {
        var el = $(this);
        if (!el[0]) {
            return ""
        }
        if (el[0].outerHTML) {
            return el[0].outerHTML
        } else {
            var content = el.wrap("<p/>").parent().html();
            el.unwrap();
            return content
        }
    };
    $.fn.addOptionSelect = function (option) {
        var $t = this;
        if (option.value == "") {
            $t.find('option[value=""]').each(function () {
                $(this).remove()
            })
        }
        if ($.browser.msie) {
            this.get(0).add(option)
        } else {
            this.get(0).add(option, null)
        }
    };
    $.fn.emptySelect = function () {
        return this.each(function () {
            var $t = this;
            if ($t.tagName == "SELECT") {
                $($t).find("optgroup, option").each(function () {
                    if ($($t).attr("group") == "true") {
                        $(this).remove()
                    } else {
                        if (this.value != "") {
                            $(this).remove()
                        }
                    }
                });
                if ($(this).attr("mode") == "layer") {
                    $(this).multiselect("refresh")
                }
            }
        })
    };
    $.fn.loadSelect = function (optionsDataArray, firstOption, val) {
        return this.emptySelect().each(function () {
            if (this.tagName == "SELECT") {
                var selectElement = this;
                var option = null;
                if (typeof firstOption == "object") {
                    option = new Option(firstOption.codeNm, firstOption.code);
                    $(selectElement).addOptionSelect(option);
                    $(selectElement).multiselect({noneSelectedText: firstOption.codeNm})
                }
                if ($(this).attr("group") == "true") {
                    var preGroupLabel, curGroupLabel;
                    $.each(optionsDataArray, function (index, optionData) {
                        curGroupLabel = (optionData.groupLabel) ? optionData.groupLabel : "";
                        if (curGroupLabel != preGroupLabel) {
                            $(selectElement).append('<optgroup label="' + curGroupLabel + '"/>')
                        }
                        preGroupLabel = curGroupLabel
                    });
                    $(selectElement).find("optgroup").each(function () {
                        var optgroup = this;
                        $.each(optionsDataArray, function (index, optionData) {
                            var checked = false;
                            if (val == optionData.code) {
                                checked = true
                            }
                            if (optgroup.label == ((optionData.groupLabel) ? optionData.groupLabel : "")) {
                                $(optgroup).append('<option value="' + optionData.code + '"' + ((checked) ? " selected" : "") + ">" + optionData.codeNm + "</option>")
                            }
                        })
                    })
                } else {
                    $.each(optionsDataArray, function (index, optionData) {
                        var checked = false;
                        if (val == optionData.code) {
                            checked = true
                        }
                        $(selectElement).append('<option value="' + optionData.code + '"' + ((checked) ? " selected" : "") + ">" + optionData.codeNm + "</option>")
                    })
                }
                if ($(this).attr("mode") == "layer") {
                    $(this).multiselect("refresh")
                }
            }
        })
    };
    $.fn.setMultiSelect = function () {
        var $t = this;
        if ($t.multiselect("option").multiple !== undefined) {
            return
        }
        var noneText = $('option[value=""]', $t).html();
        if (!noneText) {
            noneText = ""
        }
        var options = {
            showUp: eval($t.attr("showUp")),
            header: eval($t.attr("header")),
            multiple: eval($t.attr("multi")),
            minWidth: $t.attr("width"),
            height: eval($t.attr("height")),
            selectedList: eval($t.attr("view")),
            groupLabel: eval($t.attr("groupLabel")),
            noneSelectedText: noneText
        };
        if (Number($t.attr("max")) > 0) {
            options.header = false;
            options.maxCheck = Number($t.attr("max"))
        }
        $t.multiselect(options);
        if (eval($t.attr("filter"))) {
            $t.multiselectfilter()
        }
        if ($t.attr("disabled")) {
            $t.multiselect("disable")
        }
        $t.multiselectData($t.attr("val"))
    };
    $.fn.multiselectData = function (value) {
        var $t = this;
        if (value != undefined) {
            var values = String(value).split(",");
            if ($t.attr("multi") == "true") {
                $t.val(null);
                $t.multiselect("refresh");
                $.each(values, function (i, val) {
                    $t.multiselect("widget").find("input[value=" + val + "]:checkbox").each(function () {
                        if (this.value == val) {
                            this.click()
                        }
                    })
                })
            } else {
                var val = values[0];
                if (val == "" || val == null) {
                    var fo = $(this).find("option").get(0);
                    if (fo) {
                        val = fo.value
                    } else {
                        val = ""
                    }
                }
                $(this).val(val);
                $(this).multiselect("refresh")
            }
        } else {
            var val = "";
            $t.multiselect("getChecked").map(function () {
                val += ((val == "") ? "" : ",") + this.value
            });
            return val
        }
    };
    $.fn.multiselectText = function () {
        var val = "";
        $(this).multiselect("widget").find("ul input:checked").each(function () {
            val += ((val == "") ? "" : ",") + $(this).parent().find("span").text()
        });
        return val
    };
    $.fn.multiselectGroupData = function (label) {
        var val = "";
        var $t = this;
        var data = $t.multiselectData();
        $t.find("optgroup[label=" + label + "] option").each(function () {
            var option = this;
            $t.multiselect("getChecked").each(function () {
                if (this.value == option.value) {
                    val += ((val == "") ? "" : ",") + this.value
                }
            })
        });
        return val
    };
    $.fn.multiselectGroupLabel = function (val) {
        var isEqual;
        var groupLabel;
        $("optgroup", this).each(function () {
            groupLabel = this.label;
            $("option", this).each(function () {
                if (this.value == val) {
                    isEqual = true;
                    return false
                }
            });
            if (isEqual) {
                return false
            }
        });
        return groupLabel
    };
    $.fn.multiselectShow = function () {
        $(this).next("button").show()
    };
    $.fn.multiselectHide = function () {
        $(this).next("button").hide()
    };
    $.extend($.datepicker, {
        _gotoToday: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target);
            this._selectDate(id)
        }, _doKeyDown: function (event) {
        }
    });


  //  $.datepicker._base_gotoToday = $.datepicker._gotoToday();
    $.datepicker._base_gotoToday = $.datepicker._gotoToday;


    $.datepicker._gotoToday = function (id) {
        this._base_gotoToday(id);
        this._setTime(this._getInst($(id)[0]), new Date())
    };
    $.fn.setDatePicker = function () {
        var $t = this;

        var zIndex = 9999999;
        var edittype = $t.attr("edittype");
        var readonly = $t.attr("readonly");
        var disabled = $t.attr("disabled");
        var required = $t.attr("require");
        var cssClass = $t.attr("class");
        var showBtn = $t.attr("showBtn");
        var mask, dateformat, timeformat, styleClass = "iText";
        var showOn = (showBtn == "false") ? "focus" : "button";
        var showAnim = "slideDown";
        var duration = "fast";
        var isMinute = true;
        var isSecond = true;
        var timeOnly = false;
        var showTime = false;
        var showPicker = false;
        if (edittype == "time") {
            mask = "29:59:59";
            timeformat = "hh:mm:ss";
            timeOnly = true;
            showTime = true;
            showPicker = false;
            styleClass += " time_01"
        } else {
            if (edittype == "time_hm") {
                mask = "29:59";
                timeformat = "hh:mm";
                isSecond = false;
                timeOnly = true;
                showTime = true;
                showPicker = false;
                styleClass += " time_02"
            } else {
                if (edittype == "time_ms") {
                    mask = "59:59";
                    timeformat = "mm:ss";
                    timeOnly = true;
                    showTime = true;
                    showPicker = false;
                    styleClass += " time_02"
                } else {
                    if (edittype == "date_y") {
                        mask = "9999";
                        dateformat = "yy";
                        styleClass += " date_01"
                    } else {
                        if (edittype == "date_m") {
                            mask = "19";
                            dateformat = "mm";
                            styleClass += " date_01"
                        } else {
                            if (edittype == "date_d") {
                                mask = "39";
                                dateformat = "dd";
                                styleClass += " date_01"
                            } else {
                                if (edittype == "date_ym") {
                                    mask = "9999" + DATE_SEP + "19";
                                    dateformat = "yy" + DATE_SEP + "mm";
                                    styleClass += " date_01"
                                } else {
                                    if (edittype == "date_md") {
                                        mask = "19" + DATE_SEP + "39";
                                        dateformat = "mm" + DATE_SEP + "dd";
                                        styleClass += " date_01"
                                    } else {
                                        if (edittype == "date_h" || edittype == "date.h" || edittype == "date_yy_h") {
                                            mask = (edittype == "date.h") ? "9999" + DATE_SEP + "19" + DATE_SEP + "39.29" : "9999" + DATE_SEP + "19" + DATE_SEP + "39 29";
                                            dateformat = "yy" + DATE_SEP + "mm" + DATE_SEP + "dd";
                                            timeformat = "hh";
                                            isMinute = false;
                                            isSecond = false;
                                            showTime = true;
                                            showPicker = true;
                                            styleClass += " date_02"
                                        } else {
                                            if (edittype == "date_hm" || edittype == "date.hm" || edittype == "date_yy_hm") {
                                                mask = (edittype == "date.hm") ? "9999" + DATE_SEP + "19" + DATE_SEP + "39" + DATE_SEP + "29:59" : "9999" + DATE_SEP + "19" + DATE_SEP + "39 29:59";
                                                dateformat = "yy" + DATE_SEP + "mm" + DATE_SEP + "dd";
                                                timeformat = "hh:mm";
                                                isSecond = false;
                                                showTime = true;
                                                showPicker = true;
                                                styleClass += " date_03"
                                            } else {
                                                if (edittype == "date_hms" || edittype == "date.hms" || edittype == "date_yy_hms") {
                                                    mask = (edittype == "date.hms") ? "9999" + DATE_SEP + "19" + DATE_SEP + "39" + DATE_SEP + "29:59:59" : "9999" + DATE_SEP + "19" + DATE_SEP + "39 29:59:59";
                                                    dateformat = "yy" + DATE_SEP + "mm" + DATE_SEP + "dd";
                                                    timeformat = "hh:mm:ss";
                                                    showTime = true;
                                                    showPicker = true;
                                                    styleClass += " date_04"
                                                } else {
                                                    if (edittype == "date_yy") {
                                                        mask = "9999" + DATE_SEP + "19" + DATE_SEP + "39";
                                                        dateformat = "yy" + DATE_SEP + "mm" + DATE_SEP + "dd";
                                                        showTime = false;
                                                        showPicker = true;
                                                        styleClass += " date_01"
                                                    } else {
                                                        mask = "9999" + DATE_SEP + "19" + DATE_SEP + "39";
                                                        dateformat = "yy" + DATE_SEP + "mm" + DATE_SEP + "dd";
                                                        showTime = false;
                                                        showPicker = true;
                                                        styleClass += " date_01"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (disabled) {
            showPicker = false
        }
        if (readonly) {
            showPicker = false;
            styleClass += " inp_read"
        }
        if (required == "true") {
            styleClass += " inp_reqr required"
        }
        if (isGridField) {
            $t.css("text-align", "center")
        } else {
            if ($t.hasClass("inp_none")) {
                showPicker = false;
                $t.removeClass();
                $t.addClass("iText inp_none")
            } else {
                $t.removeClass();
                $t.addClass(styleClass + " " + cssClass)
            }
        }
        if (showPicker) {
            if (showTime) {
                var stepHour = parseInt($t.attr("stepHour"));
                if (!stepHour) {
                    stepHour = 1
                }
                var stepMinute = parseInt($t.attr("stepMinute"));
                if (!stepMinute) {
                    stepMinute = 1
                }
                var stepSecond = parseInt($t.attr("stepSecond"));
                if (!stepSecond) {
                    stepSecond = 1
                }
                $t.timepicker({
                    changeYear: true,
                    changeMonth: true,
                    showButtonPanel: true,
                    showMonthAfterYear: false,
                    constrainInput: true,
                    buttonImageOnly: true,
                    showOn: showOn,
                    duration: duration,
                    yearSuffix: "",
                    buttonText: "",
                    buttonImage: CARLENDAR_IMAGE_PATH,
                    dateFormat: dateformat,
                    timeOnly: timeOnly,
                    showTimepicker: showTime,
                    ampm: false,
                    showMinute: isMinute,
                    showSecond: isSecond,
                    timeFormat: timeformat,
                    stepHour: stepHour,
                    stepMinute: stepMinute,
                    stepSecond: stepSecond,
                    beforeShow: function (input, inst) {
                        inst.input.css("zIndex", zIndex)
                    },
                    onClose: function (dateText, inst) {
                        inst.input.css("zIndex", "");
                        // if (isGridField) {
                        //     inst.input.select()
                        // }
                    }
                })
            } else {
                console.log("datepicker");

                $t.datepicker({
                    changeYear: true,
                    changeMonth: true,
                    showButtonPanel: true,
                    showMonthAfterYear: false,
                    constrainInput: true,
                    buttonImageOnly: true,
                    showOn: showOn,
                    duration: duration,
                    yearSuffix: "",
                    buttonText: "",
                    buttonImage: CARLENDAR_IMAGE_PATH,
                    dateFormat: dateformat,
                    beforeShow: function (input, inst) {
                        inst.input.css("zIndex", zIndex)
                    },
                    onClose: function (dateText, inst) {
                        inst.input.css("zIndex", "");
                        // if (isGridField) {
                        //     inst.input.select()
                        // }
                    }
                })
            }
        }
        if (readonly || disabled) {
            $t.parent().find("img").unbind("click").css({
                cursor: "default",
                filter: "progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)"
            })
        }

        console.log(mask);
      //  console.log($t);
      //  console.log($t);
      //  console.log($t);

        console.log($t.mask(mask));
        $t.mask(mask);
       //$t.mask(mask);

      // console.log($t)
        return $t
    };
    $.fui = $.fui || {};
    $.fui.predef = {
        datetime: {
            edittype: {
                time: {
                    css: "time_01",
                    pickDate: false,
                    pickTime: true,
                    pickMins: true,
                    pickSecs: true,
                    showPicker: true,
                    srcFormat: "HHmmss",
                    srcRegEx: /^(\d{6})$/
                },
                time_hm: {
                    css: "time_02",
                    pickDate: false,
                    pickTime: true,
                    pickMins: true,
                    pickSecs: false,
                    showPicker: true,
                    srcFormat: "HHmm",
                    srcRegEx: /^(\d{4})$/
                },
                date_y: {
                    css: "date_01",
                    pickDate: true,
                    pickTime: false,
                    pickMins: false,
                    pickSecs: false,
                    showPicker: true,
                    srcFormat: "YYYY",
                    srcRegEx: /^(\d{4})$/
                },
                date_ym: {
                    css: "date_01",
                    pickDate: true,
                    pickTime: false,
                    pickMins: false,
                    pickSecs: true,
                    showPicker: true,
                    srcFormat: "YYYYMM",
                    srcRegEx: /^(\d{6})$/
                },
                date: {
                    css: "date_01",
                    pickDate: true,
                    pickTime: false,
                    pickMins: false,
                    pickSecs: true,
                    showPicker: true,
                    srcFormat: "YYYYMMDD",
                    srcRegEx: /^(\d{8})$/
                },
                date_h: {
                    css: "date_02",
                    pickDate: true,
                    pickTime: true,
                    pickMins: false,
                    pickSecs: false,
                    showPicker: true,
                    srcFormat: "YYYYMMDDHH",
                    srcRegEx: /^(\d{10})$/
                },
                date_hm: {
                    css: "date_03",
                    pickDate: true,
                    pickTime: true,
                    pickMins: true,
                    pickSecs: false,
                    showPicker: true,
                    srcFormat: "YYYYMMDDHHmm",
                    srcRegEx: /^(\d{12})$/
                },
                date_hms: {
                    css: "date_04",
                    pickDate: true,
                    pickTime: true,
                    pickMins: true,
                    pickSecs: true,
                    showPicker: true,
                    srcFormat: "YYYYMMDDHHmmss",
                    srcRegEx: /^(\d{14})$/
                },
                date_yy: {
                    css: "date_01",
                    pickDate: true,
                    pickTime: false,
                    pickMins: true,
                    pickSecs: true,
                    showPicker: true,
                    srcFormat: "YYYYMMDD",
                    srcRegEx: /^(\d{8})$/
                },
                date_yy_h: {
                    css: "date_02",
                    pickDate: true,
                    pickTime: true,
                    pickMins: false,
                    pickSecs: false,
                    showPicker: true,
                    srcFormat: "YYYYMMDDHH",
                    srcRegEx: /^(\d{10})$/
                },
                date_yy_hm: {
                    css: "date_03",
                    pickDate: true,
                    pickTime: true,
                    pickMins: true,
                    pickSecs: false,
                    showPicker: true,
                    srcFormat: "YYYYMMDDHHmm",
                    srcRegEx: /^(\d{12})$/
                },
                date_yy_hms: {
                    css: "date_04",
                    pickDate: true,
                    pickTime: true,
                    pickMins: true,
                    pickSecs: true,
                    showPicker: true,
                    srcFormat: "YYYYMMDDHHmmss",
                    srcRegEx: /^(\d{14})$/
                }
            }
        }
    };
    $.loadAppLocale = function (locale) {
        var lang = locale || "kr";
        if (!$.fui.uimsg) {
            return alert("Unable to find $.fui.uimsg. Check it in your locale.js")
        }
        if (!$.fui.grid) {
            return alert("Unable to find $.fui.grid. Check it in your locale.js")
        }
        if (!$.fui.datetime) {
            return alert("Unable to find $.fui.datetime. Check it in your locale.js")
        }
        if (!$.fui.uimsg.hasOwnProperty(lang)) {
            return alert("Unable to find the locale [" + lang + "] in $.fui.uimsg")
        }
        if (!$.fui.grid.hasOwnProperty(lang)) {
            return alert("Unable to find the locale [" + lang + "] in $.fui.grid")
        }
        if (!$.fui.datetime.hasOwnProperty(lang)) {
            return alert("Unable to find the locale [" + lang + "] in $.fui.datetime")
        }
        if (!$.fui.number.hasOwnProperty(lang)) {
            return alert("Unable to find the locale [" + lang + "] in $.fui.number")
        }
        $.extend(true, $.jgrid, $.fui.grid[lang]);
        $.uimsg = $.fui.uimsg[lang];
        var selectedLocale = $.extend(true, {}, $.fui.predef.datetime, $.fui.datetime[lang]);
        var assertEdittypeExists = function (edittype) {
            if (!selectedLocale.edittype.hasOwnProperty(edittype)) {
                return alert("Unable to find edittype: " + edittype + " in the locale: " + lang)
            }
        };
        $.datetime = {
            language: lang, dateSeparator: function () {
                return selectedLocale.dateSeparator
            }, timeSeparator: function () {
                return selectedLocale.timeSeparator
            }, edittypeInfo: function (edittype) {
                assertEdittypeExists(edittype);
                return selectedLocale.edittype[edittype]
            }, format: function (edittype) {
                assertEdittypeExists(edittype);
                return selectedLocale.edittype[edittype].format
            }, srcFormat: function (edittype) {
                assertEdittypeExists(edittype);
                return selectedLocale.edittype[edittype].srcFormat
            }, isValidDate: function (edittype, val) {
                assertEdittypeExists(edittype);
                var edittypeInfo = selectedLocale.edittype[edittype];
                var targetFormat = edittypeInfo.format;
                if (edittypeInfo.srcRegEx.test(val)) {
                    targetFormat = edittypeInfo.srcFormat
                }
                return moment(val, targetFormat, true).isValid()
            }, toSrcFormatDate: function (edittype, val) {
                if (!val) {
                    return ""
                }
                assertEdittypeExists(edittype);
                var edittypeInfo = selectedLocale.edittype[edittype];
                var srcFormat = edittypeInfo.srcFormat;
                if (edittypeInfo.srcRegEx.test(val)) {
                    return val
                }
                return moment(val, edittypeInfo.format).format(srcFormat)
            }, toFormatDate: function (edittype, val) {
                if (!val) {
                    return ""
                }
                assertEdittypeExists(edittype);
                var edittypeInfo = selectedLocale.edittype[edittype];
                var format = edittypeInfo.format;
                if (edittypeInfo.regEx.test(val)) {
                    return val
                }
                return moment(val, edittypeInfo.srcFormat).format(format)
            }
        };
        $.extend(true, $.blockUI.defaults, {
            message: '<img src="' + contextPath + '/resources/common-ui/base/images/ac_loading.gif"> ' + $.uimsg.info.processing,
            baseZ: 10000,
            css: {
                width: "150px",
                left: "44%",
                border: "none",
                padding: "15px",
                backgroundColor: "#ccc",
                color: "#000",
                "font-weight": "bold",
                "border-radius": "10px;",
                "-moz-border-radius": "10px",
                "-webkit-border-radius": "10px",
                "-khtml-border-radius": "10px;",
                opacity: 0.5,
                fadeIn: 0,
                fadeOut: 0
            },
            overlayCSS: {opacity: 0.01, backgroundColor: "#fff"}
        });
        $.extend(true, $.numberOptions, $.fui.number[lang])
    };
    $.fn.setDateTimePicker = function (options) {
        options = options || {};
        var $t = this;
        var dtp = $t.attr("dtp");
        if (!$.isNaN(dtp)) {
            return
        }
        var edittype = $t.attr("edittype");
        var readonly = $t.attr("readonly");
        var disabled = $t.attr("disabled");
        var required = $t.attr("require");
        var cssClass = $t.attr("class");
        var collapse = ($t.attr("dtpCollapse") == "true") ? true : false;
        var orientation = ($t.attr("dtpOrientation") == "right") ? "right" : "left";
        var minuteStepping = $t.attr("stepMinute");
        if (minuteStepping == undefined) {
            minuteStepping = $.fn.datetimepicker.defaults.minuteStepping ? $.fn.datetimepicker.defaults.minuteStepping : 5
        } else {
            minuteStepping = parseInt(minuteStepping)
        }
        var edittypeInfo = $.datetime.edittypeInfo(edittype);
        var languege = $.datetime.language;
        var pickDate = edittypeInfo.pickDate;
        var pickTime = edittypeInfo.pickTime;
        var pickMinutes = edittypeInfo.pickMins;
        var pickSeconds = edittypeInfo.pickSecs;
        var pick12HourFormat = false;
        var showPicker = edittypeInfo.showPicker;
        var mask = edittypeInfo.mask;
        var format = edittypeInfo.format;
        var srcFormat = edittypeInfo.srcFormat;
        var viewMode;
        var minViewMode;
        var weekStart;
        var styleClass = edittypeInfo.css;
        if (edittype.indexOf("date_y") != -1 || edittype.indexOf("date_ym") != -1) {
            viewMode:"years";
            minViewMode:"years"
        }
        if (pick12HourFormat) {
            mask += " aa";
            format += " a"
        }
        if (options.useGrid) {
            $t.css("text-align", "center");
            $t.css("ime-mode", "disabled")
        } else {
            if ($t.hasClass("inp_none")) {
                showPicker = false;
                $t.removeClass();
                $t.addClass("iText inp_none")
            } else {
                if (required == "true") {
                    styleClass += " inp_reqr required"
                }
                $t.removeClass();
                $t.addClass(styleClass + " " + cssClass)
            }
        }
        var attrName = $t.attr("name"), dtpId = "dtp_" + attrName,
            arrElement = $("div[id^=" + dtpId + "].input-append.date"), maxId = 0;
        if (arrElement.length > 0) {
            var ids = arrElement.map(function (i, e) {
                return $(e).attr("id").replace(dtpId, "")
            }).get(), maxId = Math.max.apply(Math, ids) + 1;
            dtpId = dtpId + maxId
        }
        if (showPicker && !$("#" + dtpId).data("datetimepicker")) {
            var icon = "icon-calendar";
            if (edittype.indexOf("time") != -1) {
                icon = "icon-time"
            }
            var $div = $t.wrap('<div id="' + dtpId + '" class="input-append date"/>').parent();
            $div.find("input[name=" + attrName + "]").attr("dtp", maxId);
            $div.append('<span class="add-on"><i class="' + icon + '"></i></span>');
            var val = $t.val();
            $t.val($.datetime.toFormatDate(edittype, val));
            $t.mask(mask, {
                completed: function () {
                    if (!this.val() || !$.datetime.isValidDate(edittype, this.val())) {
                        $div.data("datetimepicker").setDate(null);
                        $t.focus()
                    }
                }
            });
            $div.datetimepicker($.extend({
                language: languege,
                format: format,
                collapse: collapse,
                pickDate: pickDate,
                pickTime: pickTime,
                pick12HourFormat: pick12HourFormat,
                pickMinutes: pickMinutes,
                pickSeconds: pickSeconds,
                viewMode: viewMode,
                minViewMode: minViewMode,
                weekStart: weekStart,
                orientation: orientation,
                minuteStepping: minuteStepping,
                edittype: edittype,
                timeSep: $.datetime.timeSeparator(),
                dateSep: $.datetime.dateSeparator(),
                isUTC: false
            }, options));
            if (readonly || disabled) {
                $div.datetimepicker("disable")
            }
            return $div
        } else {
            $t.mask(mask, {
                completed: function () {
                }
            });
            return $t
        }
    };
    $.fn.createAutoComplete = function (options) {
        var $t = this;
        var url = $t.attr("url");
        if (url != undefined) {
            url = contextPath + url
        } else {
            url = contextPath + "/common/ajax/getAutoCompleteData.do"
        }
        var ac = $t.autocomplete(url, {
            sid: $t.attr("sid"),
            width: parseInt($t.attr("wid")),
            view: parseInt($t.attr("view")),
            extraParams: $.extend({
                p1: $t.attr("p1"),
                p2: $t.attr("p2"),
                p3: $t.attr("p3"),
                p4: $t.attr("p4"),
                p5: $t.attr("p5"),
                p6: $t.attr("p6"),
                p7: $t.attr("p7"),
                p8: $t.attr("p8"),
                p9: $t.attr("p9")
            }, options.extraParams),
            minChars: 1,
            multiple: ($t.attr("multi") == "true") ? true : false,
            mustMatch: false,
            matchContains: true,
            autoFill: false,
            dataType: "json",
            parse: function (data) {
                return $.map(data, function (row) {
                    return {data: row, value: row.actxt, result: row.actxt}
                })
            },
            formatItem: function (row, i, max, term) {
                return row.label
            },
            formatResult: function (row) {
                alert("언제호출???");
                return row
            }
        });
        return ac
    };
    $.fn.setAutoComplete = function (options) {
        var $t = this;
        var $wrapper = $t.closest("table[id], div[id]");
        $t.unautocomplete();
        var valClear = ($t.attr("valClear") == "false") ? false : true;
        if (options == undefined) {
            options = {}
        }
        var ac = $t.createAutoComplete(options);
        ac.autoCompleteResult(function (event, data, formatted) {
            if (data) {
                $.each($t.get(0).attributes, function () {
                    if (this["name"].length == 2 && this["name"].indexOf("v") != -1) {
                        if ($t.attr("multi") == "true") {
                        } else {
                            var $input = $wrapper.find("input[name=" + this["value"] + "]:first");
                            var value = data[this["name"]];
                            if (!value) {
                                value = ""
                            }
                            if (!valClear) {
                                var isDup = false;
                                var inputValues = $input.val();
                                var checkValues = ((inputValues) ? inputValues : "").split(",");
                                $.each(checkValues, function (i, val) {
                                    if (val == value) {
                                        isDup = true;
                                        return false
                                    }
                                });
                                if (!isDup) {
                                    var inputVal = $input.val() + (($input.val()) ? "," : "");
                                    $input.val(inputVal + value).change()
                                }
                            } else {
                                $input.val(value).change()
                            }
                        }
                    }
                })
            }
            $t.select()
        }).autoCompleteUnselected(function () {
            if ($t.attr("search_cnt") == 0 || $t.val() == "") {
                $t.val("").change();
                $t.attr("search_cnt", 0);
                if (valClear) {
                    $.each($t.get(0).attributes, function () {
                        if (this["name"].length == 2 && this["name"].indexOf("v") != -1) {
                            $wrapper.find("input[name=" + this["value"] + "]:first").val("").change()
                        }
                    })
                }
            }
        })
    };
    $.fn.setAutoCompleteGrid = function (gridId, acObj) {
        var $t = this;
        $t.unautocomplete();
        var ac = $t.createAutoComplete();
        ac.autoCompleteResult(function (event, data, formatted) {
            if (data) {
                $.each(acObj, function (propKey, propVal) {
                    if (propKey.length == 2 && propKey.indexOf("v") != -1) {
                        if ($t.attr("multi") == "true") {
                        } else {
                            var divId = $t.parent("div:first").attr("id");
                            var rowId = divId.substring(0, divId.indexOf("_"));
                            $("input[id=" + rowId + "_" + propVal + "]").val(data[propKey])
                        }
                    }
                })
            }
        }).autoCompleteUnselected(function () {
            if ($t.attr("search_cnt") == 0 || $t.val() == "") {
                $t.val("");
                $t.attr("search_cnt", 0);
                $.each(acObj, function (propKey, propVal) {
                    if (propKey.length == 2 && propKey.indexOf("v") != -1) {
                        var divId = $t.parent("div:first").attr("id");
                        var rowId = divId.substring(0, divId.indexOf("_"));
                        $("input[id=" + rowId + "_" + propVal + "]").val("")
                    }
                })
            }
        })
    };
    $.fn.modalOpen = function (options) {
        var $t;
        var mw = $(this);
        var mh = $(options.modalHead);
        var mc = $(options.modalCont);
        mc.resetForm();
        if (mw.hasClass("ui-jqdialog") == false) {
            var point = window.center({width: options.width, height: options.height});
            var zIndex = $("body > .ui-widget-overlay:eq(0)").zIndex();
            zIndex = (zIndex == 0) ? 900 : (zIndex + 3);
            mw.addClass("ui-widget ui-widget-content ui-corner-all ui-jqdialog");
            mw.css($.extend({
                top: point.y + "px",
                left: point.x + "px",
                minWidth: "300px",
                maxWidth: "800px",
                width: options.width,
                height: options.height,
                zIndex: zIndex,
                overflow: "auto"
            }, {})).attr({tabIndex: "-1", role: "dialog", "aria-labelledby": "edithdlist", "aria-hidden": "true"});
            mh.addClass("ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix");
            mh.css({cursor: "move"});
            mh.html('<span class="ui-jqdialog-title" style="float: left;">' + mh.html() + '</span><a class="ui-jqdialog-titlebar-close ui-corner-all" href="javascript:void(0)" style="right:3px">    <span class="ui-icon ui-icon-closethick"></span></a>');
            mc.addClass("ui-jqdialog-content ui-widget-content");
            if (options.modalGrid) {
                mc.find(".navButton").html('<a href="javascript:void(0)" id="pData" class="fm-button ui-state-default ui-corner-left ui-state-disabled">    <span class="ui-icon ui-icon-triangle-1-w"></span></a><a href="javascript:void(0)" id="nData" class="fm-button ui-state-default ui-corner-right ui-state-disabled">    <span class="ui-icon ui-icon-triangle-1-e"></span></a>');
                $t = $(options.modalGrid);
                $("#pData").click(function (e) {
                    var ppos = getCurrPos();
                    if (ppos[0] != -1 && ppos[1][ppos[0] - 1]) {
                        $($t).GridToForm(ppos[0] - 1, options.modalCont);
                        $($t).jqGrid("setSelection", ppos[1][ppos[0] - 1]);
                        updateNav(ppos[0] - 1, ppos[1].length - 1)
                    }
                    return false
                });
                $("#nData").click(function (e) {
                    var npos = getCurrPos();
                    npos[0] = parseInt(npos[0], 10);
                    if (npos[0] != -1 && npos[1][npos[0] + 1]) {
                        $($t).GridToForm(npos[0] + 1, options.modalCont);
                        $($t).jqGrid("setSelection", npos[1][npos[0] + 1]);
                        updateNav(npos[0] + 1, npos[1].length - 1)
                    }
                    return false
                })
            }
            mw.draggable({handle: mh});
            if (options.resize) {
                mw.append("<div id='editresize' class='jqResize ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se ui-icon-grip-diagonal-se'></div>");
                mw.resizable({handles: "se, sw", alsoResize: mw})
            }
            var ahr = mh.find("a").hover(function () {
                ahr.addClass("ui-state-hover")
            }, function () {
                ahr.removeClass("ui-state-hover")
            });
            $("a.ui-jqdialog-titlebar-close", mh).click(function (e) {
                var oncm = mw.data("onClose");
                var gboxclose = mw.data("gbox");
                $.jgrid.hideModal(mw, {gb: gboxclose, jqm: options.jqm, onClose: oncm});
                return false
            });
            mw.keydown(function (e) {
            })
        }
        if (options.modalGrid) {
            $t = $(options.modalGrid);

            function updateNav(cr, totr) {
                if (cr === 0 || options.rowCheck == false) {
                    $("#pData").addClass("ui-state-disabled")
                } else {
                    $("#pData").removeClass("ui-state-disabled")
                }
                if (cr == totr || options.rowCheck == false) {
                    $("#nData").addClass("ui-state-disabled")
                } else {
                    $("#nData").removeClass("ui-state-disabled")
                }
            }

            function getCurrPos() {
                var rowsInGrid = $($t).jqGrid("getDataIDs"), selrow = $($t).getGridParam("selrow"),
                    pos = $.inArray(selrow, rowsInGrid);
                return [pos, rowsInGrid]
            }

            var posInit = getCurrPos();
            if (posInit[0] == -1) {
                if (options.rowCheck) {
                    alert($.uimsg.warning.rowSelect);
                    return false
                }
            } else {
                if (options.rowCheck) {
                    $($t).GridToForm(posInit[0], options.modalCont)
                }
                updateNav(posInit[0], posInit[1].length - 1)
            }
        }
        $.jgrid.viewModal(mw, {gbox: "#gbox_", jqm: options.jqm, overlay: 30, modal: options.modal})
    };
    $.fn.modalClose = function () {
        var mw = $(this);
        var oncm = mw.data("onClose");
        var gboxclose = mw.data("gbox");
        $.jgrid.hideModal(mw, {gb: gboxclose, onClose: oncm})
    };
    $.fn.colspan = function (rowIdx, startCol, groupLen) {
        return this.each(function () {
            var curCol = 0;
            $("tr:eq(" + rowIdx + ")", this).each(function (row) {
                $(this).find("td").each(function (col) {
                    var colspan = $(this).attr("colSpan") || 1;
                    colspan = Number(colspan);
                    curCol += colspan;
                    if (curCol == startCol) {
                        $(this).attr("colSpan", groupLen)
                    }
                    if (startCol < curCol && curCol < (startCol + groupLen)) {
                        $(this).remove()
                    }
                })
            })
        })
    };
    $.fn.rowspan = function (colIdx, startRow, groupLen) {
        return this.each(function () {
            var curRow = 0;
            $("tr", this).each(function (row) {
                if ($(this).is(".jqgfirstrow") == true) {
                    return true
                }
                $("td:eq(" + colIdx + ")", this).each(function (col) {
                    var rowspan = $(this).attr("rowspan") || 1;
                    rowspan = Number(rowspan);
                    curRow += rowspan;
                    if (curRow == startRow) {
                        $(this).attr("rowspan", groupLen)
                    }
                    if (startRow < curRow && curRow < (startRow + groupLen)) {
                        $(this).remove()
                    }
                })
            })
        })
    };
    $.fn.serializeObject = function () {
        "use strict";
        var a = {}, b = function (b, c) {
            var d = a[c.name];
            "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
        };
        return $.each(this.serializeArray(), b), a
    };

    $.fn.setElementAttributes = function (o) {
        return this.each(function () {
            var $t = $(this);
            if (typeof o === "object") {
                $.each(o, function (key, value) {
                    $t.attr(key, value)
                })
            }
        })
    };
    $.fn.keyFilter = function (reg_exp) {
        var regExp = new RegExp(reg_exp);
        return this.each(function () {
            $(this).keypress(function (e) {
                if (e.ctrlKey || e.altKey) {
                    return
                }
                var str = "" + String.fromCharCode(e.which);
                if (regExp.source.indexOf("a-zA-Z") != -1) {
                } else {
                    if (regExp.source.indexOf("a-z") != -1) {
                        str = str.toLowerCase()
                    } else {
                        if (regExp.source.indexOf("A-Z") != -1) {
                            str = str.toUpperCase()
                        }
                    }
                }
                if (!str.match(regExp) && e.which != 8 && e.which != 0) {
                    e.preventDefault();
                    return
                }
            });
            $(this).keyup(function (e) {
                if ((e.ctrlKey && e.which == 67) || (!e.ctrlKey && e.which == 17)) {
                    return
                }
                if (e.which == 9 || (!e.shiftKey && e.which == 16) || (!e.ctrlKey && e.which == 17) || 35 <= e.which && e.which <= 40) {
                    return
                }
                var range = [this.value.length, this.value.length];
                if (this.setSelectionRange) {
                    range = (this.readOnly || this.disabled ? range : [this.selectionStart, this.selectionEnd])
                }
                if (regExp.source.indexOf("a-zA-Z") != -1) {
                } else {
                    if (regExp.source.indexOf("a-z") != -1) {
                        this.value = this.value.toLowerCase()
                    } else {
                        if (regExp.source.indexOf("A-Z") != -1) {
                            this.value = this.value.toUpperCase()
                        }
                    }
                }
                if (regExp.source.indexOf("가-힣") == -1) {
                    try {
                        var revExp = regExp.source.replace(/\[/g, "/[^");
                        revExp = revExp.replace(/\]/g, "]/g");
                        this.value = this.value.replace(eval(revExp), "")
                    } catch (_e) {
                    }
                }
                if (this.setSelectionRange) {
                    if ($(this).is(":visible")) {
                        this.setSelectionRange(range[0], range[0])
                    }
                }
            })
        })
    };
    $.numberOptions = {
        number: {type: "number", format: "#,###", negative: false, keepval: false},
        integer: {type: "integer", format: "#,###", negative: true, keepval: false},
        decimal: {type: "decimal", format: "#,###.##", negative: true, keepval: true},
        currency: {type: "currency", format: "#,###", negative: true, keepval: false}
    };
    $.fn.numberFormat = function (o) {
        return this.each(function () {
            var options = {
                type: "number",
                format: "",
                locale: "kr",
                round: true,
                select: false,
                nanForceZero: true,
                isPercentage: false,
                decimalSeparatorAlwaysShown: false,
                isFullLocale: false
            };
            var numberOptions = $.extend(true, {}, $.numberOptions || {});
            if ($.isPlainObject(o)) {
                if (!o.type) {
                    o.type = "number"
                }
                options = $.extend({}, options, numberOptions[o.type] || {});
                options = $.extend({}, options, o || {})
            } else {
                if (!o) {
                    o = "number"
                }
                options = $.extend({}, options, numberOptions[o] || {})
            }
            if (o.fmt) {
                options.format = o.fmt;
                delete options.fmt
            }
            var fmt = $(this).attr("fmt");
            if (fmt) {
                options.format = fmt
            }
            $(this).attr("fmt", options.format);
            if (o.neg) {
                options.negative = o.neg;
                delete options.neg
            }
            var neg = eval($(this).attr("neg"));
            if (neg) {
                options.negative = neg
            }
            $(this).attr("neg", options.negative);
            $(this).unbind("focus").focus(function () {
                var $t = $(this);
                $t.parseNumber(options);
                if (options.select === true) {
                    if ($.browser.msie) {
                        $t.select()
                    } else {
                        setTimeout(function () {
                            $t.select()
                        }, 150)
                    }
                }
            });
            $(this).unbind("blur").blur(function () {
                $(this).formatNumber(options)
            });
            if (options.negative == true) {
                if (options.format.indexOf(".") != -1) {
                    $(this).keyFilter(/^[-]?\d*(\.?\d*)$/g)
                } else {
                    $(this).keyFilter(/^[-]?\d*$/g)
                }
            } else {
                if (options.format.indexOf(".") != -1) {
                    $(this).keyFilter(/^\d*(\.?\d*)$/g)
                } else {
                    $(this).keyFilter(/^\d*$/g)
                }
            }
            $(this).trigger("blur")
        })
    };
    $.extend($.fn, {
        rightClick: function (handler) {
            $(this).each(function () {
                $(this).mousedown(function (e) {
                    var evt = e;
                    $(this).mouseup(function () {
                        $(this).unbind("mouseup");
                        if (evt.button == 2) {
                            handler.call($(this), evt);
                            return false
                        } else {
                            return true
                        }
                    })
                });
                $(this)[0].oncontextmenu = function () {
                    return false
                }
            });
            return $(this)
        }, rightMouseDown: function (handler) {
            $(this).each(function () {
                $(this).mousedown(function (e) {
                    if (e.button == 2) {
                        handler.call($(this), e);
                        return false
                    } else {
                        return true
                    }
                });
                $(this)[0].oncontextmenu = function () {
                    return false
                }
            });
            return $(this)
        }, rightMouseUp: function (handler) {
            $(this).each(function () {
                $(this).mouseup(function (e) {
                    if (e.button == 2) {
                        handler.call($(this), e);
                        return false
                    } else {
                        return true
                    }
                });
                $(this)[0].oncontextmenu = function () {
                    return false
                }
            });
            return $(this)
        }, noContext: function () {
            $(this).each(function () {
                $(this)[0].oncontextmenu = function () {
                    return false
                }
            });
            return $(this)
        }
    });
    $.fn.validate = function (options) {
        $form = this;
        var isValid = true;
        var msgs = new Array();
        if (options) {
            if ($.isFunction(options.validate)) {
                var customMsg = options.validate();
                if ($.isArray(customMsg)) {
                    $.each(customMsg, function (i, n) {
                        if (typeof n == "object") {
                            msgs.push(n)
                        }
                    })
                }
            }
        }
        $.each($form, function () {
            $el = $(this);
            var isMatch = false;
            var val = $el.val();
            var edittype = $el.attr("edittype");
            if ($el.prop("tagName") == "SELECT" && $el.attr("mode") == "layer") {
                val = $el.multiselectData()
            } else {
                if (val && edittype != undefined) {
                    if (edittype == "number") {
                        val = $el.parseNumber({format: $el.attr("fmt")}, false)
                    } else {
                        if (edittype == "integer") {
                            val = $el.parseNumber({format: $el.attr("fmt")}, false)
                        } else {
                            if (edittype == "decimal") {
                                val = $el.parseNumber({format: $el.attr("fmt")}, false)
                            } else {
                                if (edittype == "currency") {
                                    val = $el.parseNumber({format: $el.attr("fmt")}, false)
                                }
                            }
                        }
                    }
                }
            }
            if ($el.attr("require") == "true") {
                if (val == "") {
                    msgs.push({obj: this, msg: this.title + ": " + $.uimsg.valid.require})
                }
            }
            if ($el.attr("maxlength") > 0) {
                var fLength = $el.attr("maxlength");
                var sLength = val.length;
                if (sLength > fLength) {
                    msgs.push({obj: this, msg: this.title + ": " + createMessage($.uimsg.valid.length001, fLength)})
                }
            }
            if ($el.attr("minlength") != undefined) {
                var fLength = $el.attr("minlength");
                var sLength = val.length;
                if (sLength < fLength) {
                    msgs.push({obj: this, msg: this.title + ": " + createMessage($.uimsg.valid.length002, fLength)})
                }
            }
            if ($el.attr("fixlength") != undefined) {
                var fLength = $el.attr("fixlength");
                var sLength = val.length;
                if (sLength != fLength) {
                    msgs.push({obj: this, msg: this.title + ": " + createMessage($.uimsg.valid.length003, fLength)})
                }
            }
            if (edittype != undefined) {
                if (edittype.indexOf("time") != -1 || edittype.indexOf("date") != -1) {
                    if (val && !$.datetime.isValidDate(edittype, val)) {
                        msgs.push({
                            obj: this,
                            msg: this.title + ": " + createMessage($.uimsg.valid.date100, $.datetime.format(edittype))
                        })
                    }
                } else {
                    if (edittype == "number") {
                        val = $el.parseNumber({format: $el.attr("fmt")}, false);
                        isMatch = val.match(/^\d*$/g);
                        if (!isMatch) {
                            msgs.push({obj: this, msg: this.title + ": " + $.uimsg.valid.type001})
                        }
                    } else {
                        if (edittype == "integer") {
                            val = $el.parseNumber({format: $el.attr("fmt")}, false);
                            isMatch = val.match(/^[-]?\d*$/g);
                            if (!isMatch) {
                                msgs.push({obj: this, msg: this.title + ": " + $.uimsg.valid.type002})
                            }
                        } else {
                            if (edittype == "decimal") {
                                val = $el.parseNumber({format: $el.attr("fmt")}, false);
                                isMatch = val.match(/^[-]?\d*(\.?\d*)$/g);
                                if (!isMatch) {
                                    msgs.push({obj: this, msg: this.title + ": " + $.uimsg.valid.type003})
                                }
                            } else {
                                if (edittype == "currency") {
                                    val = $el.parseNumber({format: $el.attr("fmt")}, false);
                                    isMatch = val.match(/^[0-9,.]*$/g);
                                    if (!isMatch) {
                                        msgs.push({obj: this, msg: this.title + ": " + $.uimsg.valid.type004})
                                    }
                                } else {
                                    if (edittype == "korean") {
                                        isMatch = val.match(/^[가-힣\s]*$/g);
                                        if (!isMatch) {
                                            msgs.push({obj: this, msg: this.title + ": " + $.uimsg.valid.type005})
                                        }
                                    } else {
                                        if (edittype == "alpha") {
                                            isMatch = val.match(/^[a-zA-Z]*$/g);
                                            if (!isMatch) {
                                                msgs.push({obj: this, msg: this.title + ": " + $.uimsg.valid.type006})
                                            }
                                        } else {
                                            if (edittype == "alphanum") {
                                                isMatch = val.match(/^[a-zA-Z0-9]*$/g);
                                                if (!isMatch) {
                                                    msgs.push({
                                                        obj: this,
                                                        msg: this.title + ": " + $.uimsg.valid.type007
                                                    })
                                                }
                                            } else {
                                                if (edittype == "loweralpha") {
                                                    isMatch = val.match(/^[a-z]*$/g);
                                                    if (!isMatch) {
                                                        msgs.push({
                                                            obj: this,
                                                            msg: this.title + ": " + $.uimsg.valid.type008
                                                        })
                                                    }
                                                } else {
                                                    if (edittype == "upperalpha") {
                                                        isMatch = val.match(/^[A-Z]*$/g);
                                                        if (!isMatch) {
                                                            msgs.push({
                                                                obj: this,
                                                                msg: this.title + ": " + $.uimsg.valid.type009
                                                            })
                                                        }
                                                    } else {
                                                        if (edittype == "loweralphanum") {
                                                            isMatch = val.match(/^[a-z0-9]*$/g);
                                                            if (!isMatch) {
                                                                msgs.push({
                                                                    obj: this,
                                                                    msg: this.title + ": " + $.uimsg.valid.type010
                                                                })
                                                            }
                                                        } else {
                                                            if (edittype == "upperalphanum") {
                                                                isMatch = val.match(/^[A-Z0-9]*$/g);
                                                                if (!isMatch) {
                                                                    msgs.push({
                                                                        obj: this,
                                                                        msg: this.title + ": " + $.uimsg.valid.type011
                                                                    })
                                                                }
                                                            } else {
                                                                if (edittype == "email") {
                                                                    if (val == "" || val == null || val == undefined) {
                                                                        isMatch = true
                                                                    } else {
                                                                        isMatch = val.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/gi)
                                                                    }
                                                                    if (!isMatch) {
                                                                        msgs.push({
                                                                            obj: this,
                                                                            msg: this.title + ": " + $.uimsg.valid.type012
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        if (msgs.length > 0) {
            var message = "";
            if (typeof msgs == "object") {
                if ($.isArray(msgs)) {
                    $.each(msgs, function () {
                        message += ((message == "") ? "" : "\n") + this.msg
                    })
                } else {
                    message = msgs
                }
            }
            if (message) {
                alert(message);
                var obj = msgs[0].obj;
                var mode = $(obj).attr("mode");
                if (mode == "layer") {
                    $(obj).multiselect("open")
                } else {
                    $(obj).select()
                }
            }
            isValid = false
        }
        return isValid
    }
})(jQuery);
