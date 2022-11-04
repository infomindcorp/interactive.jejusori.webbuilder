<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>

<%@ taglib prefix="info" uri="http://infomind.com/info" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<link rel="stylesheet" type="text/css" href="<c:url value='/file/css/uploadfile.css' />">
<!-- javaScript -->
<script src="<c:url value='/js/infomind/com/jquery-3.1.0.min.js'/>" ></script>
<script src="<c:url value='/file/js/jquery.uploadfile.js'/>" ></script>

<script src="<c:url value="/assets/ax5/ax5core/ax5core.min.js"/>"></script>
<script src="<c:url value="/assets/ax5/ax5ui-autocomplete/ax5autocomplete.min.js"/>"></script>
<link rel="stylesheet" type="text/css" href="<c:url value="/assets/ax5/ax5ui-autocomplete/ax5autocomplete.css"/>">
<c:set var="pageTitle">컨텐츠 관리</c:set>
<script type="text/javascript">
    $(document).ready(function() {
        getBeforeTag();
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
                location.href="${pageContext.request.contextPath}/cms/info/file/fileDown.do?atchFileId="+data.atchFileId+"&fileSn="+data.fileSn;
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

    function updateContents() {
        var ttt = $('[data-ax5autocomplete="autocomplete2"]').ax5autocomplete("getSelectedOption")
        var list = [];
        for (var i = 0; i < ttt.length; i++) {
            list.push(ttt[i].value)
        }
        list2 = list.toString();
        var tagList = $("#tagList").val(JSON.stringify(list2).replace(/"/g, ''))
        console.log(list2);
        if(confirm("<spring:message code="common.update.msg" />")) {
                if (!document.resultVO.projectName.value) {
                    alert("컨텐츠명을 입력하여 주시기 바랍니다.");
                    document.resultVO.projectName.focus();
                    return false;
                }

                if(!checkNumber($("#orderNumber").val())){
                    alert("정렬순번은 숫자만 입력 가능합니다.");
                    document.resultVO.orderNumber.focus();
                    return;
                }

                if (!document.resultVO.projectDesc.value) {
                    alert("컨텐츠 설명을 입력하여 주시기 바랍니다.");
                    document.resultVO.projectDesc.focus();
                    return false;
                } else {
                    var data = {
                        projectKey: $("#projectKey").val(),
                        projectName: $("#projectName").val(),
                        projectDesc: $("#projectDesc").val(),
                        useLikeYn: document.resultVO.useLikeYn.value,
                        useSnsShareYn: document.resultVO.useSnsShareYn.value,
                        useCommentYn: document.resultVO.useCommentYn.value,
                        tagList: document.resultVO.tagList.value,
                        showYn: document.resultVO.showYn.value,
                        orderNumber: $("#orderNumber").val(),
                        atchFileId: document.resultVO.atchFileId.value
                    };
                    $ifx.promise()
                        .then(function (ok, fail) {
                            $ifx.ajax('<c:url value="/cms/info/interaction/UpdateInteraction.do"/>', {
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

    function getBeforeTag() {
        var data = {
            projectKey: $("#projectKey").val()
        };
        $ifx.promise()
            .then(function (ok, fail) {
                $ifx.ajax('<c:url value="/cms/info/interaction/tag/getBeforeTag.do"/>', {
                    method: 'GET',
                    data: data,
                    success: function (res) {
                        $('[data-ax5autocomplete="autocomplete2"]').ax5autocomplete("setValue",res.list)
                    }
                })
            })
    }

    function fncGoBack(){
        document.resultVO.action="<c:url value='/cms/info/interaction/interactionList.do' />";
        document.resultVO.submit();
    }

    /* ********************************************************
    * 서버 처리 후 메세지 화면에 보여주기
    ******************************************************** */
    function fncShowMessg(){
        if("<c:out value='${message}'/>" != ''){
            alert("<c:out value='${message}'/>");
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

    <form:form commandName="resultVO" name="resultVO" action="${pageContext.request.contextPath}/cms/info/interaction/UpdateInteraction.do" method="post" >
        <div class="rows white-box">
            <!-- 등록폼 -->
            <table class="landscape" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
                <tbody>
                <!-- 입력/선택 -->
                <tr>
                    <th style="width: 9%;">
                        <label for="projectKey">컨텐츠키 <span class="pilsu">*</span></label>
                    </th>
                    <td class="left">
                        <form:input path="projectKey" size="50" maxlength="100" readonly="true" />
                        <div><form:errors path="projectKey" cssClass="error" /></div>
                    </td>
                </tr>
                <tr>
                    <th style="width: 9%;">
                        <label for="projectName">컨텐츠명 <span class="pilsu">*</span></label>
                    </th>
                    <td class="left">
                        <form:input path="projectName" size="50" maxlength="100" />
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
                <sec:authorize access="hasRole('ROLE_ADMIN')">
                <tr>
                    <!-- 공개여부 사용여부 -->
                    <th>공개여부 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="showYn" id="showYn_Y" value="Y"/>
                        <label for="showYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="showYn" id="showYn_N" value="N"/>
                        <label for="showYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                    </td>
                </tr>
                </sec:authorize>
                <tr>
                    <!-- 좋아요 사용여부 -->
                    <th>좋아요 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="useLikeYn" id="useLikeYn_Y" value="Y"/>
                        <label for="useLikeYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="useLikeYn" id="useLikeYn_N" value="N"/>
                        <label for="useLikeYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                    </td>
                </tr>
                <!-- SNS 사용여부 -->
                <tr>
                    <th>SNS 공유 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="useSnsShareYn" id="useSnsShareYn_Y" value="Y"/>
                        <label for="useSnsShareYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="useSnsShareYn" id="useSnsShareYn_N" value="N"/>
                        <label for="useSnsShareYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                    </td>
                </tr>
                <!-- 코멘트 사용여부 -->
                <tr>
                    <th>코멘트사용 <span class="pilsu">*</span></th>
                    <td class="left">
                        <form:radiobutton path="useCommentYn" id="useCommentYn_Y" value="Y"/>
                        <label for="useCommentYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                        <form:radiobutton path="useCommentYn" id="useCommentYn_N" value="N"/>
                        <label for="useCommentYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- 하단 버튼 -->
        <div class="btn-set right">
            <button type="button" class="button" onclick="updateContents()">수정</button>
        </div>
        <input name="menuTargetNo" id="menuTargetNo" type="hidden" value="${menuInfo.menuTargetNo}">
          <input name="cmd" type="hidden" value="<c:out value='save'/>">
        <form:hidden path="atchFileId" id="atchFileId" />
        <form:hidden path="tagList" id="tagList"  />
    </form:form>
</div>