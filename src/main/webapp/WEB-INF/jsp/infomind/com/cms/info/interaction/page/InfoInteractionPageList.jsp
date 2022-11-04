<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="info" uri="http://infomind.com/info" %>

<link href="<c:url value='/assets/interaction/vendor/sweetalert2/sweetalert2.min.css'/>" rel="stylesheet" />
<script src="<c:url value='/assets/interaction/vendor/sweetalert2/sweetalert2.all.js' />"></script>
<c:set var="pageTitle">컨텐츠관리</c:set>

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
        document.searchVO.action = "<c:url value='/cms/info/interaction/pageList.do'/>";
        document.searchVO.submit();
    }
    /*********************************************************
     * 조회 처리 함수
     ******************************************************** */
    function fn_info_search_page(){
        document.searchVO.pageIndex.value = 1;
        document.searchVO.submit();
    }


    //반영
    function fn_applyPage(res){

            Swal.fire({
                title: '반영하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네',
                cancelButtonText: '아니요',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    var data = {
                        projectKey:document.searchVO.projectKey.value,
                        pageSno: res
                    }
                    $ifx.promise()
                        .then(function (ok, fail) {
                            $ifx.ajax('<c:url value='/cms/info/interaction/applyPage'/>', {
                                method: "GET",
                                data: data,
                                success: function (res) {
                                    ok(res);
                                    location.reload();
                                }
                            })
                        })
                }
            })

    }


</script>

<div class="sub subView">
    <form name="searchVO" action="<c:url value='/cms/info/interaction/pageList.do'/>" method="post" onSubmit="fn_info_search_page(); return false;">
        <div class="rows white-box">
            <table class="basic" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
                <thead>
                <tr>
                    <th>키</th><!-- 번호 -->
                    <th>사용자</th>
                    <th>등록일자</th>
                    <th>사용여부</th>
                    <th></th>
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
                        <td class="center"><c:out value='${resultInfo.pageSno}'/></td>
                        <td class="center"><c:out value='${resultInfo.regId}'/></td>
                        <td class="center"><c:out value='${resultInfo.regDt}'/></td>
                        <td class="center">
                            <c:choose>
                            <c:when test="${resultInfo.useYn eq 'Y'}">
                               사용
                            </c:when>
                            <c:otherwise>
                             미사용
                            </c:otherwise>
                        </c:choose></td>
                        <td class="center">
                            <button type="button" class="button" onclick="window.open('about:blank').location.href='<info:url value='/site/v/${resultInfo.projectKey}/${resultInfo.pageSno}'/>'"  title="보기"  >미리보기</button>
                            <button type="button" class="button main" title="반영" onclick="fn_applyPage('${resultInfo.pageSno}')">반영</button>
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
        <input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>">
        <input name="projectKey" type="hidden" value="<c:out value='${searchVO.projectKey}'/>" >
        <input name="menuTargetNo" id="menuTargetNo" type="hidden" value="${menuInfo.menuTargetNo}">

    </form>
</div>