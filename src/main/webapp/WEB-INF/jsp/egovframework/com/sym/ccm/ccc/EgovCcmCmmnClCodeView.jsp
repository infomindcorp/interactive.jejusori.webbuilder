<%
 /**
  * @Class Name : EgovCcmCmmnClCodeDetail.jsp
  * @Description : 공통분류코드 상세조회 화면
  * @Modification Information
  * @
  * @  수정일             수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.02.01   박정규              최초 생성
  *   2017.08.03   이정은              표준프레임워크 v3.7 개선
  *  @author 공통서비스팀 
  *  @since 2009.02.01
  *  @version 1.0
  *  @see
  *  
  */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%pageContext.setAttribute("crlf", "\r\n"); %>
<c:set var="pageTitle"><spring:message code="comSymCcmCcc.cmmnClCodeVO.title"/></c:set>
<!DOCTYPE html>
<html>
<head>
<title>${pageTitle} <spring:message code="title.detail" /></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">


	<!-- css -->
	<%--<link rel="stylesheet" type="text/css" href="<c:url value='/source/css/modal.css' />">--%>
	<link rel="stylesheet" type="text/css" href="<c:url value='/source/css/style.css?ver=20210302' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/assets/tootik/tootik.min.css' />">

	<link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css?ver=20210302' rel='stylesheet'>


	<!-- javaScript -->
	<script src="<c:url value='/source/js/jquery-1.11.3.min.js'/>" ></script>
	<%--<script src="<c:url value='/source/js/common.js'/>" ></script>--%>


	<!-- axui5modal javaScript -->
	<script src="<c:url value="/js/infomind/com/axui5modal.js"/>"></script>


	<script type="text/javascript">



	$(document.body).ready(function () {




		//닫기
		$('#modal-close').click(function () {
			ax5modal.close();
		});


	});



/* ********************************************************
 * 삭제처리
 ******************************************************** */
 function fn_egov_delete_code(clCode){
	if(confirm("<spring:message code="common.delete.msg" />")){	
		// Delete하기 위한 키값을 셋팅
		document.CcmClCodeForm.clCode.value = clCode;	
		document.CcmClCodeForm.action = "<c:url value='/sym/ccm/ccc/RemoveCcmCmmnClCode.do'/>";
		document.CcmClCodeForm.submit();
	}	
}	
</script>
</head>


<body class="pop">
<div id="content">
	<section class="pop-view">






<div class="if-inside">
	<h2 class="stitle">
		<i class='bx bx-windows'></i>${pageTitle} <spring:message code="title.detail" />
	</h2>
	<form name="CcmClCodeForm"  action="<c:url value='/sym/ccm/ccc/UpdateCcmCmmnClCodeView.do'/>" method="post">


		<h3 class="btitle">
			상세 내역
		</h3>

		<div class="rows white-box">

			<table class="landscape" summary="<spring:message code="common.summary.inqire" arguments="${pageTitle}" />">

				<tbody>
				<!-- 분류코드 -->
				<tr>
					<th><spring:message code="comSymCcmCcc.cmmnClCodeVO.clCode" /></th>
					<td class="left"><c:out value="${result.clCode}"/></td>
				</tr>
				<!-- 분류코드명 -->
				<tr>
					<th><spring:message code="comSymCcmCcc.cmmnClCodeVO.clCodeNm" /></th>
					<td class="left"><c:out value="${result.clCodeNm}"/></td>
				</tr>
				<!-- 분류코드설명 -->
				<tr>
					<th class="vtop"><spring:message code="comSymCcmCcc.cmmnClCodeVO.clCodeDc" /></th>
					<td class="cnt">
						<c:out value="${fn:replace(result.clCodeDc , crlf , '<br/>')}" escapeXml="false" />
					</td>
				</tr>
				<!-- 사용여부 -->
				<tr>
					<th><spring:message code="comSymCcmCcc.cmmnClCodeVO.useAt" /></th>
					<td class="left"><c:out value="${result.useAt}"/></td>
				</tr>


				</tbody>
			</table>
		</div>

		<!-- 하단 버튼 -->
		<div class="btn-set right">


			<%--<input type="submit" class="btn" value="<spring:message code="button.update" />" title="<spring:message code="title.update" /> <spring:message code="input.button" />" />--%>
			<%--<a class="btn" href="<c:url value='/sym/ccm/ccc/RemoveCcmCmmnClCode.do?clCode=${result.clCode}' />" onClick="fn_egov_delete_code('<c:out value="${result.clCode}"/>'); return false;" title="<spring:message code="title.delete" /> <spring:message code="input.button" />"><spring:message code="button.delete" /></a>--%>
			<%--<a class="btn" href="<c:url value='/sym/ccm/ccc/SelectCcmCmmnClCodeList.do' />"  title="<spring:message code="title.list" /> <spring:message code="input.button" />"><spring:message code="button.list" /></a>--%>
			<button type="submit" class="button main"  title="<spring:message code="title.update" /> <spring:message code="input.button" />" ><spring:message code="button.update" /></button>
			<button type="button" class="button" onclick="location.href='<c:url value='/sym/ccm/ccc/SelectCcmCmmnClCodeList.do?clCode=${result.clCode}' />'"  title="<spring:message code="title.delete" /> <spring:message code="input.button" />">삭제</button>
			<button type="button" class="button" onclick="location.href='<c:url value='/sym/ccm/ccc/SelectCcmCmmnClCodeList.do' />'"  title="<spring:message code="title.list" /> <spring:message code="input.button" />" ><spring:message code="button.list" /></button>
				<button type="button" class="button sub" id="modal-close"  /> 닫기</button>
		</div>
		<input name="clCode" type="hidden" value="<c:out value="${result.clCode}" />">

	</form>
