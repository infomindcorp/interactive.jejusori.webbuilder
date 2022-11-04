<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>

<%@ taglib prefix="info" uri="http://infomind.com/info" %>

<link rel="stylesheet" type="text/css" href="<c:url value='/file/css/uploadfile.css' />">
<!-- javaScript -->
<script src="<c:url value='/js/infomind/com/jquery-3.1.0.min.js'/>" ></script>
<script src="<c:url value='/file/js/jquery.uploadfile.js'/>" ></script>

<script src="<c:url value="/assets/ax5/ax5core/ax5core.min.js"/>"></script>
<script src="<c:url value="/assets/ax5/ax5ui-autocomplete/ax5autocomplete.min.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/assets/ax5/ax5ui-autocomplete/ax5autocomplete.css"/>">

<c:set var="pageTitle">태그 그룹 등록</c:set>
<script type="text/javascript">

    $(document).ready(function() {

        fncShowMessg();

    });


    function updateTagGrp() {
        if (confirm("<spring:message code="common.update.msg" />")) {
            if (!document.resultVO.tagGrpNm.value) {
                alert("태그 그룹명을 입력하여 주시기 바랍니다.");
                document.resultVO.tagGrpNm.focus();
                return false;
            } else {
                var data = {
                    tagGrpId: document.resultVO.tagGrpId.value,
                    tagGrpNm: document.resultVO.tagGrpNm.value,
                    useYn: document.resultVO.useYn.value
                };
                $ifx.promise()
                    .then(function (ok, fail) {
                        $ifx.ajax('<c:url value="/cms/info/interaction/UpdateTagGrp.do"/>', {
                            method: 'GET',
                            data: data,
                            success: function (res) {
                                ok(res);
                                ax5modal.callback();
                            }
                        })
                    })
            }
        }

    }
    /* ********************************************************
    * 서버 처리 후 메세지 화면에 보여주기
    ******************************************************** */
    function fncShowMessg(){
        if("<c:out value='${message}'/>" != ''){
            alert("<c:out value='${message}'/>");
        }
    }


</script>
<div class="sub subView">

    <form:form commandName="resultVO"  name="resultVO" action="${pageContext.request.contextPath}/cms/info/interaction/tag/UpdateTagGroup.do" method="post" onSubmit="fn_update_page(document.forms[0]); return false">
        <div class="rows white-box">
            <!-- 등록폼 -->
            <table class="landscape" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">

                <tbody>
                <tr>
                    <th style="width: 9%;">
                        <label for="tagGrpId">태그 그룹 아이디 <span class="pilsu">*</span></label>
                    </th>
                    <td class="left">
                        <form:input path="tagGrpId" size="50" maxlength="100" name="tagGrpId" readonly="true"/>
                        <div><form:errors path="tagGrpId" cssClass="error" /></div>
                    </td>
                </tr>
                <tr>
                    <th style="width: 9%;">
                        <label for="tagGrpNm">태그 그룹명 <span class="pilsu">*</span></label>
                    </th>
                      <td class="left">
                        <form:input path="tagGrpNm" size="50" maxlength="100" name="tagGrpNm"/>
                        <div><form:errors path="tagGrpNm" cssClass="error" /></div>
                     </td>
                </tr>
                <tr>
                    <th>사용여부 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="useYn" id="useYn_Y" value="Y" checked="checked"/>
                        <label for="useYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="useYn" id="useYn_N" value="N"/>
                        <label for="useYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

        <!-- 하단 버튼 -->
        <div class="btn-set right">
            <button type="button" class="button" onclick="updateTagGrp()">수정</button>
        </div>

        <input name="menuTargetNo" id="menuTargetNo" type="hidden" value="${menuInfo.menuTargetNo}">
        <input name="cmd" type="hidden" value="<c:out value='save'/>">
    </form:form>
</div>