<%
 /**
  * @Class Name : EgovCcmCmmnDetailCodeDetail.jsp
  * @Description : 공통상세코드 상세조회 화면
  * @Modification Information
  * @
  * @  수정일             수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.02.01   박정규              최초 생성
  *   2017.08.09   이정은              표준프레임워크 v3.7 개선
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
<c:set var="pageTitle"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.title"/></c:set>

<script type="text/javascript">
/* ********************************************************
 * 삭제처리
 ******************************************************** */
 function fn_egov_delete_code(codeId, code){
	if(confirm("<spring:message code="common.delete.msg" />")){	
		// Delete하기 위한 키값을 셋팅
		document.CcmDeCodeForm.codeId.value = codeId;
		document.CcmDeCodeForm.code.value = code;	
		document.CcmDeCodeForm.action = "<c:url value='/sym/ccm/cde/RemoveCcmCmmnDetailCode.do'/>";
		document.CcmDeCodeForm.submit();
	}
 }

function fn_egov_modify_code(codeId, code) {


    document.CcmDeCodeForm.action = "<c:url value='/sym/ccm/cde/UpdateCcmCmmnDetailCodeView.do'/>";
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

	<h2 class="stitle">
		<i class='bx bxs-dashboard' ></i>${pageTitle} <spring:message code="title.detail" />
	</h2>
	<form name="CcmDeCodeForm"  >


        <h3 class="btitle">
            상세 내역
        </h3>

			<div class="rows white-box">

				<table class="landscape" summary="<spring:message code="common.summary.inqire" arguments="${pageTitle}" />">

					<tbody>
					<!-- 코드ID명 -->
					<tr>
						<th style="width: 9%;"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeIdNm" /></th>
						<td class="left"><c:out value="${result.codeIdNm}"/></td>
					</tr>
					<!-- 상세코드 -->
					<tr>
						<th><spring:message code="comSymCcmCde.cmmnDetailCodeVO.code" /></th>
						<td class="left"><c:out value="${result.code}"/></td>
					</tr>
					<!-- 상세코드명 -->
					<tr>
						<th><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeNm" /></th>
						<td class="left"><c:out value="${result.codeNm}"/></td>
					</tr>
					<!-- 상세코드설명 -->
					<tr>
						<th class="vtop"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeDc" /></th>
						<td class="cnt">
							<c:out value="${fn:replace(result.codeDc , crlf , '<br/>')}" escapeXml="false" />
						</td>
					</tr>
					<!-- 사용여부 -->
					<tr>
						<th><spring:message code="comSymCcmCde.cmmnDetailCodeVO.useAt" /></th>
						<td class="left"><c:out value="${result.useAt}"/></td>
					</tr>


					</tbody>

				</table>
			</div>

        <!-- 하단 버튼 -->
        <div class="btn-set right">

            <button type="button" class="button" onClick="fn_egov_modify_code('<c:out value="${result.codeId}"/>','<c:out value="${result.code}"/>'); return false;"  title="<spring:message code="title.update" /> <spring:message code="input.button" />" ><spring:message code="button.update" /></button>
            <button type="button" class="button" onClick="fn_egov_delete_code('<c:out value="${result.codeId}"/>','<c:out value="${result.code}"/>'); return false;" title="<spring:message code="title.delete" /> <spring:message code="input.button" />">삭제</button>

            <button type="button" class="button" onclick="location.href='<c:url value='/sym/ccm/cde/SelectCcmCmmnDetailCodeList.do' />'"  title="<spring:message code="title.list" /> <spring:message code="input.button" />" ><spring:message code="button.list" /></button>
        </div>

		<input name="codeId" type="hidden" value="<c:out value="${result.codeId}" />">
		<input name="code" type="hidden" value="<c:out value="${result.code}" />">

	</form>
</div>

