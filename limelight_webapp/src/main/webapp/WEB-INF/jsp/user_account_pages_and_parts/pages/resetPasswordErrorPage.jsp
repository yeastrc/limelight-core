<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	resetPasswordErrorPage.jsp
	
	Rest Password Error Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<html>
<head>
	<title>Limelight - Reset Password</title>
 <%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/head_section_include_user_pages.jsp" %>
	
</head>
<body class="
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
<%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/body_tag_class_start_include_user_pages.jsp" %>
				">

<div class=" inset-body-class-main-outermost-div ">

<div class="page-content-outer-container" >	
 <div class="page-content-container" >	
  <div class="page-content" >	
	
	<div class="logo-large-container" >
		<img src="static/images/login-page-logo.png" />
	</div>

	<div id="main_container_below_logo">
		<div style="font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 20px; ">
			An Error occurred processing this reset password.
		</div>
		<div style="font-size: 16px; font-weight: bold; margin-bottom: 20px; ">
			<c:out value="${ errorMsg }"></c:out>
		</div>
	</div>
  </div>
 </div>
</div>

<%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

</div>	
		
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>	
		
</body>
</html>