<%@ page import="infomind.com.tags.model.WpSelectVOImpl" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%
 /**
  * @Class Name : EgovCcmCmmnClCodeList.jsp
  * @Description : 공통분류코드 목록 화면
  * @Modification Information
  * @
  * @  수정일             수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.02.01   박정규              최초 생성
  *   2017.07.20   이정은              표준프레임워크 v3.7 개선
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
<%@ taglib prefix="info" uri="http://infomind.com/info" %>


<script src="<c:url value='/js/infomind/com/jquery-3.4.1.js' />"></script>

<script src="<c:url value="/assets/ax5/ax5core/ax5core.min.js"/>"></script>
<script src="<c:url value="/assets/ax5/ax5ui-grid/ax5grid.min.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/assets/ax5/ax5ui-grid/ax5grid.css"/>">



<!-- modal 필-->
<link rel="stylesheet" href="<c:url value="/assets/ax5/ax5ui-modal/ax5modal.css"/>">
<link rel="stylesheet" href="<c:url value="/assets/ax5/ax5ui-mask/ax5mask.css"/>">
<script src="<c:url value="/assets/ax5/ax5ui-modal/ax5modal.min.js"/>"></script>
<script src="<c:url value="/assets/ax5/ax5ui-mask/ax5mask.min.js"/>"></script>
<script src="<c:url value="/js/infomind/com/axui5modal.js"/>"></script>


<script src="<c:url value="/js/infomind/com/common-ui/jquery-ui-1.12.1/jquery-ui.js"/>"></script>

<%--<link rel="stylesheet" href="/js/infomind/com/common-ui/base/css/ui.multiselect.css">--%>
<%--<link rel="stylesheet" href="/js/infomind/com/common-ui/base/css/jquery.multiselect.css">--%>
<%--<link rel="stylesheet" href="/js/infomind/com/common-ui/base/css/jquery.autocomplete.css">--%>




<%--<script src="<c:url value="/js/infomind/com/common-ui/base/jquery.multiselect.js"/>"></script>--%>
<%--<script src="<c:url value="/js/infomind/com/common-ui/base/ui.multiselect.js"/>"></script>--%>
<%--<script src="<c:url value="/js/infomind/com/common-ui/base/jquery.ui.widget.js"/>"></script>--%>
<%--<script src="<c:url value="/js/infomind/com/common-ui/base/jquery.multiselect.filter.js"/>"></script>--%>




<script src="<c:url value="/js/infomind/com/jquery.ext.js"/>"></script>





<%
 List<WpSelectVOImpl> myList = new ArrayList<WpSelectVOImpl>();
 myList.add(new WpSelectVOImpl("a1", "b1"));
 myList.add(new WpSelectVOImpl("a2", "b2"));
 myList.add(new WpSelectVOImpl("a3", "b3"));
 myList.add(new WpSelectVOImpl("a4", "b4"));
 request.setAttribute("myList", myList);
%>


<c:set var="pageTitle"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.title"/></c:set>
<script type="text/javascript">


 var firstGrid = new ax5.ui.grid();

	$(document).ready(function() {


     // 그리드세팅
     firstGrid.setConfig({
              target: $('[data-ax5grid="first-grid"]'),
              sortable: true,
              showRowSelector: false,
              multipleSelect: false,
              showLineNumber: true,
              lineNumberColumnWidth: 40,

        header: {
                 align: "center",
                 columnHeight: 40
              },
              body: {
               align: "center",
               columnHeight: 28,
               onDBLClick: function () {
                //saveView1(this.item);
               }

              },

              columns: [
                {key: "clCode", label: "분류코드"},
                {key: "clCodeNm", label: "분류코드명" ,width:200},
                {key: "useAt", label: "사용여부"},
                {
                key: "clCode", label: "상세보기", formatter: function () {

                 // console.log(this.item);
                 return "<button type='button' class='btn btn-xs btn-default' onclick="+"'gotoView("+ this.dindex + ");'> 상세보기 </button>";
                }
               },

              ]
             }
      );


     Search();


     var API_SERVER = "<c:url value='/sym/ccm/ccc/CodeTestList.do' />";

     //alert(API_SERVER);


     ajaxLoadSelect({
          url: API_SERVER,
          params: [
           {name: 'p1', value: '0000000000'},
           {name: 'key', value: 'dd'}
          ],
          selectboxNm: 'sggu'
     });




	});




 function Search() {

  /* 그리드 데이터 가져오기 */
  var API_SERVER = "<c:url value='/sym/ccm/ccc/SelectCcmCmmnClCodeObject.do' />";
    $.ajax({
       method: "POST",
       url: API_SERVER,
       dateType:'json',
       contentType: "application/json",  // ajax 통신으로 보내는 타입
       success: function (res) {
      //  console.log("res==>"+res)


        var lsit = JSON.parse(res);
        firstGrid.setData(lsit.list);
       }
    });

 }

 //등록, 수정창 오픈
 function gotoView(row) {


    var clCode =firstGrid.getList()[row].clCode;

       var p = {
         clCode:clCode
       };

      var API_SERVER = "<c:url value='/sym/ccm/ccc/edit.do' />";


       ax5modal.open({
              height: 600,
              width: 600,
              iframe: {
                        method: "get",
                        url: API_SERVER,
                        param:  p
                    },

       }, function (d) {


        Search();
       });


       $('#modal-close').click(function () {
        ax5modal.close()


       });

 }



</script>
<div class="if-inside">
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
  <i class='bx bxs-dashboard' ></i>${pageTitle} <spring:message code="title.list" />
 </h2>

 <h3 class="btitle">
  검색  ${menuInfo.menuNo}
 </h3>

  <!-- 검색영역 -->
  <!-- 검색조건선택 -->

  <div class="white-box">


   <div class="rows">
			<span class="select-outline">
                             <select name="searchCondition" title="<spring:message code="title.searchCondition" />">
									<option selected value=''><spring:message code="input.select" /></option><!-- 선택하세요 -->
									<option value="1"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeId" /></option><!-- 코드ID -->
									<option value="2"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.code" /></option><!-- 코드ID -->
									<option value="3"><spring:message code="comSymCcmCde.cmmnDetailCodeVO.codeNm" /></option><!-- 코드명 -->
							</select>

          </span>
    <span class="select-outline">
    <info:select name="test" list="${myList}" first="선택해주세요"/>
    </span>


    <span class="select-outline">
       <info:select name="sggu"  width="150" title="시군구" first="시군구" val="a4"/>
    </span>




    <input type="text" class="w100" class="main" name="searchKeyword" size="35" title="<spring:message code="title.search" /> <spring:message code="input.input" />"  value='<c:out value="${searchVO.searchKeyword}"/>'  maxlength="155" >
    <button type="button" class="button"  value="<spring:message code="button.inquire" />" title="<spring:message code="title.inquire" /> <spring:message code="input.button" />" ><i class='bx bx-slider-alt'></i><spring:message code="title.inquire" /></button>
    <button type="button" class="button main" onclick="location.href='<c:url value='/sym/ccm/ccc/RegistCcmCmmnClCodeView.do' />'"  title="<spring:message code="button.create" /> <spring:message code="input.button" />"  ><spring:message code="button.create" /></button>
 </div>


  </div>



  <h3 class="btitle">
   ${pageTitle}<spring:message code="title.list" />
  </h3>

  <div class="rows white-box">
   <div data-ax5grid="first-grid" data-ax5grid-config="{}" style="height: 300px;"></div>
  </div>




  <article class="pagenation">
    페이지
  </article>


</div>