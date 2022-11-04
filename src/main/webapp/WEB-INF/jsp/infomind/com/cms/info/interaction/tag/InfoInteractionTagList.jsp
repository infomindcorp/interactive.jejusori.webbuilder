<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<c:set var="pageTitle">태그 관리</c:set>

<script src="<c:url value="/assets/ax5/ax5ui-binder/ax5binder.min.js"/>"></script>
<script src="<c:url value="/assets/ax5/ax5ui-layout/ax5layout.min.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/assets/ax5/ax5ui-layout/ax5layout.css"/>">

<script type="text/javascript">
    $(document).ready(function() {
        $("#useYn").val('Y');
        $('[data-ax5layout]').ax5layout();
        genTreeMenu();
        genForm();
        searchTreeMenu();
    });
    var defaultMenuModel = {tagGrpNm: '', tagId: '', tagNm: '', tagDescription: '', useYn: '',tagGrpId: '', childMenu:''}
    var treeMenu, formBinder;
    function genForm() {
        var $formBinderEl = $(document["formBinder"]);
        formBinder = new ax5.ui.binder();
        formBinder.onChange("*", function (n) {
            formBinder.set("__modified__", true);
            treeMenu.zTree.refresh()
        });
        formBinder.setModel(defaultMenuModel, $formBinderEl);
    }


    function formBinderSetModel(data) {
        formBinder.setModel(data)

    }



    //트리 생성
    function genTreeMenu() {
        treeMenu = $ifx.treeBuilder($('[data-z-tree="tree-view-01"]'), {
            data: {
                keep: {
                    leaf: false,
                    parent: false,
                },
                key: {
                    name: 'tagGrpNm',
                    title: 'tagGrpNm',
                    children: 'childMenu',
                    url: ''
                },
                simpleData: {
                    enable: true,
                    idKey: 'tagId',
                    pidKey: 'parentId',
                    rootPId: 'root'
                }
            },
            view: {
                dblClickExpand: false,
                addHoverDom: function (treeId, treeNode) {
                    var sObj = $("#" + treeNode.tId + "_span");
                    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
                    if(treeNode.depth < 2) {
                        var addStr = "<span class='btn btn-xs' id='addBtn_" + treeNode.tId + "' title='update' onfocus='this.blur();'>수정</span>";
                        sObj.after(addStr);
                        var btn = $("#addBtn_" + treeNode.tId);
                        if (btn) {
                            btn.bind("click", function () {
                                updateGroup(treeNode.tagGrpId);
                            });
                        }
                    }
                },
                removeHoverDom: function (treeId, treeNode) {
                    $("#addBtn_" + treeNode.tId).unbind().remove();
                }
            },
            edit: {
                enable: false,
                showRenameBtn: false,
                showRemoveBtn: false
            },
            callback: {
                beforeDrop: function(treeId, treeNodes, targetNode, moveType) {
                    if(moveType === 'inner' && targetNode.depth >= 3) {
                        alert('3차 메뉴 이상으로 만들 수 없습니다.');
                        return false;
                    }
                },
                onDrop: function(event, treeId, treeNodes, targetNode, moveType) {
                    initNodeValue(treeMenu.getData(), 1)
                },
                beforeDrag: function () {},
                beforeClick: function(treeId, treeNode, clickFlag) {},
                onClick: function (e, treeId, treeNode, isCancel) {
                    treeNode.tagNm = treeNode.tagGrpNm;
                    $("#useYn").val(treeNode.useYn);

                    var $formBinderEl = $(document["formBinder"]);
                    var checkIdBtn = document.getElementById('checkIdBtn');

                    if(treeNode.depth == 2){
                        $formBinderEl.find('[data-ax-path=tagId]').attr('readonly', 'readonly')
                        $("#modifyYn").val('Y');
                        $("#checkIdYn").val('Y');
                        formBinderSetModel(treeNode);
                        checkIdBtn.style.visibility = 'hidden';
                    } else {
                        $formBinderEl.find('[data-ax-path=tagId]').removeAttr('readonly')
                        treeNode.tagNm=""
                        $("#modifyYn").val('N');
                        $("#checkIdYn").val('N');
                        formBinderSetModel(treeNode);
                        checkIdBtn.style.visibility = 'visible';
                    }

                    return false;
                },
                onRename: function (e, treeId, treeNode, isCancel) {
                },
                onRemove: function (e, treeId, treeNode, isCancel) {
                }
            }
        }, []);
    }
    function initNodeValue(list, depth) {
        list.forEach(function(v, i) {
            v['tagGrpNm'] = v['tagGrpNm'] + (v['useYn'] === 'Y' ? '' : '(미사용)')
            // 리스트전송인경우만사용 v['ord'] = i;
            v['depth'] = depth
            v['childMenu'] = v['childMenu'] || []
            if(v['childMenu'].length > 0) {
                initNodeValue(v['childMenu'], depth + 1)
            } else {
                delete v['childMenu']
            }
        })
    }
    //조회
    function searchTreeMenu() {
        var data = {};
        $ifx.ajax('<c:url value='/cms/info/interaction/tag/AllTagSelect.do' />', {
            method: "GET",
            data: data,
            success: function (res) {
                initNodeValue(res.list, 1)
                treeMenu.setData(res.list)
                treeMenu.zTree.expandAll(true)
                formBinderSetModel(defaultMenuModel);
            }
        });
    }

    //태그 그룹 등록
    function registerGroup(){
        var menuTargetNo = $('#menuTargetNo').val();
        var p = {
            menuTargetNo :menuTargetNo,
        };
        var API_SERVER = "<c:url value='/cms/info/interaction/tag/RegistTagGroupView.do' />";
        ax5modal.open({
            theme: "primary",
            height: 320,
            width: 750,
            header: {
                title: '태그 그룹 등록',
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
            location.reload(true);
        });
    }

    //태그 그룹 수정
    function updateGroup(id){
        var menuTargetNo = $('#menuTargetNo').val();
        var p = {
            menuTargetNo :menuTargetNo,
            tagGrpId : id
        };
        var API_SERVER = "<c:url value='/cms/info/interaction/tag/UpdateTagGroupView.do' />";
        ax5modal.open({
            theme: "primary",
            height: 320,
            width: 750,
            header: {
                title: '태그 그룹 수정',
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
            }
        },
            function (d) {
            ax5modal.close();
            location.reload(true);
        });
    }


    //태그 저장
    function saveTag() {
        var modifyYn = $("#modifyYn").val()
        var checkIdYn = $("#checkIdYn").val()
        var p = {
            tagId: $("#tagId").val(),
            tagGrpId: $("#tagGrpId").val(),
            tagNm: $("#tagNm").val(),
            tagDescription: $("#tagDescription").val(),
            useYn: $("#useYn").val()
        }
        if (checkIdYn == 'N') {
            alert("태그 아이디 중복체크 바랍니다.");
            return false;
        } else {
            if (modifyYn == 'N') {  //저장
                if (!tagGrpId.value) {
                    alert("태그 그룹을 선택하여 주시기 바랍니다.");
                    tagGrpId.focus();
                    return false;
                }
                if (!tagNm.value) {
                    alert("태그명을 입력하여 주시기 바랍니다.");
                    tagNm.focus();
                    return false;
                }
                if (!tagId.value) {
                    alert("태그아이디를 입력하여 주시기 바랍니다.");
                    tagId.focus();
                    return false;
                } else {
                    $ifx.ajax('<c:url value='/cms/info/interaction/tag/InsertTag.do' />', {
                        method: "GET",
                        data: p,
                        success: function (res) {
                            alert('저장 되었습니다');
                            cacheMenuReload();
                            searchTreeMenu();
                        },
                        error(res) {
                            alert("error");
                        }
                    })
                }
            } else {//수정
                if (!tagGrpId.value) {
                    alert("태그 그룹을 선택하여 주시기 바랍니다.");
                    tagGrpId.focus();
                    return false;
                }
                if (!tagNm.value) {
                    alert("태그명을 입력하여 주시기 바랍니다.");
                    tagNm.focus();
                    return false;
                }
                if (!tagId.value) {
                    alert("태그아이디를 입력하여 주시기 바랍니다.");
                    tagId.focus();
                    return false;
                } else {
                    $ifx.ajax('<c:url value='/cms/info/interaction/tag/UpdateTag.do' />', {
                        method: "GET",
                        data: p,
                        success: function (res) {
                            alert('수정되었습니다.');
                            cacheMenuReload();
                            searchTreeMenu();
                        },
                        error(res) {
                            alert("error");
                        }
                    })
                }
            }

        }
    }

    function changeUseYn(yn) {
        $("#useYn").val(yn)
    }

    //초기화
    function cacheMenuReload() {
        document.formBinder.tagGrpId.value = "";
        document.formBinder.tagNm.value = "";
        document.formBinder.tagId.value = "";
        document.formBinder.tagDescription.value = "";
        document.formBinder.useYn.value = "";
        document.formBinder.tagId.removeAttribute('readonly');
    }

    //아이디 중복 체크
    function fnCheckId(){
        $.ajax({
            type:"POST",
            url:"<c:url value='/cms/info/interaction/tag/TagIdCnfirmAjax.do' />",
            data:{
                tagId: $("#tagId").val()
            },
            dataType:'json',
            timeout:(1000*30),
            success:function(returnData, status){
                if(status == "success") {
                    if(returnData.usedCnt == 0 ){
                        //사용할수 없는 아이디입니다.
                        alert(returnData.checkId + "는 사용할 수 있는 아이디 입니다.")
                        $("#checkIdYn").val('Y')
                        console.log( $("#checkIdYn").val())
                    }else{
                        //사용가능한 아이디입니다.
                        alert("사용할 수 없는 아이디 입니다.")
                        $("#checkIdYn").val('N')
                        console.log( $("#checkIdYn").val())
                    }
                }else{ alert("ERROR!");}
            }
        });
    }


</script>


</head>
<div class="sub subView">
    <nav class="navigation">
        <i class='bx bxs-home'></i>${menuInfo.depthFullname}</a>
    </nav>
    <h2 class="stitle">
        <i class='bx bxs-dashboard' ></i>${pageTitle} <spring:message code="title.list" />
    </h2>

    <h3 class="btitle">
        태그 목록
    </h3>
    <div class="row">
        <div class="col-md-12">
            <div class="white-box">
                <div class="rows">
                    <button type="button" class="btn sub" onclick="cacheMenuReload()">초기화</button>
                    <button type="button" class="btn sub" onclick="registerGroup()">태그 그룹 등록</button>
                </div><!-- END: div.rows -->

                <div class="rows">
                    <div data-ax5layout="ax1" data-config='{layout:"split-panel", orientation: "vertical"}' style="height: 80vh;border:1px solid #ccc;">
                        <div data-split-panel='{width: "25%"}'>
                            <div class="white-box">
                                <div data-z-tree="tree-view-01" style="height: 80vh;" class="ztree"></div>
                            </div>
                        </div>
                        <div data-splitter="{}"></div>
                        <div data-split-panel='{width: "*"}'style="overflow-y: scroll;" >
                            <form name="formBinder">
                                <div class="rows white-box">
                                    <table class="landscape" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
                                        <tbody>
                                            <tr>
                                                <th>태그 그룹 <span class="pilsu">*</span></th><!-- 태그명 -->
                                                <td>
                                                <select name="tagGrpId" id="tagGrpId" title="태그그룹명" data-ax-path="tagGrpId" >
                                                    <option value="">태그 그룹 선택</option>
                                                    <c:forEach var="grp_list" items="${grp_list}" varStatus="vs">
                                                        <option value="${grp_list.tagGrpId}">${grp_list.tagGrpNm} (${grp_list.tagGrpId})</option>
                                                    </c:forEach>
                                                </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>태그명 <span class="pilsu">*</span></th><!-- 태그명 -->
                                                <td>
                                                    <input name="tagNm" id="tagNm" data-ax-path="tagNm" type="text" maxlength="80" title="tagNm" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>태그아이디 <span class="pilsu">*</span></th><!-- 태그명 -->
                                                <td>
                                                    <input name="tagId" id="tagId" type="text" data-ax-path="tagId" maxlength="80" title="tagId" />
                                                    <button type="button" id="checkIdBtn" class="button" onclick="fnCheckId(tagId)">중복 확인</button>
                                                </td>
                                            </tr>
<%--                                            <tr>--%>
<%--                                                <th>태그 대표 이미지 <span class="pilsu">*</span></th><!-- 태그명 -->--%>
<%--                                                <td class="left">--%>
<%--                                                    <input name="tagId" type="text" data-ax-path="tagId" maxlength="30" title="tagNm" />--%>
<%--                                                </td>--%>
<%--                                            </tr>--%>
                                            <tr>
                                                <th>태그설명</th><!-- 메뉴명 -->
                                                <td class="left">
                                                    <textarea name="tagDescription" id="tagDescription" data-ax-path="tagDescription" class="textarea"  cols="45" rows="4"  title="tagDescription"></textarea>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>사용여부 <span class="pilsu">*</span></th>
                                                <td class="left">
                                                    <input type="radio" onclick="changeUseYn('Y')" name="useYn" data-ax-path="useYn" id="useYn_Y" value="Y"  checked="checked">
                                                    <label for="useYn_Y"><i class="bx bx-radio-circle-marked"></i>사용</label>
                                                    <input type="radio" onclick="changeUseYn('N')" name="useYn" data-ax-path="useYn" id="useYn_N" value="N">
                                                    <label for="useYn_N"><i class="bx bx-radio-circle-marked"></i>사용안함</label>
                                                    <input type="hidden" id="useYn">
                                                    <input type="hidden" id="modifyYn" value="N">
                                                    <input type="hidden" id="checkIdYn" value="N">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="right-button" align="right">
                                                    <button type="button" class="button main" onclick="saveTag()">저장</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div><!-- END: div.rows -->
            </div><!-- END: div.white-box -->
        </div>
    </div>
</div>