</div>

<%--&lt;%&ndash;<h3>상세<i class="icon-esc" id="modal-close"></i></h3><br>&ndash;%&gt;--%>
<%--<form name="CcmClCodeForm" action="<c:url value='/sym/ccm/ccc/UpdateCcmCmmnClCodeView.do'/>" method="post">--%>
<%--<div class="wTableFrm">--%>
	<%--<!-- 타이틀 -->--%>
	<%--<h2>${pageTitle} <spring:message code="title.detail" /></h2>--%>

	<%--<!-- 상세조회 -->--%>
	<%--<table class="wTable" summary="<spring:message code="common.summary.inqire" arguments="${pageTitle}" />">--%>
	<%--<caption>${pageTitle} <spring:message code="title.detail" /></caption>--%>
	<%--<colgroup>--%>
		<%--<col style="width: 20%;">--%>
		<%--<col style="width: ;">--%>
	<%--</colgroup>--%>
	<%--<tbody>--%>
		<%--<!-- 분류코드 -->--%>
		<%--<tr>--%>
			<%--<th><spring:message code="comSymCcmCcc.cmmnClCodeVO.clCode" /></th>--%>
			<%--<td class="left"><c:out value="${result.clCode}"/></td>--%>
		<%--</tr>--%>
		<%--<!-- 분류코드명 -->--%>
		<%--<tr>--%>
			<%--<th><spring:message code="comSymCcmCcc.cmmnClCodeVO.clCodeNm" /></th>--%>
			<%--<td class="left"><c:out value="${result.clCodeNm}"/></td>--%>
		<%--</tr>--%>
		<%--<!-- 분류코드설명 -->--%>
		<%--<tr>--%>
			<%--<th class="vtop"><spring:message code="comSymCcmCcc.cmmnClCodeVO.clCodeDc" /></th>--%>
			<%--<td class="cnt">--%>
				<%--<c:out value="${fn:replace(result.clCodeDc , crlf , '<br/>')}" escapeXml="false" />--%>
			<%--</td>--%>
		<%--</tr>--%>
		<%--<!-- 사용여부 -->--%>
		<%--<tr>--%>
			<%--<th><spring:message code="comSymCcmCcc.cmmnClCodeVO.useAt" /></th>--%>
			<%--<td class="left"><c:out value="${result.useAt}"/></td>--%>
		<%--</tr>--%>


	<%--</tbody>--%>
	<%--</table>--%>
	<%--<!-- 하단 버튼 -->--%>
	<%--<div class="btn-set">--%>
		<%--<input type="submit" class="btn" value="<spring:message code="button.update" />" title="<spring:message code="title.update" /> <spring:message code="input.button" />" />--%>
		<%--<a class="btn" href="<c:url value='/sym/ccm/ccc/RemoveCcmCmmnClCode.do?clCode=${result.clCode}' />" onClick="fn_egov_delete_code('<c:out value="${result.clCode}"/>'); return false;" title="<spring:message code="title.delete" /> <spring:message code="input.button" />"><spring:message code="button.delete" /></a>--%>
		<%--<a class="btn" href="<c:url value='/sym/ccm/ccc/SelectCcmCmmnClCodeList.do' />"  title="<spring:message code="title.list" /> <spring:message code="input.button" />"><spring:message code="button.list" /></a>--%>
	<%--</div><div style="clear:both;"></div>--%>

<%--</div>--%>


<%--</form>--%>
	</section>
</div>
</body>
</html>
