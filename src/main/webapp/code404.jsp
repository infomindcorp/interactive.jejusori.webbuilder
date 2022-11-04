<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">

			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title><spring:message code="info.top.title"/></title>

				<!-- css -->
				<link rel="stylesheet" type="text/css" href="<c:url value='/source/css/style.css?ver=20210302' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/assets/tootik/tootik.min.css' />">
				<link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css?ver=20210302' rel='stylesheet'>
				<!-- javaScript -->
				<script src="<c:url value='/source/js/jquery-3.5.1.min.js'/>" ></script>

				<script language="javascript">
					function fncGoAfterErrorPage(){
						history.back(-2);
					}
				</script>


			</head>
	<body class="error-page">
			<h1>
				<i class="bx bx-error"></i>
				HTTP 404 Error
				<small>페이지를 찾을 수 없습니다.</small>
			</h1>
	<%--<p class="info-text">--%>

	<%--</p>--%>
	<button class="btn sub" type="button" onclick="fncGoAfterErrorPage();" >뒤로가기</button>
			<p class="mt-5 mb-3 text-muted">© INFOMIND</p>
	</form>
	</body>

</html>
