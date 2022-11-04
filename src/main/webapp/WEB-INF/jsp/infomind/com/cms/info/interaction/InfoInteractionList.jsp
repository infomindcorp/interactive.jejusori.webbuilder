<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="info" uri="http://infomind.com/info" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
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
        document.searchVO.action = "<c:url value='/cms/info/interaction/interactionList.do'/>";
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
            height: 500,
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
            ax5modal.close();
            location.reload();
        });
    }

    /*********************************************************
     * 등록화면 처리 함수
     ******************************************************** */
    function fncShowView(){
        var menuTargetNo = $('#menuTargetNo').val();
        var p = {
            menuTargetNo :menuTargetNo,
        };
        var API_SERVER = "<c:url value='/cms/info/interaction/RegistInteractionView.do' />";
        ax5modal.open({
            theme: "primary",
            height: 500,
            width: 700,
            header: {
                title: '컨텐츠 등록',
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
            ax5modal.close();
            location.reload();
        });
    }

    //이력 페이지
    function fncPageView(projectKey){
        var menuTargetNo = $('#menuTargetNo').val();
    var p = {
        menuTargetNo :menuTargetNo,
        projectKey : projectKey
    };
    var API_SERVER = "<c:url value='/cms/info/interaction/pageList.do' />";
    ax5modal.open({
        theme: "primary",
        height: 500,
        width: 1000,
        header: {
            title: '컨텐츠 이력',
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
        ax5modal.close();

    });
    }

    function fnChangeShowYn(projectKey, showYn){
            Swal.fire({
                title: '공개 여부를 변경하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '네',
                cancelButtonText: '아니요',
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            type: "POST",
                            url: "<c:url value='/cms/info/interaction/updateShowYn.do' />",
                            data: {
                                projectKey: projectKey,
                                showYn: showYn
                            },
                            dataType: 'json',
                            timeout: (1000 * 30),
                            success: function (returnData, status) {
                                if (status == "success") {
                                    Swal.fire({
                                            icon: 'success',
                                            text: '변경되었습니다.'
                                        }
                                    )
                                    location.reload();
                                } else {
                                    alert("ERROR!");
                                }

                            }
                        });
                    }
                })
    }

</script>

<div class="sub subView">
    <nav class="navigation">
        <i class='bx bxs-home'></i>${menuInfo.depthFullname}
    </nav>
    <h2 class="stitle">
        <i class='bx bxs-dashboard' ></i>컨텐츠관리 <spring:message code="title.list" />
    </h2>

    <h3 class="btitle">
        검색

    </h3>

    <form name="searchVO" action="<c:url value='/cms/info/interaction/interactionList.do'/>" method="post" onSubmit="fn_info_search_page(); return false;">

        <!-- 검색영역 -->
        <!-- 검색조건선택 -->
        <div class="white-box">
            <div class="rows">
                <span class="select-outline">
                 <select name="searchCondition" title="<spring:message code="title.searchCondition" />">
                    <option selected value=''><spring:message code="input.select" /></option><!-- 선택하세요 -->
                    <option value="1"  <c:if test="${searchVO.searchCondition == '1'}">selected="selected"</c:if> >컨텐츠키</option><!-- 코드ID -->
                    <option value="2"  <c:if test="${searchVO.searchCondition == '2'}">selected="selected"</c:if> >컨텐츠명</option><!-- 코드ID -->
                 </select>
                </span>


                <input type="text" class="w100" class="main" name="searchKeyword" size="35" title="<spring:message code="title.search" /> <spring:message code="input.input" />"  value='<c:out value="${searchVO.searchKeyword}"/>'  maxlength="155" >
                <button type="submit" class="button" onclick value="<spring:message code="button.inquire" />" title="<spring:message code="title.inquire" /> <spring:message code="input.button" />" ><i class='bx bx-slider-alt'></i><spring:message code="title.inquire" /></button>
                <button type="button" class="button main" onclick="fncShowView()"  title="<spring:message code="button.create" /> <spring:message code="input.button" />"  ><spring:message code="button.create" /></button>
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
                    <th>컨텐츠 키</th>
                    <th>컨텐츠 명</th>
                    <th>정렬순번</th>
                    <th>Tag</th>
                    <th>통계</th>
                    <th>수정</th>
                    <th>공개 여부</th>
                    <th>WebBuilder</th>
                </tr>
                </thead>
                <!-- 목록영역 -->
                <tbody>
                <c:if test="${fn:length(list) == 0}">
                    <tr>
                        <td colspan="8"><spring:message code="common.nodata.msg" /></td>
                    </tr>
                </c:if>
                <c:forEach items="${list}" var="resultInfo" varStatus="status">
                    <tr>
                        <td class="center"><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}"/></td>
                        <td class="center"><c:out value='${resultInfo.projectKey}'/></td>
                        <td class="center"><a href="<c:url value='/site/v/${resultInfo.projectKey}'/>" target='_blank'><c:out value='${resultInfo.projectName}'/></a></td>
                        <td class="center"><c:out value='${resultInfo.orderNumber}'/></td>
                        <td class="center"><c:out value='${resultInfo.tagNm}'/></td>
                        <td class="center">
                            <button type="button" class="button" onclick="location.href='<c:url value='/cms/info/interaction/InteractionStatistics.do?projectKey=${resultInfo.projectKey}'/>'"  title="보기"  >보기</button>
                        </td>
                        <td class="center">
                            <button type="button" class="button" onclick="fncUpdateView('<c:out value="${resultInfo.projectKey}"/>'); return false;"<spring:message code="input.button" />">
                                수정
                            </button>
                        </td>
                        <sec:authorize access="!hasRole('ROLE_ADMIN')">
                        <td class="center">
                            <c:if test="${resultInfo.showYn == 'Y'}">  <button type="button" id="showYn_y" value="N" class="button main" >공개</button></c:if>
                            <c:if test="${resultInfo.showYn == 'N'}">  <button type="button" id="showYn_N" value="Y" class="button" >비공개</button></c:if>
                        </td>
                        </sec:authorize>
                        <sec:authorize access="hasRole('ROLE_ADMIN')">
                        <td class="center">
                            <c:if test="${resultInfo.showYn == 'Y'}">  <button type="button" id="showYn_y" value="N" class="button main" onclick="fnChangeShowYn('<c:out value="${resultInfo.projectKey}"/>',value)">공개</button></c:if>
                            <c:if test="${resultInfo.showYn == 'N'}">  <button type="button" id="showYn_N" value="Y" class="button" onclick="fnChangeShowYn('<c:out value="${resultInfo.projectKey}"/>',value)">비공개</button></c:if>
                        </td>
                        </sec:authorize>
                        <td class="center">
                            <button type="button" class="button main" onclick="window.open('about:blank').location.href='${pageContext.request.contextPath}/interaction/builder/${resultInfo.projectKey}'"/>보기</button>
                            <button type="button" class="button main" onclick="fncPageView('<c:out value="${resultInfo.projectKey}"/>'); return false;"/>이력</button>
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