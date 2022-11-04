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

<c:set var="pageTitle">컨텐츠 관리</c:set>
<script type="text/javascript">

    $(document).ready(function() {

        fncShowMessg();

        $("#fileuploader").uploadFile({
            url: "<c:url value="/"/>cms/info/file/upload.do",
            atchFileId:$("#atchFileId").val(),
            viewUrl:"<c:url value='/cms/info/file/ImageView.do' />",
            multiple:true,
            dragDrop:true,
            fileName:"uploadfile",
            maxFileCount:1,
            returnType:"json",
            showPreview:true,
            previewHeight: "100px",
            previewWidth: "100px",
            showDelete: true,
            showDownload:true,
            sequential:true,
            sequentialCount:1,
            onLoad:function(obj) {
                $.ajax({
                    cache: false,
                    url: "<c:url value="/"/>cms/info/file/tempList.do",
                    dataType: "json",
                    data:{atchFileId:$("#atchFileId").val()},
                    success: function(data) {
                        for(var i=0;i<data.length;i++) {
                            obj.createProgress(data[i]);
                        }
                    }
                });
            },
            onSubmit:function(files) {
            },
            onSuccess:function(files,data,xhr,pd) {
                $("#atchFileId").val(data.atchFileId);
            },
            afterUploadAll:function(obj) {
            },
            dynamicFormData: function() {
                var data ={atchFileId:$("#atchFileId").val(),prixFixe:'PAGE_'}
                return data;
            },
            onError: function(files,status,errMsg,pd) {
            },
            deleteCallback: function (data, pd) {
                $.ajax({
                    cache: false,
                    url: "<c:url value="/"/>cms/info/file/delete.do",
                    dataType: "json",
                    data:{atchFileId:data.atchFileId,fileSn:data.fileSn},
                    success: function(data) {
                        pd.statusbar.hide(); //You choice.
                    }
                });
            },
            downloadCallback:function(data,pd) {
                location.href="/cms/info/file/fileDown.do?atchFileId="+data.atchFileId+"&fileSn="+data.fileSn;
            }
        });
        //auto-complete
        $('[data-ax5autocomplete]').ax5autocomplete({
            removeIcon: '<i class="bx bx-x" aria-hidden="true"></i>',
            onSearch: function (callBack) {
                var searchWord = this.searchWord;
                setTimeout(function () {
                    var regExp = new RegExp(searchWord);
                    var myOptions = [];
                    var options;
                    $ifx.ajax('<c:url value='/ajax/autocomplete.do' />', {
                        method: "GET",
                        data:{},
                        success: function (res) {
                            options = res.list;
                            options.forEach(function (n) {
                                if (n.text.match(regExp)) myOptions.push({ value: n.value, text: n.text });
                            });
                            callBack({
                                options: myOptions,
                            });
                        }
                    })
                }, 150);
            },
        });
    });


    /* ********************************************************
    * 서버 처리 후 메세지 화면에 보여주기
    ******************************************************** */
    function fncShowMessg(){
        if("<c:out value='${message}'/>" != ''){
            alert("<c:out value='${message}'/>");
        }
    }

    //컨텐츠 키 중복확인
    function fnCheckKey(projectKey){
        $.ajax({
            type:"POST",
            url:"<c:url value='/cms/info/interaction/tag/ContentsKeyCnfirmAjax.do' />",
            data:{
                projectKey: $("#projectKey").val()
            },
            dataType:'json',
            timeout:(1000*30),
            success:function(returnData, status){
                if(status == "success") {
                    if(returnData.usedCnt == 0 ){
                        alert(returnData.checkId + "는 사용할 수 있는 키 입니다.")
                        $("#checkIdYn").val('Y')
                        console.log( $("#checkIdYn").val())
                    }else{
                        alert("사용할 수 없는 키 입니다.")
                        $("#checkIdYn").val('N')
                        console.log( $("#checkIdYn").val())
                    }
                }else{ alert("ERROR!");}
            }
        });
    }

    function registContents() {
        var ttt = $('[data-ax5autocomplete="autocomplete2"]').ax5autocomplete("getSelectedOption")
        var list=[];
        for(var i=0; i<ttt.length; i++){
            list.push(ttt[i].value)
        }
        list2=list.toString();
        var tagList = $("#tagList").val(JSON.stringify(list2).replace(/"/g,''))
        var checkIdYn = $("#checkIdYn").val()
        if(confirm("<spring:message code="common.regist.msg" />")) {
            if (checkIdYn == 'N') {
                alert("컨텐츠키 중복체크 바랍니다.");
                return false;
            } else
            {
                if (!document.resultVO.projectKey.value) {
                    alert("컨텐츠키을 입력하여 주시기 바랍니다.");
                    document.resultVO.projectKey.focus();
                    return false;
                }
                if (!document.resultVO.projectName.value) {
                    alert("컨텐츠명을 입력하여 주시기 바랍니다.");
                    document.resultVO.projectName.focus();
                    return false;
                }
                // if (!document.resultVO.tagList.value) {
                //     alert("태그를 입력하여 주시기 바랍니다.");
                //     document.resultVO.tagList.focus();
                //     return false;
                // }
                if (!document.resultVO.projectDesc.value) {
                    alert("컨텐츠 설명을 입력하여 주시기 바랍니다.");
                    document.resultVO.projectDesc.focus();
                    return false;
                }

                if(!checkNumber($("#orderNumber").val())){
                    alert("정렬순번은 숫자만 입력 가능합니다.");
                    document.resultVO.orderNumber.focus();
                    return;
                }

                else {
                    var data = {
                        projectKey: $("#projectKey").val(),
                        projectName: $("#projectName").val(),
                        projectDesc: $("#projectDesc").val(),
                        useYn: $("#useYn").val(),
                        useLikeYn: document.resultVO.useLikeYn.value,
                        useSnsShareYn:document.resultVO.useSnsShareYn.value,
                        useCommentYn:document.resultVO.useCommentYn.value,
                        showYn: $("#showYn").val(),
                        orderNumber: $("#orderNumber").val(),
                        tagList :document.resultVO.tagList.value,
                        atchFileId : document.resultVO.atchFileId.value,
                    };
                    $ifx.promise()
                        .then(function (ok, fail) {
                            $ifx.ajax('<c:url value="/cms/info/interaction/InsertInteraction.do"/>', {
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
    }

     checkNumber = (str) => {
        var flag=true;
        if (str.length > 0) {
            for (i = 0; i < str.length; i++) {
                if (str.charAt(i) < '0' || str.charAt(i) > '9') {
                    flag=false;
                }
            }
        }
        return flag;
    }
</script>
<div class="sub subView">

    <form:form commandName="resultVO" name="resultVO" action="${pageContext.request.contextPath}/cms/info/interaction/InsertInteraction.do" method="post" onSubmit="fn_regist_page(document.forms[0]); return false;">
        <div class="rows white-box">
            <!-- 등록폼 -->
            <table class="landscape" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">

                <tbody>
                <tr>
                    <th style="width: 9%;">
                        <label for="projectKey">컨텐츠키 <span class="pilsu">*</span></label>
                    </th>
                    <td class="left">
                        <form:input path="projectKey" size="50" maxlength="100" name="projectKey"/>
                        <button type="button" class="button" onclick="fnCheckKey(projectKey)">중복 확인</button>
                        <div><form:errors path="projectKey" cssClass="error" /></div>
                    </td>
                </tr>
                <tr>
                    <th style="width: 9%;">
                        <label for="projectName">컨텐츠명 <span class="pilsu">*</span></label>
                    </th>
                      <td class="left">
                        <form:input path="projectName" size="50" maxlength="100" name="projectName"/>
                        <div><form:errors path="projectName" cssClass="error" /></div>
                     </td>
                </tr>
                <tr>
                    <th style="width: 9%;">
                        <label for="projectName">정렬순번 <span class="pilsu">*</span></label>
                    </th>
                    <td class="left">
                        <form:input path="orderNumber" size="50" maxlength="100" name="orderNumber"/>
                        <div><form:errors path="orderNumber" cssClass="error" /></div>
                    </td>
                </tr>
                <tr>
                    <th><label for="projectDesc">컨텐츠 설명 <span class="pilsu">*</span></label></th>
                    <td class="nopd">
                        <form>
                            <form:textarea path="projectDesc" id="projectDesc" rows="3" cols="20" maxlength="500"></form:textarea>
                        </form>
                    </td>
                </tr>
                <tr>
                    <th><label for="tagList"> 태그 <span class="pilsu">*</span></label></th>
                    <td class="nopd">
                        <div class="form-group">
                            <div data-ax5autocomplete="autocomplete2" data-ax5autocomplete-config="{multiple: true}" ></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th><label >대표 이미지 </label></th>
                    <td class="left">
                        <div id="fileuploader">Upload</div>
                    </td>
                </tr>
                <tr>
                    <!-- 좋아요 사용여부 -->
                    <th>좋아요 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="useLikeYn" id="useLikeYn_Y" value="Y"/>
                        <label for="useLikeYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="useLikeYn" id="useLikeYn_N" value="N"  checked="true"/>
                        <label for="useLikeYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                    </td>
                </tr>
                <!-- SNS 사용여부 -->
                <tr>
                    <th>SNS 공유 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="useSnsShareYn" id="useSnsShareYn_Y" value="Y"/>
                        <label for="useSnsShareYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="useSnsShareYn" id="useSnsShareYn_N" value="N"  checked="true"/>
                        <label for="useSnsShareYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                    </td>
                </tr>
                <tr>
                    <th>코멘트 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="useCommentYn" id="useCommentYn_Y" value="Y"/>
                        <label for="useCommentYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="useCommentYn" id="useCommentYn_N" value="N" checked="true"/>
                        <label for="useCommentYn_N"><i class="bx bx-radio-circle-marked" aria-checked="true"></i>사용안함</label>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>

        <!-- 하단 버튼 -->
        <div class="btn-set right">
<%--          <button type="button" onclick="registContents()" class="btn btn main" value="<spring:message code="button.create" />" title="<spring:message code="button.create" /> <spring:message code="input.button" />" />--%>
            <button type="button" class="button" onclick="registContents()">등록</button>
        </div>
        <input name="menuTargetNo" id="menuTargetNo" type="hidden" value="${menuInfo.menuTargetNo}">
        <input type="hidden" id="checkIdYn" value="N">
        <input type="hidden" id="useYn" value="Y">
        <input type="hidden" id="showYn" value="N">
        <form:hidden path="tagList" id="tagList"  />
        <form:hidden path="atchFileId" id="atchFileId" />
        <input name="cmd" type="hidden" value="<c:out value='save'/>">
    </form:form>
</div>