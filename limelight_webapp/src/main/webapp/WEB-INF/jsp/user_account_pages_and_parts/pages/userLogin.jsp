<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>
<%--
	userLogin.jsp
	
	User Login Page

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title>Limelight - User Login</title>
 <%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/head_section_include_user_pages.jsp" %>
 
 
 <%--  signInPage_projectId and signInPage_Has_ProjectAccessCodeEnabled only populated when Project has project access code enabled --%>
 <c:if test="${ not empty signInPage_projectId }">
 	<script type="text/text" id="sign_in_page_project_id"><c:out value="${ signInPage_projectId }"></c:out></script>
 </c:if>
 <c:if test="${ signInPage_Has_ProjectAccessCodeEnabled }">
 	<script type="text/text" id="sign_in_page_project_has_ce">true</script>
 </c:if>
	
</head>
<body class="
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_inset_pages.jsp" %>
<%@ include file="/WEB-INF/jsp/user_account_pages_and_parts/jsp_includes/body_tag_class_start_include_user_pages.jsp" %>
				">

<%--  	JSTL not currently included
		<input type="hidden" id="requestedURL" value="<c:out value="${ param.requestedURL }" />"/>
		<input type="hidden" id="useDefaultURL"  value="<c:out value="${ param.useDefaultURL }" />"/>
	    <input type="hidden" id="defaultURL" value="XXXXX"/>
--%>

<div class="page-content-outer-container" >	
 <div class="page-content-container" >	
  <div class="page-content" >	
	

	<div class="logo-large-container" >
		<img src="static/images/login-page-logo.png" />
	</div>
	
	<div id="main_container_below_logo">
	</div>
  		
  </div>
  
  		<%-- Not Shown initially --%>
  <div id="reset_password_tab" class="bottom-tab" style="display: none;"  > <%-- Add if put box to right for Help: style="border-right-width: 0px;" --%>
		<span id="reset_password_fake_link" class=" fake-link " >Reset Password</span>
  </div>

		<%-- Not Shown initially --%>
  <div id="signin_tab" class="bottom-tab" style="display: none;" > <%-- Add if put box to right for Help: style="border-right-width: 0px;" --%>
		<span id="signin_fake_link" class=" fake-link " >Sign In</span>		
  </div>
    
 </div>
</div>

<%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>	
	
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
<%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  			
<script type="text/javascript" src="static/js_generated_bundles/user_pages/userLoginPage_Root-bundle.js?x=${ cacheBustValue }"></script>
	
</body>
</html>