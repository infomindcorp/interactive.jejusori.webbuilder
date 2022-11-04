<%
 /**
  * @Class Name : EgovCcmCmmnDetailCodeList.jsp
  * @Description : 공통상세코드 목록 화면
  * @Modification Information
  * @
  * @  수정일             수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.02.01   박정규              최초 생성
  *   2017.08.31   이정은              표준프레임워크 v3.7 개선
  *  @author 공통서비스팀
  *  @since 2009.02.01
  *  @version 1.0
  *  @see
  *
  */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<c:set var="pageTitle"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.title"/></c:set>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/cmm/jqueryui.css' />">
<script src="<c:url value='/js/egovframework/com/cmm/jquery.js' />"></script>
<script src="<c:url value='/js/egovframework/com/cmm/jqueryui.js' />"></script>
<%--<script src="<c:url value="/js/infomind/com/jquery.ext.js"/>"></script>--%>



<script type="text/javascript">
	$(document).ready(function() {


		fn_egov_init();

		$('#deptSelectPopup').click(function (e) {
			e.preventDefault();
			//var page = $(this).attr("href");
			var pagetitle = $(this).attr("title");
			var page = "<c:url value='/sec/drm/EgovDeptSearchListTest.do'/>";
			var $dialog = $('<div></div>')
					.html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
					.dialog({
						autoOpen: false,
						modal: true,
						height: 500,
						width: 520,
						title: pagetitle

					});
			$dialog.dialog('open');
		});


		//코드 select 박스 호출
		<%--ajaxLoadSelect({--%>
			<%--url: '<c:url value='${adminContextPath}/cm/sucode/tag/codeKsList.wp'/>',--%>
			<%--params: [--%>
				<%--{name: 'sid', value: 'sb_selectMultiAdmZoneCode'},--%>
				<%--{name: 'p1', value: 'CHECK'}--%>
			<%--],--%>
			<%--selectboxNm: 'checkCd'--%>
		<%--});--%>


	});
	/*********************************************************
	 * 초기화
	 ******************************************************** */
	function fn_egov_init(){
		// 첫 입력란에 포커스..
		document.CcmDeCodeForm.searchCondition.focus();

	}

	/*********************************************************
	 * 페이징 처리 함수
	 ******************************************************** */
	function fn_egov_select_linkPage(pageNo){
		document.CcmDeCodeForm.pageIndex.value = pageNo;
		document.CcmDeCodeForm.action = "<c:url value='/sym/ccm/cde/SelectCcmCmmnDetailCodeList.do'/>";
		document.CcmDeCodeForm.submit();
	}
	/*********************************************************
	 * 조회 처리 함수
	 ******************************************************** */
	function fn_egov_search_code(){
		document.CcmDeCodeForm.pageIndex.value = 1;
		document.CcmDeCodeForm.submit();
	}
	/* ********************************************************
	 * 상세회면 처리 함수
	 ******************************************************** */
	function fn_egov_inquire_codedetail(codeId, code) {
		// 사이트 키값(siteId) 셋팅.
		document.CcmDeCodeForm.codeId.value = codeId;
		document.CcmDeCodeForm.code.value = code;
		document.CcmDeCodeForm.action = "<c:url value='/sym/ccm/cde/SelectCcmCmmnDetailCodeDetail.do'/>";
		document.CcmDeCodeForm.submit();
	}
</script>


