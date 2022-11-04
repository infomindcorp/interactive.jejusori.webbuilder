<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="info" uri="http://infomind.com/info" %>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="<c:url value="/js/infomind/com/common-ui/billboard/billboard.min.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/js/infomind/com/common-ui/billboard/billboard.min.css"/>">

<div class="sub subView">
    <div class="row">
        <div class="col-md-11">
            <h1> ${contents.projectName} </h1>
        </div>
        <div class="col-md-1">
            <ul class="tool-btns">
                <li>
                    <c:choose>
                        <c:when test="${searchVO.statistics eq 'true'}">
                            <button type="button" onclick="location.href='<c:url value='/cms/info/interaction/InteractionStatisticsList.do'/>'" title="목록">목록</button>
                        </c:when>
                        <c:otherwise>
                            <button type="button" onclick="location.href='<c:url value='/cms/info/interaction/interactionList.do'/>'" title="목록">목록</button>
                        </c:otherwise>
                    </c:choose>
                </li>
            </ul>
        </div>
        <div class="col-md-5">
            <div class="white-box rows" style="height: 378px;">
                <div style="height: 70px; margin-left: 20px; margin-top: 30px">
                    <h2>기본정보</h2>
                </div>
                <div style="height: 70px; margin-left: 20px">
                    <h3>등록자 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${contents.regId}</h3>
                </div>
                <div style="height: 70px; margin-left: 20px">
                    <h3>등록일 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${contents.regDt}</h3>
                </div>
                <div style="height: 70px; margin-left: 20px">
                    <h3>총게시일 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${contents.totalRegDt}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-7">
            <div class="white-box">
                <h3>최근 조회 추이(7일)</h3>
                <div id="days"></div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="white-box">
                <tr>
                    <td class="left">
                        <div class="radio-field">
                            <input type="radio" id="tableButton" name="tab" checked>
                            <label for="tableButton">기간별 통계(표)</label>
                            <input type="radio" id="chartButton" name="tab">
                            <label for="chartButton">기간별 통계(차트)</label>
                            <input type="radio" id="commentButton" name="tab">
                            <label for="commentButton">코멘트</label>
                        </div>
                    </td>
                </tr>
                <div class="rows white-box" id="table">
                    <div style="margin-top: 20px;">
                        시작일 <input type="date" value="${searchVO.strDay}" id="tableStrDay" name="strDay" onchange="searchTableGrid()">
                        종료일 <input type="date" value="${searchVO.endDay}" id="tableEndDay" name="endDay" onchange="searchTableGrid()">
                        <input type="radio" onclick="searchTableGrid('day')" name="selectTable" id="selectTableDay" checked>
                        <label for="selectTableDay"><i class="bx bx-radio-circle-marked"></i>일별</label>
                        <input type="radio" onclick="searchTableGrid('month')" name="selectTable" id="selectTableMonth">
                        <label for="selectTableMonth"><i class="bx bx-radio-circle-marked"></i>월별</label>
                        <div data-ax5grid="first-grid" data-ax5grid-config="{}" style="height: 300px;"></div>
                    </div>
                </div>
                <div class="white-box" id="chart">
                    시작일 <input type="date" value="${searchVO.strDay}" id="strDay" name="strDay" onchange="searchChartGrid()">
                    종료일 <input type="date" value="${searchVO.endDay}" id="endDay" name="endDay" onchange="searchChartGrid()">
                    <input type="radio" onclick="searchChartGrid('day')" name="selectChart" id="selectChartDay" checked>
                    <label for="selectChartDay"><i class="bx bx-radio-circle-marked"></i>일별</label>
                    <input type="radio" onclick="searchChartGrid('month')" name="selectChart" id="selectChartMonth">
                    <label for="selectChartMonth"><i class="bx bx-radio-circle-marked"></i>월별</label>
                    <div id="month"></div>
                </div>
                <div class="white-box" id="comment">
                    <div data-ax5grid="second-grid" data-ax5grid-config="{}" style="height: 300px;"></div>
                </div>
                <input type="hidden" id="projectKey" value="${searchVO.projectKey}">
                <input type="hidden" id="tableYn" value='day'>
                <input type="hidden" id="chartYn" value='day'>
            </div>
        </div>
    </div>
</div>

<script src="<c:url value='/js/infomind/com/moment.js'/>"></script>
<script src="<c:url value='/js/infomind/com/incms.polyfill.js'/>"></script>
<script src="<c:url value='/js/infomind/com/incms.core.js'/>"></script>
<script src="<c:url value="/assets/ax5/ax5core/ax5core.min.js"/>"></script>
<script src="<c:url value="/assets/ax5/ax5ui-grid/ax5grid.min.js"/>"></script>
<script src="<c:url value="/assets/ax5/ax5ui-formatter/ax5formatter.min.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/assets/ax5/ax5ui-grid/ax5grid.css"/>">
<script>
    $ifx.contextPath = '<c:url value="/"/>';
