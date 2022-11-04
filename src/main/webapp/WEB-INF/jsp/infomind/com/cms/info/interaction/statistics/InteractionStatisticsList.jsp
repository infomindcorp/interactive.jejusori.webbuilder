<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="info" uri="http://infomind.com/info" %>
<c:set var="pageTitle">컨텐츠 통계</c:set>

<script type="text/javascript">

    $(document).ready(function() {
        fn_egov_init();
    });


    /*********************************************************
     * 초기화
     ******************************************************** */
    function fn_egov_init(){
        // 첫 입력란에 포커스..
        document.searchVO.searchKeyword.focus();
    }

    /*********************************************************
     * 페이징 처리 함수
     ******************************************************** */
    function fn_info_select_linkPage(pageNo){
        document.searchVO.pageIndex.value = pageNo;
        document.searchVO.action = "<c:url value='/cms/info/interaction/InteractionStatisticsList.do'/>";
        document.searchVO.submit();
    }
    /*********************************************************
     * 조회 처리 함수
     ******************************************************** */
    function fn_info_search_page(){
        document.searchVO.pageIndex.value = 1;
        document.searchVO.submit();
    }
    /*********************************************************
     * 수정화면 처리 함수
     ******************************************************** */

    <c:if test="${!empty resultMsg}">alert("${resultMsg}");</c:if>
    function fncUpdateView(projectKey){
        var menuTargetNo = $('#menuTargetNo').val();

        var p = {
            menuTargetNo :menuTargetNo,
            projectKey : projectKey
        };
        var API_SERVER = "<c:url value='/cms/info/interaction/UpdateInteractionView.do' />";
        ax5modal.open({
            theme: "primary",
            height: 650,
            width: 700,
            header: {
                title: '컨텐츠 수정',
                btns: {
                    close: {
                        label: '<i class="bx bx-x" aria-hidden="true"></i>', onClick: function () {
                            // modal.close();
                            ax5modal.close();
                        }
                    }
                }
            },
            iframe: {
                method: "get",
                url: API_SERVER,
                param: p
            },
        }, function (d) {

        });
    }


</script>

<div class="sub subView">
    <nav class="navigation">
        <i class='bx bxs-home'></i>${menuInfo.depthFullname}
    </nav>
    <h2 class="stitle">
        <i class='bx bxs-dashboard' ></i>컨텐츠 통계 <spring:message code="title.list" />
    </h2>
    <h3 class="btitle">
        검색
    </h3>
    <form name="searchVO" action="<c:url value='/cms/info/interaction/InteractionStatisticsList.do'/>" method="post" onSubmit="fn_info_search_page(); return false;">
        <!-- 검색영역 -->
        <!-- 검색조건선택 -->
        <div class="white-box">
            <div class="rows">
                시작일 <input type="date" value="${searchVO.strDay}" id="strDay" name="strDay" onchange="generateDays()">
                종료일 <input type="date" value="${searchVO.endDay}" id="endDay" name="endDay" onchange="generateDays()">
                <span class="select-outline">
                 <select name="searchCondition" title="<spring:message code="title.searchCondition" />">
                    <option value="1"  <c:if test="${searchVO.searchCondition == '1'}">selected="selected"</c:if> >컨텐츠명</option><!-- 코드ID -->
                 </select>
                </span>
                <input type="text" class="w100" class="main" name="searchKeyword" size="35" title="<spring:message code="title.search" /> <spring:message code="input.input" />"  value='<c:out value="${searchVO.searchKeyword}"/>'  maxlength="155" >
                <button type="submit" class="button" onclick value="<spring:message code="button.inquire" />" title="<spring:message code="title.inquire" /> <spring:message code="input.button" />" ><i class='bx bx-slider-alt'></i><spring:message code="title.inquire" /></button>
            </div>
        </div>
        <h3 class="btitle">
            <spring:message code="title.list" />
        </h3>

        <div class="rows white-box">
            <table class="basic" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
                <thead>
                <tr>
                    <th>순번</th><!-- 번호 -->
                    <th>컨텐츠 명</th>
                    <th>방문</th>
                    <th>좋아요</th>
                    <th>코멘트</th>
                    <th>상세정보</th>
                </tr>
                </thead>
                <!-- 목록영역 -->
                <tbody>
                <c:if test="${fn:length(list) == 0}">
                    <tr>
                        <td colspan="6"><spring:message code="common.nodata.msg" /></td>
                    </tr>
                </c:if>
                <c:forEach items="${list}" var="resultInfo" varStatus="status">
                    <tr>
                        <td class="center"><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}"/></td>
                        <td class="center"><c:out value='${resultInfo.projectName}'/></td>
                        <td class="center"><c:out value='${resultInfo.visit}'/></td>
                        <td class="center"><c:out value='${resultInfo.like}'/></td>
                        <td class="center"><c:out value='${resultInfo.comment}'/></td>
                        <td class="center">
                            <button type="button" class="button main" onclick="location.href='<c:url value='/cms/info/interaction/InteractionStatistics.do?projectKey=${resultInfo.projectKey}&statistics=true'/>'"  title="보기"  >보기</button>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>

            <!-- paging navigation -->
            <article class="pagenation">
                <ui:pagination paginationInfo="${paginationInfo}" type="cmm" jsFunction="fn_info_select_linkPage"/>
            </article>

        </div>
        <input name="projectKey" type="hidden" value="">
        <input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>">
        <input name="menuTargetNo" id="menuTargetNo" type="hidden" value="${menuInfo.menuTargetNo}">

    </form>
</div>