<div class="sub subView">
	<nav class="navigation">
		<ol>
			<li>
				<a href="#">
					<i class='bx bxs-home'></i>Home</a>
			</li>
			<li>
				<a href="#">Dashboard</a>
			</li>
			<li class="active">APP</li>
		</ol>
	</nav>

	<%--<div class="toolarea">--%>
		<%--<button title="도움말"><i class='bx bx-info-circle' ></i>도움말</button>--%>
		<%--<button class="excel" title="엑셀">--%>
			<%--<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"--%>
				 <%--y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">--%>
                            <%--<path id="surface1" class="st0" d="M15.9,4L15.9,4L4.8,6.5L4,6.7v18.7l0.8,0.2l11,2.4h0.1H18v-3h10V7H18V4H15.9z M16,6v20L6,23.8--%>
                                <%--V8.2L16,6z M18,9h8v14h-8v-2h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2v-1h2v-2h-2V9z M21,10v2h4v-2H21z M14.2,11l-2.3,0.3L10.6,14--%>
                                <%--c-0.1,0.4-0.2,0.7-0.3,0.9l0,0c-0.1-0.3-0.1-0.6-0.2-0.8l-0.6-2.3L7.4,12l-0.2,0L9,16l-2,4l2.2,0.2l0.9-2.5c0.1-0.3,0.2-0.6,0.2-0.7--%>
                                <%--l0,0c0.1,0.3,0.1,0.6,0.2,0.7l1.3,2.9l2.4,0.3l-2.7-5L14.2,11z M21,13v2h4v-2H21z M21,16v2h4v-2H21z M21,19v2h4v-2H21z"/>--%>
                            <%--</svg>--%>
			<%--엑셀파일--%>

		<%--</button>--%>
		<%--<button title="다운로드"><i class='bx bxs-download' ></i>다운로드</button>--%>
		<%--<button title="프린트"><i class='bx bxs-printer' ></i>프린트</button>--%>
		<%--<button class="color-gray" title="검색"><i class='bx bx-search' ></i>검색</button>--%>
		<%--<button class="color-main" title="검색"><i class='bx bxs-pencil' ></i>등록</button>--%>
	<%--</div>--%>


	<h2 class="stitle">
		<i class='bx bxs-dashboard' ></i>${pageTitle} <spring:message code="title.list" />
	</h2>

	<h3 class="btitle">
	검색
	</h3>
	<form name="CcmDeCodeForm" action="<c:url value='/sym/ccm/cde/SelectCcmCmmnDetailCodeList.do'/>" method="post" onSubmit="fn_egov_search_code(); return false;">
	<!-- 검색영역 -->
			<!-- 검색조건선택 -->

		<div class="white-box">

			<div class="rows">
			<span class="select-outline">
                             <select name="searchCondition" title="<spring:message code="title.searchCondition" />">
									<option selected value=''><spring:message code="input.select" /></option><!-- 선택하세요 -->
									<option value="1"  <c:if test="${searchVO.searchCondition == '1'}">selected="selected"</c:if> ><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeId" /></option><!-- 코드ID -->
									<option value="2"  <c:if test="${searchVO.searchCondition == '2'}">selected="selected"</c:if> ><spring:message code="comSymCcmCde.cmmnDetailCodeVO.code" /></option><!-- 코드ID -->
									<option value="3"  <c:if test="${searchVO.searchCondition == '3'}">selected="selected"</c:if> ><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeNm" /></option><!-- 코드명 -->
							</select>
			</span>

				<input type="text" class="w100" class="main" name="searchKeyword" size="35" title="<spring:message code="title.search" /> <spring:message code="input.input" />"  value='<c:out value="${searchVO.searchKeyword}"/>'  maxlength="155" >
				<button type="submit" class="button"  value="<spring:message code="button.inquire" />" title="<spring:message code="title.inquire" /> <spring:message code="input.button" />" ><i class='bx bx-slider-alt'></i><spring:message code="title.inquire" /></button>
				<button type="button" class="button main" onclick="location.href='<c:url value='/sym/ccm/cde/RegistCcmCmmnDetailCodeView.do' />'"  title="<spring:message code="button.create" /> <spring:message code="input.button" />"  ><spring:message code="button.create" /></button>

				<input id="deptSelectPopup" type="button" class="button sub" value="<spring:message code="comCopSecDrm.btn.deptSelectPopup" />" title="<spring:message code="comCopSecDrm.btn.deptSelectPopup" /> <spring:message code="input.button" />" /><!-- 부서조회팝업 -->
			</div>

		</div>

		<h3 class="btitle">
			${pageTitle}<spring:message code="title.list" />
		</h3>

		<div class="rows white-box">
			<table  class="basic" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
				<thead>
						<tr>
							<th style="width: 9%;"><spring:message code="table.num" /></th>
							<th style="width: 30%;"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeId" /></th>
							<th style="width: 13%;"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.code" /></th>
							<th style="width: 30%;"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeNm"/></th>
							<th style="width: 13%;"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.useAt" /></th>
						</tr>
				</thead>
				<!-- 목록영역 -->
				<tbody>
					<c:if test="${fn:length(resultList) == 0}">
						<tr>
							<td colspan="5"><spring:message code="common.nodata.msg" /></td>
						</tr>
					</c:if>
					<c:forEach items="${resultList}" var="resultInfo" varStatus="status">
						<tr>
							<td class="center"><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}"/></td>
							<td class="center"><c:out value='${resultInfo.codeId}'/></td>
							<td class="center"><c:out value='${resultInfo.code}'/></td>
							<td class="center"><a href="<c:url value='/sym/ccm/cde/SelectCcmCmmnDetailCodeDetail.do'/>?codeId=${resultInfo.codeId}&amp;code=${resultInfo.code}" onClick="fn_egov_inquire_codedetail('<c:out value="${resultInfo.codeId}"/>','<c:out value="${resultInfo.code}"/>');return false;"><c:out value='${fn:substring(resultInfo.codeNm, 0, 40)}'/></a></td>
							<td class="center"><c:out value='${resultInfo.useAt}'/></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>


	<!-- paging navigation -->


		<%--<article class="pagenation">--%>

			<%--<a href="?pageIndex=1" title="처음으로 이동" class="jump" onclick="linkPage(1);return false; ">처음<i class="bx bx-chevrons-left " aria-hidden="true"></i></a>--%>
			<%--<a href="?pageIndex=1" title="이전 페이지로 이동" class="move" onclick="linkPage(1);return false; ">이전<i class="bx bx-chevron-left " aria-hidden="true"></i></a>--%>
			<%--<strong>1</strong>--%>
			<%--<a href="?pageIndex=2" onclick="linkPage(2);return false; " title="2 페이지로 이동">2</a>--%>
			<%--<a href="?pageIndex=3" onclick="linkPage(3);return false; " title="3 페이지로 이동">3</a>--%>
			<%--<a href="?pageIndex=4" onclick="linkPage(4);return false; " title="4 페이지로 이동">4</a>--%>
			<%--<a href="?pageIndex=5" onclick="linkPage(5);return false; " title="5 페이지로 이동">5</a>--%>
			<%--<a href="?pageIndex=11" title="다음 페이지로 이동" class="move" onclick="linkPage(6);return false; ">다음<i class="bx bx-chevron-right" aria-hidden="true"></i></a>--%>
			<%--<a href="?pageIndex=17" title="마지막 페이지로 이동" class="jump" onclick="linkPage(17);return false; ">마지막<i class="bx bx-chevrons-right" aria-hidden="true"></i></a>--%>


		<%--</article>--%>



	<article class="pagenation">
			<ui:pagination paginationInfo="${paginationInfo}" type="cmm" jsFunction="fn_egov_select_linkPage"/>
		</article>



	<input name="codeId" type="hidden" value="">
	<input name="code" type="hidden" value="">
	<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>">
</form>
</div>