</script>
<script>

    function searchTableGrid(yn){
        if(yn){
            $("#tableYn").val(yn);
        }

        var tableYn = $("#tableYn").val();
        if(tableYn == 'day'){
            searchTableDayGrid();
        }else {
            searchTableMonthGrid();
        }
    }

    function searchChartGrid(yn){

        if(yn){
            $("#chartYn").val(yn);
        }

        var chartYn = $("#chartYn").val();
        if(chartYn == 'day'){
            generateDays();
        }else {
            generateMonth();
        }
    }

    function searchTableDayGrid() {

        if( $("#tableEndDay").val() < $("#tableStrDay").val() ){
            alert("시작일이 종료일보다 늦습니다. 기간을 확인해주세요")
            return;
        }

        var p = {
            strDay: $("#tableStrDay").val(),
            endDay: $("#tableEndDay").val(),
            projectKey: $("#projectKey").val()
        }
        $ifx.ajax('<c:url value='/cms/info/interaction/InteractionTableStatistics.do' />', {
            method: "GET",
            data: p,
            success: function (res) {
                firstGrid.setData(res.list);
            }
        })
    }

    function searchTableMonthGrid() {
        var p = {
            strDay: $("#tableStrDay").val(),
            endDay: $("#tableEndDay").val(),
            projectKey: $("#projectKey").val()
        }
        $ifx.ajax('<c:url value='/cms/info/interaction/InteractionTableMonthStatistics.do' />', {
            method: "GET",
            data: p,
            success: function (res) {
                firstGrid.setData(res.list);
            }
        })
    }

    function searchCommentGrid() {
        var p = {
            projectKey: $("#projectKey").val()
        }
        $ifx.ajax('<c:url value='/cms/info/interaction/InteractionCommentStatistics.do' />', {
            method: "GET",
            data: p,
            success: function (res) {
                secondGrid.setData(res.list);
            }
        })
    }

    var firstGrid = new ax5.ui.grid();
    function genGrid() {
        firstGrid.setConfig({
            showLineNumber : true,
            target: $('[data-ax5grid="first-grid"]'),
            columns: [
                {key: "logDt", label: "일자", align: "center", width: 200},
                {key: "visit", label: "방문", align: "center", width: 200},
                {key: "like", label: "좋아요", align: "center", width: 200},
                {key: "comment", label: "코멘트", align: "center", width: 200}
            ]
        });
    }

    var secondGrid = new ax5.ui.grid();
    function genGrid2() {
        secondGrid.setConfig({
            showLineNumber: true,
            target: $('[data-ax5grid="second-grid"]'),
            columns: [
                {key: "commentsSeq",label: "코멘트 고유 번호", align: "center", width: 200,hidden: true},
                {key: "commentsText", label: "코멘트 ", align: "center", width: 200},
                {key: "commentsDt", label: "등록일시", align: "center", width: 200},
                {key: "showYn", label: "공개여부", align: "center", width: 200, formatter: function (){
                    if( this.value == 'Y'){
                        return '공개'
                    }else {
                        return '비공개'
                    }
                    }},
                {key: "commentsSeq", label: "기능", align: "center", width: 200, formatter: function (){
                    return "<button type='button' class='btn btn-xs btn-default' onclick="+"'updateShowYn("+ this.dindex + ");'> 비공개전환 </button>"+
                           "<button type='button' class='btn btn-xs btn-danger' onclick="+"'updateUseYn("+ this.dindex + ");'> 삭제 </button>";
                }}
                // {key: "useYn", label: "좋아요", align: "center", width: 200},
            ]
        });
    }

    function generateWeek(){

        var data = {
            strDay: $("#strDay").val(),
            endDay: $("#endDay").val(),
            projectKey: $("#projectKey").val()
        };
        $ifx.promise()
            .then(function (ok, fail) {
                $ifx.ajax('<c:url value="/cms/info/interaction/InteractionDaysStatistics.do"/>', {
                    method: 'GET',
                    data: data,
                    success: function (res) {
                        ok(res);

                        var chart = bb.generate({
                            data: {
                                labels: {
                                    format: function (v,id,i,j){
                                        return v;
                                    }
                                },
                                x: "x",
                                columns: [
                                    res.date
                                    ,res.visit
                                    ,res.comment
                                    ,res.like
                                ],
                                types: "line"
                            },
                            axis: {
                                x: {
                                    type: "timeseries",
                                    tick: {
                                        format: "%Y-%m-%d"
                                    }
                                }
                            },
                            bindto: "#days"
                        });
                    }
                })
            })
    }

    function generateDays(){
        var data = {
            strDay: $("#strDay").val(),
            endDay: $("#endDay").val(),
            projectKey: $("#projectKey").val()
        };

        if( $("#endDay").val() < $("#strDay").val() ){
            alert("시작일이 종료일보다 늦습니다. 기간을 확인해주세요")
            return;
        }

        $ifx.promise()
            .then(function (ok) {
                $ifx.ajax('<c:url value="/cms/info/interaction/InteractionDaysStatistics.do"/>', {
                    method: 'GET',
                    data: data,
                    success: function (res) {
                        ok(res);
                        var chart = bb.generate({
                            data: {
                                labels: {
                                    format: function (v,id,i,j){
                                        return v;
                                    }
                                },
                                x: "x",
                                columns: [
                                    res.date
                                    ,res.visit
                                    ,res.comment
                                    ,res.like
                                ],
                                types: "line"
                            },
                            axis: {
                                x: {
                                    type: "timeseries",
                                    tick: {
                                        format: "%Y-%m-%d"
                                    }
                                }
                            },
                            bindto: "#month"
                        });
                    }
                })
            })
    }

    function generateMonth(){
        var data = {
            strDay: $("#strDay").val(),
            endDay: $("#endDay").val(),
            projectKey: $("#projectKey").val()
        };

        if( $("#endDay").val() < $("#strDay").val() ){
            alert("시작일이 종료일보다 늦습니다. 기간을 확인해주세요")
            return;
        }

        $ifx.promise()
            .then(function (ok) {
                $ifx.ajax('<c:url value="/cms/info/interaction/InteractionMonthStatistics.do"/>', {
                    method: 'GET',
                    data: data,
                    success: function (res) {
                        ok(res);
                        var chart = bb.generate({
                            data: {
                                labels: {
                                    format: function (v,id,i,j){
                                        return v;
                                    }
                                },
                                x: "x",
                                columns: [
                                    res.date
                                    ,res.visit
                                    ,res.comment
                                    ,res.like
                                ],
                                types: "line"
                            },
                            axis: {
                                x: {
                                    type: "timeseries",
                                    tick: {
                                        format: "%Y-%m"
                                    }
                                }
                            },
                            bindto: "#month"
                        });
                    }
                })
            })
    }

    function fn_egov_init_date(){

        $("#strDay").datepicker(
            {dateFormat:'yy-mm-dd'
                , showOn: 'button'
                , buttonImage: '<c:url value='/images/egovframework/com/cmm/icon/bu_icon_carlendar.gif'/>'
                , buttonImageOnly: true
                , showMonthAfterYear: true
                , showOtherMonths: true
                , selectOtherMonths: true
                , changeMonth: true // 월선택 select box 표시 (기본은 false)
                , changeYear: true  // 년선택 selectbox 표시 (기본은 false)
                , showButtonPanel: true // 하단 today, done  버튼기능 추가 표시 (기본은 false)
            });


        $("#endDay").datepicker(
            {dateFormat:'yy-mm-dd'
                , showOn: 'button'
                , buttonImage: '<c:url value='/images/egovframework/com/cmm/icon/bu_icon_carlendar.gif'/>'
                , buttonImageOnly: true

                , showMonthAfterYear: true
                , showOtherMonths: true
                , selectOtherMonths: true

                , changeMonth: true // 월선택 select box 표시 (기본은 false)
                , changeYear: true  // 년선택 selectbox 표시 (기본은 false)
                , showButtonPanel: true // 하단 today, done  버튼기능 추가 표시 (기본은 false)
            });
    }

    function createWeekDate(){

        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();

        let ss = ["x"];
        let date;

        for(let i = 0; i < 7; i++){
            date = new Date(year, month, day - i);
            ss.push([date.getFullYear(),date.getMonth()+1,date.getDate()].join('-'))
        }
        return ss;
    }

    $(document.body).ready(function () {

        searchChartGrid('day');
        searchTableGrid('day');
        searchCommentGrid();
        genGrid();
        genGrid2();

        $("#comment").hide();
        $("#chart").hide();

        $("#commentButton").click(function (){
            $("#comment").show();
            $("#chart").hide();
            $("#table").hide();
        })

        $("#chartButton").click(function (){
            $("#chart").show();
            $("#comment").hide();
            $("#table").hide();
        })

        $("#tableButton").click(function (){
            $("#table").show();
            $("#comment").hide();
            $("#chart").hide();
        })

        generateDays();
        generateWeek();

    });

    function updateShowYn(idx){

        if(!confirm('비공개전환 하시겠습니까?')){
            return;
        }

        var commentsSeq = secondGrid.getList()[idx].commentsSeq;
        var showYn = secondGrid.getList()[idx].showYn == "Y" ? "N" : "Y";

        var p = {
            commentsSeq: commentsSeq,
            showYn: showYn
        }
        $ifx.ajax('<c:url value='/cms/info/interaction/updateCommentsShowYn.do' />', {
            method: "GET",
            data: p,
            success: function (res) {
                searchCommentGrid();
            }
        })
    }

    function updateUseYn(idx){

        if(!confirm('삭제 하시겠습니까?')){
            return;
        }

        var commentsSeq = secondGrid.getList()[idx].commentsSeq;
        var p = {
            commentsSeq: commentsSeq,
        }
        $ifx.ajax('<c:url value='/cms/info/interaction/updateCommentsUseYn.do' />', {
            method: "GET",
            data: p,
            success: function (res) {
                searchCommentGrid();
            }
        })
    }

</script>

